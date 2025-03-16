import { Create, SimpleForm, TextInput } from "react-admin";

interface CreatePropsTypes {
  id: string;
  name: string;
}

const ScrapperCreate = (props: CreatePropsTypes) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};

export default ScrapperCreate;
