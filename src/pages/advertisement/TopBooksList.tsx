import { List, useGetList, usePermissions } from "react-admin";
import { TopBooksDataGrid } from './TopBooksDataGrid';
import { AddToTopSection } from './AddToTopSection';
import { ListActions } from './ListActions';

export const TopBooksList = () => {
    const { data: topBooks, isLoading: isLoadingTop } = useGetList("priority", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
    });
    
    const { data: allBooks, isLoading: isLoadingBooks } = useGetList("books", {
        pagination: { page: 1, perPage: 100 },
    });

    const { permissions } = usePermissions();

    if (isLoadingTop || isLoadingBooks) return <div>Завантаження...</div>;

    return (
        <List 
            actions={<ListActions permissions={permissions} />}
            title="Керування книгами в топі"
        >
            <AddToTopSection 
                allBooks={allBooks} 
                currentTopCount={topBooks?.length || 0} 
                permissions={permissions}
            />
            <TopBooksDataGrid 
                topBooks={topBooks} 
                allBooks={allBooks} 
                permissions={permissions}
            />
        </List>
    );
};