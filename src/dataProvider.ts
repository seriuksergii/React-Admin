import {
  fetchUtils,
  DataProvider,
  DeleteParams,
  DeleteResult,
  RaRecord,
  GetListParams,
  GetOneParams,
  GetManyParams,
} from "react-admin";
import { stringify } from "query-string";

const BASE_URL = "https://toread.onrender.com/";
const BOOKS_URL = `${BASE_URL}books/`;
const USERS_URL = `${BASE_URL}moderator/users/`;
const CATEGORIES_URL = `${BASE_URL}moderator/categories/`;
const SCRAPPERS_URL = `${BASE_URL}moderator/scrappers/`;
const HIDE_URL = `${BASE_URL}moderator/hide/`;
const PRIORITY_URL = `${BASE_URL}moderator/priority/`;

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
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
      throw new Error(`Unknown resource: ${resource}`);
  }
};

const dataProvider: DataProvider = {
  async getList(resource, params) {
    if (resource === "hide") {
      const url = `${HIDE_URL}?${stringify(params.filter)}`;
      const { json } = await httpClient(url);
      return {
        data: json.results,
        total: json.count,
      };
    }

    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: "id", order: "ASC" };

    const query: Record<string, string | number> = {
      page,
      page_size: perPage,
      ordering: order === "ASC" ? field : `-${field}`,
      ...params.filter,
    };

    const url = `${getResourceUrl(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);

    if (!json?.results || !Array.isArray(json.results)) {
      throw new Error("Invalid API response: expected 'results' array");
    }

    return {
      data: json.results.map((item: { id: GetListParams }) => ({
        ...item,
        id: item.id,
      })),
      total: json.count ?? 0,
    };
  },

  async getOne(resource, params) {
    if (resource === "hide") {
      const url = `${HIDE_URL}${params.id}/`;
      const { json } = await httpClient(url);
      console.log("getOne response (hide):", json);
      return { data: json };
    }

    const url = `${getResourceUrl(resource)}${params.id}/`;
    const { json } = await httpClient(url);
    console.log("getOne response:", json); 

    if (!json || !json.id) {
      throw new Error("Дані не знайдено або неправильний формат відповіді");
    }

    return { data: { ...json, id: json.id } };
  },

  async getMany(resource, params) {
    const query = { id__in: params.ids.join(",") };
    const url = `${getResourceUrl(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.results.map((item: { id: GetOneParams }) => ({
        ...item,
        id: item.id,
      })),
    };
  },

  async getManyReference(resource, params) {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: "id", order: "ASC" };

    const query: Record<string, string | number> = {
      page,
      page_size: perPage,
      ordering: order === "ASC" ? field : `-${field}`,
      [params.target]: params.id,
      ...params.filter,
    };

    const url = `${getResourceUrl(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.results.map((item: { id: GetManyParams }) => ({
        ...item,
        id: item.id,
      })),
      total: json.count ?? 0,
    };
  },

  async create(resource, params) {
    if (resource === "hide") {
      const url = HIDE_URL;
      const { json } = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json };
    }

    const url = getResourceUrl(resource);
    const { json } = await httpClient(url, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(params.data),
    });

    return { data: { ...json, id: json.id } };
  },

  async update(resource, params) {
    if (resource === "hide") {
      const url = `${HIDE_URL}${params.id}/`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: json };
    }

    const url = `${getResourceUrl(resource)}${params.id}/`;
    const { json } = await httpClient(url, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(params.data),
    });

    return { data: { ...json, id: json.id } };
  },

  async delete<RecordType extends RaRecord = DeleteParams>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    if (resource === "hide") {
      const url = `${HIDE_URL}${params.id}/`;
      await httpClient(url, {
        method: "DELETE",
      });
      if (!params.previousData) {
        throw new Error("Previous data is undefined");
      }
      return { data: params.previousData };
    }

    const url =
      resource === "books"
        ? `${BOOKS_URL}${params.id}`
        : `${USERS_URL}${params.id}`;

    const { json } = await httpClient(url, {
      method: "DELETE",
    });

    if (typeof json !== "object" || json === null) {
      throw new Error("Invalid API response: expected an object");
    }

    return {
      data: json as RecordType,
    };
  },

  async getCategories() {
    const { json } = await httpClient(`${BOOKS_URL}categories/`);
    return { data: json };
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

    const responses = await Promise.all(requests);
    return { data: responses.map(({ json }) => json.id) };
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
};

export default dataProvider;
