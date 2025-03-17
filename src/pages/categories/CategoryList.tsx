import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  TextField,
} from "react-admin";

interface CatPropsTypes {
  id: string;
  name: string;
}

export const CategoryList = (props: CatPropsTypes) => (
  <List {...props}>
    <Datagrid
      rowClick="show"
      sx={{
        ".RaDatagrid-headerCell": { fontWeight: "bold", bgcolor: "#d88f42" },
      }}
    >
      <TextField source="name" />
      <EditButton />

      <DeleteWithConfirmButton
        confirmTitle="Видалення категорії"
        confirmContent="Ви впевнені, що хочете видалити цю категоію?"
      />
    </Datagrid>
  </List>
);
