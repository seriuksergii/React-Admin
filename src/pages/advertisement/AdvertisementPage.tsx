import { TabbedForm, FormTab } from "react-admin";
import { TopBooksManager } from "./TopBooksManager";

export const AdvertisementPage = () => (
  <TabbedForm>
    <FormTab label="Вивести в топ">
      <TopBooksManager />
    </FormTab>
  </TabbedForm>
);
