import { TabbedForm, FormTab } from 'react-admin';
import { TopBooksList } from './TopBooksList';

export const AdvertisementPage = () => (
    <TabbedForm>
        <FormTab label="Вивести в топ">
            <TopBooksList />
        </FormTab>
    </TabbedForm>
);