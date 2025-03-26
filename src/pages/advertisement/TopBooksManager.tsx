import { List, useGetList, usePermissions, SearchInput } from "react-admin";
import { AddToTopSection } from "./AddToTopSection";
import { ListActions } from "./ListActions";
import { Box } from "@mui/material";

interface Book {
  id: number;
  title: string;
  author: string;
  category?: {
    name: string;
  };
}

interface PriorityItem {
  id: number;
  book_id: number;
  book_title: string;
  date_end: string;
  is_active: boolean;
  hide_prices?: boolean;
  allowed_store?: string;
}

export const TopBooksManager = () => {
  const { data: topBooks, isLoading: isLoadingTop } = useGetList<PriorityItem>(
    "priority",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "ASC" },
    },
  );

  const { data: allBooks, isLoading: isLoadingBooks } = useGetList<Book>(
    "books",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "title", order: "ASC" },
      filter: { is_active: true },
    },
  );

  const { permissions } = usePermissions();

  if (isLoadingTop || isLoadingBooks) return <div>Завантаження...</div>;

  const processedBooks =
    allBooks?.map((book) => ({
      id: book.id,
      title: book.title,
    })) || [];

  return (
    <List
      actions={<ListActions permissions={permissions} />}
      title="Керування книгами в топі"
      filters={[<SearchInput key="search-input" source="q" alwaysOn />]}
      empty={false}
      perPage={100} 
    >
      <Box sx={{ width: "800px", maxWidth: "95%" }}>
        <AddToTopSection
          allBooks={processedBooks}
          currentTopCount={topBooks?.length || 0}
          topBooks={topBooks || []}
        />
      </Box>
    </List>
  );
};
