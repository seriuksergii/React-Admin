import { green } from "@mui/material/colors";
import {
  Datagrid,
  List,
  NumberField,
  SearchInput,
  TextField,
} from "react-admin";

export const BookList = () => (
  <List
    sort={{ field: "name", order: "DESC" }}
    filters={[<SearchInput key="search-input" source="name" alwaysOn />]}
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
      <NumberField source="price" label="Ціна" />
      <NumberField
        source="price_with_discount"
        label="Ціна зі знижкою"
        sx={{ color: green[800] }}
      />
      <TextField source="type_of_prod" label="Тип книги" />
      <NumberField source="year_of_publication" label="Рік публікації" />
      <TextField source="language" label="Мова" />
      <TextField source="cover_type" label="Обкладинка" />
    </Datagrid>
  </List>
);
