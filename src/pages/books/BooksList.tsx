import {
  Datagrid,
  List,
  NumberField,
  SearchInput,
  TextField,
} from "react-admin";

export const BookList = () => (
  <List
    sort={{ field: "first_name", order: "DESC" }}
    filters={[<SearchInput key="search-input" source="q" alwaysOn />]}
  >
    <Datagrid
      rowClick="show"
      sx={{
        ".RaDatagrid-headerCell": { fontWeight: "bold", bgcolor: "#d88f42" },
      }}
    >
      <TextField source="name" label="Назва" />
      <TextField source="author" label="Автор" />
      <TextField source="category" label="Категорія" />
      {/* <FunctionField
        label="Опис"
        render={(record) => `${record.description.substring(0, 50)}...`}
      /> */}
      <NumberField source="price" label="Ціна" />
      <NumberField source="price_with_discount" label="Ціна зі знижкою" />
      <TextField source="type_of_prod" label="Тип книги" />
      <NumberField source="year_of_publication" label="Рік публікації" />
      <TextField source="language" label="Мова" />
      <TextField source="cover_type" label="Обкладинка" />
    </Datagrid>
  </List>
);
