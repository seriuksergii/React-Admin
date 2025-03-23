import { List, Datagrid, TextField, SearchInput } from "react-admin";

const BookSearchList = () => (
  <List
    perPage={10}
    pagination={false}
    filters={[<SearchInput key="search-input" source="name" alwaysOn />]}
  >
    <Datagrid>
      <TextField source="name" label="Назва" />
      <TextField source="author" label="Автор" />
      <TextField source="category" label="Категорія" />
      {/* Додаткові поля */}
    </Datagrid>
  </List>
);

export default BookSearchList;
