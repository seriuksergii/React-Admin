import {
  Datagrid,
  EmailField,
  FunctionField,
  List,
  TextField,
} from "react-admin";
import { Typography } from "@mui/material";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
}

export const UserList = () => (
  <List>
    <Datagrid
      rowClick="show"
      sx={{ ".RaDatagrid-headerCell": { fontWeight: "bold" } }}
    >
      <TextField source="first_name" label="Ім'я" />
      <TextField source="last_name" label="Прізвище" />
      <EmailField source="email" label="Email" />
      <FunctionField
        label="Роль"
        render={(record: User) => (
          <Typography
            sx={{
              color: record.is_staff ? "green" : "orange",
              fontWeight: "bold",
            }}
          >
            {record.is_staff ? "Адміністратор" : "Користувач"}
          </Typography>
        )}
      />
    </Datagrid>
  </List>
);
