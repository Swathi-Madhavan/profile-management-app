import React, { useMemo } from "react";
import {
  getMRT_RowSelectionHandler,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ProfileInformation, ProfilesDataTableProps } from "../model";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfilesDataTable = ({
  handleDeleteClick,
  data,
}: Readonly<ProfilesDataTableProps>) => {
  const navigate = useNavigate();

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

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton color="info" onClick={() => console.info("Edit")}>
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
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) => {
        navigate(`/profile-form/?profileId=${row?.original.id}`);
        return getMRT_RowSelectionHandler({ row, staticRowIndex, table })(
          event
        );
      },
      sx: { cursor: "pointer" },
    }),
  });

  return <MaterialReactTable table={table} />;
};

export default ProfilesDataTable;
