import { BooleanInput, Edit, SimpleForm, TextInput } from "react-admin";
import CustomBackButton from "../../components/CustomBackButton";

export const UserEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="first_name" label="Ім'я" />
        <TextInput source="last_name" label="Прізвище" />
        <TextInput source="email" label="Email" />
        <BooleanInput
          source="is_staff"
          label="Роль: Користувач/Адміністратор"
        />
        <CustomBackButton />
      </SimpleForm>
    </Edit>
  );
};
