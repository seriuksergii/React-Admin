import { Typography } from "@mui/material";
import {
  EmailField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
}

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
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
    </SimpleShowLayout>
  </Show>
);
