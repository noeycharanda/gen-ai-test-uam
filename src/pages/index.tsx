// ** MUI Imports
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";

// ** Data Import
import { rows } from "../db/table/data/static-data";
import { Button } from "@mui/material";
import { display } from "@mui/system";
import { useModal } from "../hooks/useModal";
import { AddUserDrawer } from "../components/UserManagement/AddUserDrawer";
import { useCallback, useState } from "react";

const index = () => {
  const [userIDForDelete, setUserIDForDelete] = useState<string | null>(null);
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: "id",
      minWidth: 80,
      headerName: "ID",
    },
    {
      flex: 0.25,
      minWidth: 200,
      editable: true,
      field: "full_name",
      headerName: "Name",
    },
    {
      flex: 0.25,
      minWidth: 230,
      field: "email",
      editable: true,
      headerName: "Email",
    },
    {
      flex: 0.15,
      type: "date",
      minWidth: 130,
      editable: true,
      headerName: "Date",
      field: "start_date",
      valueGetter: (params) => new Date(params.value),
    },
    {
      flex: 0.15,
      minWidth: 120,
      editable: true,
      field: "experience",
      headerName: "Experience",
    },
    {
      flex: 0.1,
      field: "age",
      minWidth: 80,
      type: "number",
      editable: true,
      headerName: "Age",
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.1,
      headerName: "Actions",
      sortable: false,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<Icon icon="mdi:pencil-outline" />}
            label="Edit"
            // onClick={() => onEditUserClick?.(row)}
            showInMenu
          />,
          <GridActionsCellItem
            key="delete"
            icon={<Icon icon="mdi:trash-outline" />}
            label="Delete"
            onClick={() =>
              setUser((prev) => prev.filter((user) => user.id != row.id))
            }
            showInMenu
          />,
        ];
      },
    },
  ];

  const addUserModal = useModal();
  const [user, setUser] = useState(rows.slice(0, 10));

  const handleSubmit = useCallback((values: any) => {
    setUser((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 100),
        full_name: "noey",
        ...values,
      },
    ]);
    console.log(values);
  }, []);
  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader title="Editable" />
        <Button color="primary" onClick={addUserModal.present}>
          Add User
        </Button>
        <AddUserDrawer
          open={addUserModal.open}
          onClose={addUserModal.dismiss}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={user} />
      </Box>
    </Card>
  );
};

export default index;
