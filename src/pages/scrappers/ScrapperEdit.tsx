import { BooleanInput, Edit, SimpleForm, TextInput } from "react-admin";

interface EditPropsTypes {
  id: string;
  name: string;
  is_active: boolean;
}

export const ScrapperEdit = (props: EditPropsTypes) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Edit>
);
