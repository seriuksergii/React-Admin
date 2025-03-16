import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  DateInput,
  SelectInput,
} from "react-admin";

const TopBooksEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="book_name" label="Назва книжки" />
        <BooleanInput source="is_active" label="Закріпити в топі" />
        <DateInput source="date_end" label="Дата завершення" />
        <SelectInput
          source="price_store"
          label="Забрати ціни окрім..."
          choices={[
            { id: "store1", name: "Магазин 1" },
            { id: "store2", name: "Магазин 2" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

export default TopBooksEdit;