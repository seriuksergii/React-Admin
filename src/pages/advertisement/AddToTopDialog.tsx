import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDataProvider, useNotify, useRefresh } from "react-admin";

interface Book {
  id: string;
  name: string;
}

const AddToTopDialog = ({ book, onClose }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [dateEnd, setDateEnd] = useState("");
  const [hidePrices, setHidePrices] = useState(false);
  const [selectedStore, setSelectedStore] = useState("");
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const stores = [
    { id: "store1", name: "Магазин 1" },
    { id: "store2", name: "Магазин 2" },
    { id: "store3", name: "Магазин 3" },
  ];

  const handleAddToTop = async () => {
    try {
      // Перевірка, чи не перевищено ліміт у 5 книжок у топі
      const { data: currentPinnedBooks } = await dataProvider.getList(
        "priority",
        {
          filter: { is_pinned: true },
        },
      );
      if (currentPinnedBooks.length >= 5) {
        notify("Максимальна кількість книг у топі - 5", "error");
        return;
      }

      // Додати книжку у топ
      await dataProvider.create("priority", {
        data: {
          book_id: book.id,
          is_pinned: isPinned,
          date_end: dateEnd,
          hide_prices: hidePrices,
          selected_store: selectedStore,
        },
      });

      notify("Книжка успішно додана до топу", "success");
      refresh();
    } catch (error) {
      notify("Помилка при додаванні книжки до топу", "error");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Додати книжку у топ</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Вибрана книжка: {book.name}
        </Typography>

        {/* Чекбокс для закріплення у топі */}
        <FormControl fullWidth margin="normal">
          <Checkbox
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            label="Закріпити в топі"
          />
        </FormControl>

        {/* Поле для введення дати завершення */}
        {isPinned && (
          <MuiTextField
            label="Дата завершення"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        )}

        {/* Чекбокс для приховування цін */}
        <FormControl fullWidth margin="normal">
          <Checkbox
            checked={hidePrices}
            onChange={(e) => setHidePrices(e.target.checked)}
            label="Забрати ціни окрім..."
          />
        </FormControl>

        {/* Випадаючий список магазинів */}
        {hidePrices && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Магазин</InputLabel>
            <Select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              label="Магазин"
            >
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button onClick={handleAddToTop}>Підтвердити</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToTopDialog;
