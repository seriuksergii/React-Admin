import { useState } from "react";
import {
  Button,
  useNotify,
  useRefresh,
  useDataProvider,
  DateInput,
  BooleanInput,
  SelectInput,
  useGetList,
} from "react-admin";
import {
  Select,
  MenuItem,
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Book {
  id: number;
  title: string;
}

interface Store {
  id: string;
  name: string;
  is_active: boolean;
}

interface PriorityItem {
  id: number;
  book_id: number;
  book_title: string;
  date_end: string;
  is_active: boolean;
}

export const AddToTopSection = ({
  allBooks,
  currentTopCount,
  topBooks,
}: {
  allBooks: Book[];
  currentTopCount: number;
  topBooks: PriorityItem[];
}) => {
  const [bookId, setBookId] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  );
  const [isActive, setIsActive] = useState(true);
  const [hidePrices, setHidePrices] = useState(false);
  const [selectedStore, setSelectedStore] = useState("");

  const refresh = useRefresh();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const { data: stores, isLoading: storesLoading } = useGetList<Store>(
    "scrappers",
    {
      filter: { is_active: true },
      sort: { field: "name", order: "ASC" },
    },
  );

  const handleAddToTop = () => {
    if (!bookId) return;

    if (currentTopCount >= 5) {
      notify("Максимальна кількість книг у топі - 5", { type: "error" });
      return;
    }

    const data: {
      book_id: number;
      is_active: boolean;
      date_end: string;
      hide_prices?: boolean;
      allowed_store?: string;
    } = {
      book_id: bookId,
      is_active: isActive,
      date_end: endDate,
    };

    if (hidePrices && selectedStore) {
      data.hide_prices = true;
      data.allowed_store = selectedStore;
    }

    dataProvider
      .create("priority", { data })
      .then(() => {
        notify("Книгу додано в топ", { type: "success" });
        refresh();
        setBookId(null);
      })
      .catch((error) => {
        notify(error.message || "Помилка при додаванні в топ", {
          type: "error",
        });
      });
  };

  const handleRemoveFromTop = async (bookId: number) => {
    console.log("Deleting priority with book_id:", bookId);

    // Знаходимо id запису в топі за book_id
    const priorityItem = topBooks.find((item) => item.book_id === bookId);

    if (!priorityItem) {
      notify("Не вдалося знайти запис для видалення", { type: "error" });
      return;
    }

    try {
      console.log("Deleting item with ID:", priorityItem.id);
      console.log("Full item data:", priorityItem);

      const response = await dataProvider.delete("priority", {
        id: priorityItem.id,
        previousData: { id: priorityItem.id },
      });

      console.log("Delete response:", response);
      notify("Книгу успішно видалено з топу", { type: "success" });
      refresh();
    } catch (error) {
      notify("Помилка при видаленні з топу. Деталі у консолі.", {
        type: "error",
      });
    }
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

      <Stack spacing={2}>
        <Select
          value={bookId || ""}
          onChange={(e) => setBookId(Number(e.target.value))}
          style={{ minWidth: "300px" }}
          displayEmpty
        >
          <MenuItem value="">Оберіть книгу</MenuItem>
          {allBooks?.map((book: Book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.title} (ID: {book.id})
            </MenuItem>
          ))}
        </Select>

        <Box display="flex" alignItems="center" gap={2}>
          <BooleanInput
            source="is_active"
            label="Закріпити в топі"
            defaultValue={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <DateInput
            source="date_end"
            label="Дата завершення"
            defaultValue={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <BooleanInput
            source="hide_prices"
            label="Забрати ціни окрім..."
            defaultValue={hidePrices}
            onChange={(e) => setHidePrices(e.target.checked)}
          />
          {hidePrices && (
            <SelectInput
              source="allowed_store"
              choices={stores || []}
              optionText="name"
              optionValue="id"
              label="Магазин"
              onChange={(e) => setSelectedStore(e.target.value)}
              sx={{ minWidth: 200 }}
              disabled={storesLoading}
            />
          )}
        </Box>

        <Button
          label="Додати"
          onClick={handleAddToTop}
          disabled={!bookId}
          color="primary"
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
        />
      </Stack>

      <Typography variant="body2" color="textSecondary" mt={2}>
        Поточний ліміт: {currentTopCount}/5 книг у топі
      </Typography>

      {topBooks && topBooks.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Книги в топі
          </Typography>
          <List>
            {topBooks.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFromTop(item.book_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.book_title} (ID: ${item.book_id})`}
                  secondary={`Діє до: ${new Date(item.date_end).toLocaleDateString()} | ${
                    item.is_active ? "Активна" : "Неактивна"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};
