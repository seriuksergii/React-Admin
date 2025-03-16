import {
  Datagrid,
  FunctionField,
  List,
  NumberField,
  TextField,
} from "react-admin";

export const BookList = () => (
  <List>
    <Datagrid>
      <TextField source="name" label="Назва" />
      <TextField source="author" label="Автор" />
      <TextField source="category" label="Категорія" />
      <FunctionField
        label="Опис"
        render={(record) => `${record.description.substring(0, 50)}...`}
      />
      <NumberField source="price" label="Ціна" />
      <TextField source="price_with_discount" label="Ціна зі знижкою" />
      <TextField source="type_of_prod" label="Тип книги" />
      <NumberField source="year_of_publication" label="Рік публікації" />
      <TextField source="language" label="Мова" />
      <TextField source="cover_type" label="Обкладинка" />
    </Datagrid>
  </List>
);
