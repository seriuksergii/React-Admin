import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  FunctionField,
  List,
  SearchInput,
  ShowButton,
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
  <List
    sort={{ field: "first_name", order: "DESC" }}
    filters={[<SearchInput key="search-input" source="q" alwaysOn />]} 
  >
    <Datagrid
      rowClick="show"
      sx={{
        ".RaDatagrid-headerCell": { fontWeight: "bold", bgcolor: "#d88f42" },
      }}
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
      <EditButton />
      <ShowButton />
      <DeleteWithConfirmButton
        confirmTitle="Видалення користувача"
        confirmContent="Ви впевнені, що хочете видалити цього користувача?"
      />
    </Datagrid>
  </List>
);