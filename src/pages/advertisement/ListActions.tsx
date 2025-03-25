import { TopToolbar, CreateButton } from "react-admin";

export const ListActions = ({ permissions }: any) => (
    <TopToolbar>
        {permissions === 'admin' && (
            <CreateButton 
                label="Додати книгу в топ" 
                resource="priority"
            />
        )}
    </TopToolbar>
);