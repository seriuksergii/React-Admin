import { BooleanInput, Create, SimpleForm, TextInput } from "react-admin";
import CustomBackButton from "../../components/CustomBackButton";

const UserCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};

export default UserCreate;
