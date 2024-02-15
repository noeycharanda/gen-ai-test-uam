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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditUserDrawer } from "../components/UserManagement/EditUserDrawer";
import { User } from "../components/UserManagement/UserForm";
import { useRouter } from "next/router";

import { roleName } from "../utils/helper";

const Home = () => {
  const currentUserRef = useRef<User | null>(null);
  const [userIDForDelete, setUserIDForDelete] = useState<string | null>(null);

  const route = useRouter();
  const isAdmin = useMemo(() => {
    const userRoleId = route.query.role || 0;
    return Number(userRoleId) == 3;
  }, [route]);
  // console.log("isAdmin", isAdmin);

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
      // editable: true,
      field: "full_name",
      headerName: "Name",
    },
    {
      flex: 0.25,
      minWidth: 230,
      field: "email",
      // editable: true,
      headerName: "Email",
    },
    {
      flex: 0.15,
      type: "date",
      minWidth: 130,
      // editable: true,
      headerName: "Date",
      field: "start_date",
      valueGetter: (params) => new Date(params.value),
    },
    {
      flex: 0.15,
      minWidth: 120,
      // editable: true,
      field: "experience",
      headerName: "Experience",
    },
    {
      flex: 0.1,
      field: "role",
      minWidth: 80,
      // editable: true,
      headerName: "Role",
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
            onClick={() => {
              currentUserRef.current = row;
              editUserModal.present();
            }}
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
  const editUserModal = useModal();
  const [user, setUser] = useState(rows.slice(0, 10));

  const handleSubmit = useCallback((values: any) => {
    setUser((prev) => [
      ...prev,
      {
        ...values,
        full_name: "noey",
        role: roleName(values.roleId),
        id: Math.floor(Math.random() * 100),
      },
    ]);
    console.log(values);
    addUserModal.dismiss();
  }, []);

  const handleEdit = useCallback((values: any) => {
    setUser(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.email === values.email) {
          console.log(values);
          values.role = roleName(values.roleId)
          return { ...user, ...values };
        }
        return user;
      });
      return updatedUsers;
    });
    currentUserRef.current = null;
    editUserModal.dismiss();
  }, []);


  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader title={isAdmin ? "Admin" : "PX"} />
        <Button color="primary" onClick={addUserModal.present}>
          Add User
        </Button>
        <AddUserDrawer
          open={addUserModal.open}
          onClose={addUserModal.dismiss}
          handleSubmit={handleSubmit}
        />

        {currentUserRef.current == null ? null : (
          <EditUserDrawer
            user={currentUserRef.current}
            open={editUserModal.open}
            onClose={() => {
              currentUserRef.current = null;
              editUserModal.dismiss();
            }}
            handleSubmit={handleEdit}
          />
        )}
      </Box>
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={user} />
      </Box>
    </Card>
  );
};

export default Home;
