import { BooleanInput, Edit, SimpleForm, TextInput } from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="first_name" label="Ім'я" />
      <TextInput source="last_name" label="Прізвище" />
      <TextInput source="email" label="Email" />
      <BooleanInput source="is_staff" label="Роль: Користувач/Адміністратор" />
    </SimpleForm>
  </Edit>
);
