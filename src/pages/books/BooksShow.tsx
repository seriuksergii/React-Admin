import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
} from "react-admin";

export const BookShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Назва" />
      <TextField source="author" label="Автор" />
      <TextField source="category" label="Категорія" />
      <NumberField source="price" label="Ціна" />
      <NumberField source="price_with_discount" label="Ціна зі знижкою" />
      <TextField source="type_of_prod" label="Тип книги" />
      <NumberField source="year_of_publication" label="Рік публікації" />
      <TextField source="language" label="Мова" />
      <TextField source="cover_type" label="Обкладинка" />
      <TextField source="description" label="Опис" />
      <TextField source="availability_status" label="Статус доступності" />
      <DateField source="waiting_date" label="Дата очікування" />
    </SimpleShowLayout>
  </Show>
);