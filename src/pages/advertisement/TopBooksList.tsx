import {
  Datagrid,
  EditButton,
  List,
  TextField,
  useGetList,
  SimpleForm,
  AutocompleteInput,
} from "react-admin";

export const TopBooksList = () => {
  const { data: topBooks, isLoading } = useGetList("hide");

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <List>
      <Datagrid
        data={topBooks}
        rowClick="show"
        sx={{
          ".RaDatagrid-headerCell": { fontWeight: "bold", bgcolor: "#d88f42" },
        }}
      >
        <TextField source="book_name" label="Назва книжки" />
        <TextField source="is_active" label="Закріплено в топі" />
        <TextField source="date_end" label="Дата завершення" />
        <TextField source="price_store" label="Магазин для цін" />
        <EditButton label="Редагувати" />
      </Datagrid>
    </List>
  );
};

export const BookSearch = () => {
  const { data: books, isLoading } = useGetList("books");

  return (
    <SimpleForm>
      <AutocompleteInput
        source="book"
        choices={books}
        optionText="name"
        optionValue="id"
        isLoading={isLoading}
      />
    </SimpleForm>
  );
};
