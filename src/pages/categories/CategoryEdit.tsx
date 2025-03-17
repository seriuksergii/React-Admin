import { Edit, SimpleForm, TextInput } from "react-admin";
import CustomBackButton from "../../components/CustomBackButton";

interface EditPropsTypes {
  id: string;
  name: string;
}

export const CategoryEdit = (props: EditPropsTypes) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <CustomBackButton />
      </SimpleForm>
    </Edit>
  );
};
