import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  EditButton,
} from "react-admin";

const TopBooksList = () => (
  <List resource="priority" filter={{ is_pinned: true }}>
    <Datagrid>
      <TextField source="name" label="Назва" />
      <BooleanField source="is_pinned" label="Закріплено в топі" />
      <DateField source="date_end" label="Дата завершення" />
      <BooleanField source="hide_prices" label="Приховати ціни" />
      <TextField source="selected_store" label="Обраний магазин" />
      <EditButton />
    </Datagrid>
  </List>
);

export default TopBooksList;
