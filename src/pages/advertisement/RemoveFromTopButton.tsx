import {
  Button,
  useRecordContext,
  useNotify,
  useRefresh,
  useDataProvider,
} from "react-admin";

export const RemoveFromTopButton = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const notify = useNotify();

  const handleClick = async () => {
    if (!record || !record.id) {
      console.error("Некоректний запис для видалення:", record);
      notify("Не вдалося отримати ID книги для видалення", { type: "error" });
      return;
    }

    try {
      console.log("Спроба видалити запис з ID:", record.id);

      await dataProvider.delete("priority", { id: record.id });

      notify("Книгу успішно видалено з топу", { type: "success" });
      refresh();
    } catch (error) {
      console.error("Помилка при видаленні:", error);
      notify("Помилка при видаленні з топу", { type: "error" });
    }
  };

  return (
    <Button
      label="Видалити з топу"
      onClick={handleClick}
      color="error"
      sx={{ marginLeft: "8px" }}
    />
  );
};
