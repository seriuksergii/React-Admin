import { TopBooksList, BookSearch } from "./TopBooksList";

const AdvertisementPage = () => {
  return (
    <div>
      <h1>Реклама</h1>
      <h2>Вивести в топ</h2>
      <BookSearch />
      <h2>Книжки в топі</h2>
      <TopBooksList />
    </div>
  );
};

export default AdvertisementPage;