import React, { useContext, useMemo } from "react";
import {
  // getMRT_RowSelectionHandler,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ProfileInformation, ProfilesDataTableProps } from "../model";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ProfileManagementContext } from "../App";

const ProfilesDataTable = ({
  handleDeleteClick,
  data,
}: Readonly<ProfilesDataTableProps>) => {
  const navigate = useNavigate();
  const { setProfileMgContext } = useContext(ProfileManagementContext);

  const columns = useMemo<MRT_ColumnDef<ProfileInformation>[]>(
    () => [
      {
        accessorKey: "id",
        header: "id",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "age",
        header: "Age",
        size: 150,
      },
    ],
    []
  );

  const handleEdit = (name: string, id: string) => {
    if (setProfileMgContext) {
      setProfileMgContext({
        userName: name,
      });
    }
    navigate(`/profile-form/?profileId=${id}`);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton
          color="info"
          onClick={() => handleEdit(row?.original?.name, row?.original?.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleDeleteClick(row?.original?.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: false,
    },
    enableTopToolbar: false,
    positionActionsColumn: "last",
  });

  return <MaterialReactTable table={table} />;
};

export default ProfilesDataTable;
