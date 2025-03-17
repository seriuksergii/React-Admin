import { BooleanField, Datagrid, List, TextField } from "react-admin";

interface ScrapPropsTypes {
  id: string;
  name: string;
  is_active: boolean;
}

export const ScrapperList = (props: ScrapPropsTypes) => (
  <List {...props}>
    <Datagrid
      rowClick="show"
      sx={{
        ".RaDatagrid-headerCell": { fontWeight: "bold", bgcolor: "#d88f42" },
      }}
    >
      <TextField source="name" label='Назва' />
      <BooleanField source="is_active" label='Активний' />
    </Datagrid>
  </List>
);
