import { Box, Typography } from "@mui/material";
import BookSearchList from "./BookSearchList";
import AddToTopDialog from "./AddToTopDialog";
import TopBooksList from "./TopBooksList";
import { useState } from "react";

interface Book {
  id: string;
  name: string;
}

const AdvertisementPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (book: Book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Реклама
      </Typography>

      <BookSearchList onSelectBook={handleOpenDialog} />

      {openDialog && (
        <AddToTopDialog book={selectedBook} onClose={handleCloseDialog} />
      )}

      {/* Список книжок у топі */}
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Книжки у топі
      </Typography>
      <TopBooksList />
    </Box>
  );
};

export default AdvertisementPage;
