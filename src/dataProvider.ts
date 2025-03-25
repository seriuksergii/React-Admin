import {
  fetchUtils,
  DataProvider,
  RaRecord,
  DeleteParams,
  DeleteResult,
} from "react-admin";
import { stringify } from "query-string";

const BASE_URL = "https://toread.onrender.com/";
const BOOKS_URL = `${BASE_URL}books/`;
const USERS_URL = `${BASE_URL}moderator/users/`;
const CATEGORIES_URL = `${BASE_URL}moderator/categories/`;
const SCRAPPERS_URL = `${BASE_URL}moderator/scrappers/`;
const HIDE_URL = `${BASE_URL}moderator/hide/`;
const PRIORITY_URL = `${BASE_URL}moderator/priority/`;

const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = localStorage.getItem("token");
  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetchUtils.fetchJson(url, options);
    return response;
  } catch (error) {
    console.error("HTTP Client Error:", error);
    throw new Error("Помилка при виконанні запиту до сервера");
  }
};

const getResourceUrl = (resource: string) => {
  switch (resource) {
    case "books":
      return BOOKS_URL;
    case "users":
      return USERS_URL;
    case "categories":
      return CATEGORIES_URL;
    case "scrappers":
      return SCRAPPERS_URL;
    case "hide":
      return HIDE_URL;
    case "priority":
      return PRIORITY_URL;
    default:
      throw new Error(`Невідомий ресурс: ${resource}`);
  }
};

const CustomDataProvider: DataProvider = {
  async getList(resource, params) {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: "id", order: "ASC" };

    const searchQuery =
      params.filter?.name || params.filter?.search_query || "";
    const query = {
      page,
      page_size: perPage,
      ordering: order === "ASC" ? field : `-${field}`,
      name: searchQuery,
    };

    const url = `${getResourceUrl(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);

    if (!json) {
      throw new Error("Невірна відповідь API: очікувався JSON");
    }

    return {
      data: json.results || json.items || json,
      total: json.count || json.total || json.length || 1,
    };
  },

  async getOne(resource, params) {
    let url;
    if (resource === "books") {
      url = `${BOOKS_URL}${params.id}/`;
    } else {
      url = `${getResourceUrl(resource)}${params.id}/`;
    }

    const { json } = await httpClient(url);

    if (!json || !json.id) {
      throw new Error("Дані не знайдено або неправильний формат відповіді");
    }

    return { data: { ...json, id: json.id } };
  },

  async getMany(resource, params) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${getResourceUrl(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.results || json.items || json,
    };
  },

  async getManyReference(resource, params) {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: "id", order: "ASC" };

    const query = {
      page,
      page_size: perPage,
      ordering: order === "ASC" ? field : `-${field}`,
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };

    const url = `${getResourceUrl(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.results || json.items || json,
      total: json.count || json.total || json.length || 1,
    };
  },

  async create(resource, params) {
    const url = getResourceUrl(resource);
    const { json } = await httpClient(url, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(params.data),
    });

    if (!json || !json.id) {
      throw new Error("Помилка при створенні ресурсу");
    }

    return { data: { ...json, id: json.id } };
  },

  async update(resource, params) {
    if (resource === "advertisement" && params.data.is_pinned) {
      const { json: currentPinnedBooks } = await httpClient(
        `${PRIORITY_URL}?is_pinned=true`,
      );
      if (currentPinnedBooks.length >= 5) {
        throw new Error("Максимальна кількість книг у топі - 5");
      }
    }

    const url = `${getResourceUrl(resource)}${params.id}/`;
    const { json } = await httpClient(url, {
      method: "PATCH",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(params.data),
    });

    return { data: { ...json, id: json.id } };
  },

  async delete<RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    const url = `${getResourceUrl(resource)}${params.id}/`;

    console.log("Виконується DELETE запит на URL:", url);

    try {
      await httpClient(url, {
        method: "DELETE",
      });

      console.log("DELETE запит успішно виконано");
      return { data: (params.previousData || { id: params.id }) as RecordType };
    } catch (error) {
      console.error("Помилка при виконанні DELETE запиту:", error);
      throw error;
    }
  },

  async updateMany(resource, params) {
    const url = getResourceUrl(resource);
    const requests = params.ids.map((id) =>
      httpClient(`${url}${id}/`, {
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(params.data),
      }),
    );

    try {
      const responses = await Promise.all(requests);
      return { data: responses.map(({ json }) => json.id) };
    } catch (error) {
      console.error("Помилка при оновленні кількох записів:", error);
      throw new Error("Помилка при оновленні даних");
    }
  },

  async deleteMany(resource, params) {
    const url = getResourceUrl(resource);
    const requests = params.ids.map((id) =>
      httpClient(`${url}${id}/`, {
        method: "DELETE",
      }),
    );

    await Promise.all(requests);
    return { data: params.ids };
  },

  async getCategories() {
    const { json } = await httpClient(`${BOOKS_URL}categories/`);
    return { data: json };
  },
};

export default CustomDataProvider;
