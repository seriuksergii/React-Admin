import { BooleanField, Datagrid, List, TextField } from "react-admin";

interface ScrapPropsTypes {
  id: string;
  name: string;
  is_active: boolean;
}

export const ScrapperList = (props: ScrapPropsTypes) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <BooleanField source="is_active" />
    </Datagrid>
  </List>
);
