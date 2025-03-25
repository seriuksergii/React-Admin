import { useState } from "react";
import {
  Button,
  useNotify,
  useRefresh,
  useDataProvider,
  DateInput,
  BooleanInput,
} from "react-admin";
import { Select, MenuItem, Box, Typography } from "@mui/material";

export const AddToTopSection = ({ allBooks, currentTopCount }: any) => {
  const [bookId, setBookId] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  );
  const [isActive, setIsActive] = useState(true);

  const refresh = useRefresh();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleAddToTop = () => {
    if (!bookId) return;

    if (currentTopCount >= 5) {
      notify("Максимальна кількість книг у топі - 5", { type: "error" });
      return;
    }

    dataProvider
      .create("priority", {
        data: {
          book_id: bookId,
          is_active: isActive,
          date_end: endDate,
        },
      })
      .then(() => {
        notify("Книгу додано в топ", { type: "success" });
        refresh();
        setBookId(null);
      })
      .catch(() => {
        notify("Помилка при додаванні в топ", { type: "error" });
      });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid #eee",
        borderRadius: "4px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Додати книгу в топ
      </Typography>

      <Box display="flex" alignItems="flex-end" gap={2} mb={2}>
        <Select
          value={bookId || ""}
          onChange={(e) => setBookId(Number(e.target.value))}
          style={{ minWidth: "300px" }}
          displayEmpty
        >
          <MenuItem value="">Оберіть книгу</MenuItem>
          {allBooks?.map((book: any) => (
            <MenuItem key={book.id} value={book.id}>
              {book.title} (ID: {book.id})
            </MenuItem>
          ))}
        </Select>

        <BooleanInput
          source="is_active"
          label="Активна"
          defaultValue={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />

        <DateInput
          source="date_end"
          label="Дата завершення"
          defaultValue={endDate}
          onChange={(date) => setEndDate(date)}
        />

        <Button
          label="Додати"
          onClick={handleAddToTop}
          disabled={!bookId}
          color="primary"
          variant="contained"
        />
      </Box>

      <Typography variant="body2" color="textSecondary">
        Поточний ліміт: {currentTopCount}/5 книг у топі
      </Typography>
    </Box>
  );
};
