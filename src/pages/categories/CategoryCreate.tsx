import { Create, SimpleForm, TextInput } from "react-admin";

interface CreatePropsTypes {
  id: string;
  name: string;
}

const CategoryCreate = (props: CreatePropsTypes) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};

export default CategoryCreate;
