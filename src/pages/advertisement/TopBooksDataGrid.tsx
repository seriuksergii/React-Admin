import {
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  FunctionField,
  useRecordContext,
} from "react-admin";
import { RemoveFromTopButton } from "./RemoveFromTopButton";
import { Chip, Stack } from "@mui/material";

const BookStatusField = () => {
  const record = useRecordContext();
  const now = new Date();
  const endDate = record ? new Date(record.date_end) : null;

  if (!record || !record.is_active) {
    return <Chip label="Вимкнено" color="default" />;
  }

  if (endDate && endDate < now) {
    return <Chip label="Закінчилась" color="error" />;
  }

  return <Chip label="Активна" color="success" />;
};

export const TopBooksDataGrid = ({ topBooks, allBooks, permissions }: any) => {
  const enrichedBooks = topBooks?.map((topBook: any) => {
    const book = allBooks?.find((b: any) => b.id === topBook.book_id);
    return {
      ...topBook,
      id: topBook.id,
      book_name: book?.title || `Книга ID: ${topBook.book_id}`,
      book_author: book?.author,
      book_category: book?.category?.name || "Без категорії",
    };
  });

  return (
    <Datagrid
      data={enrichedBooks}
      sx={{
        ".RaDatagrid-headerCell": {
          fontWeight: "bold",
          bgcolor: "#d88f42",
        },
      }}
    >
      <TextField source="book_name" label="Назва книжки" />
      <TextField source="book_author" label="Автор" />
      <TextField source="book_category" label="Категорія" />
      <FunctionField label="Статус" render={() => <BookStatusField />} />
      <BooleanField source="is_active" label="Закріплено" />
      <DateField source="date_end" label="Дата завершення" showTime />
      <FunctionField
        label="Дії"
        render={() => (
          <Stack direction="row" spacing={1}>
            {permissions === "admin" && <RemoveFromTopButton />}
          </Stack>
        )}
      />
    </Datagrid>
  );
};