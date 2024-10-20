import * as yup from "yup";

const profileSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup
    .string()
    .required()
    .min(3, "Name should have more than 3 characters"),
  email: yup.string().email().required(),
  age: yup
    .number()
    .notRequired()
    .positive("enter a postive number")
    .min(1, "Minimum age limit is 1")
    .max(125, "Maximum age limit is 125")
    .nonNullable()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .optional(),
});

export default profileSchema;
