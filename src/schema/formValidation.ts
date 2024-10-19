import * as yup from "yup";

const profileSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup
    .number()
    .notRequired()
    .positive("enter a postive number")
    .min(1, "Minimum age limit is 1")
    .max(125, "Maximum age limit is 125")
    .optional(),
});

export default profileSchema;
