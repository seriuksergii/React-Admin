import { Admin, Resource } from "react-admin";
import { BrowserRouter } from "react-router-dom";
import authProvider from "./authProvider";
import CustomLoginPage from "./components/CustomLoginForm";
import { ScrapperList } from "./pages/scrappers/ScrapperList";
import ScrapperCreate from "./pages/scrappers/ScrapperCreate";
import { ScrapperEdit } from "./pages/scrappers/ScrapperEdit";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import CastIcon from "@mui/icons-material/Cast";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import HomePage from "./components/HomePage";
import { Layout } from "./Layout";
import { UserList } from "./pages/users/UserList";
import { UserEdit } from "./pages/users/UserEdit";
import { UserShow } from "./pages/users/UserShow";
import { BookList } from "./pages/books/BooksList";
import UserCreate from "./pages/users/UserCreate";
import { CategoryList } from "./pages/categories/CategoryList";
import { CategoryEdit } from "./pages/categories/CategoryEdit";
import CategoryCreate from "./pages/categories/CategoryCreate";
import CustomDataProvider from "./dataProvider";
import { BookShow } from "./pages/books/BooksShow";
import { AdvertisementPage } from "./pages/advertisement/AdvertisementPage";


const App = () => (
  <BrowserRouter>
    <Admin
      dataProvider={CustomDataProvider}
      layout={Layout}
      authProvider={authProvider}
      loginPage={CustomLoginPage}
      dashboard={HomePage}
    >
      <Resource
        icon={GroupIcon}
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        create={UserCreate}
        options={{ label: "Користувачі" }}
      />
      <Resource
        icon={MenuBookIcon}
        name="books"
        list={BookList}
        show={BookShow}
        options={{ label: "Книги" }}
      />
      <Resource
        icon={FolderCopyIcon}
        name="categories"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        options={{ label: "Категорії" }}
      />
      <Resource
        icon={CastIcon}
        name="scrappers"
        list={ScrapperList}
        edit={ScrapperEdit}
        create={ScrapperCreate}
        options={{ label: "Скрапери" }}
      />

      <Resource
        icon={KeyboardHideIcon}
        name="priority"
        list={AdvertisementPage}
        options={{ label: "Реклама" }}
      />
    </Admin>
  </BrowserRouter>
);

export default App;
