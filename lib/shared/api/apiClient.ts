type Method = "GET" | "POST" | "PUT" | "DELETE";

type Headers = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any>;

type RequestParameters = {
  headers?: Headers;
  body?: Body;
};

const get = <T>(url: string, requestParameters?: RequestParameters) => {
  return sendRequest<T>(url, { method: "GET", ...requestParameters });
};

const post = <T>(url: string, requestParameters?: RequestParameters) => {
  return sendRequest<T>(url, { method: "POST", ...requestParameters });
};

const put = <T>(url: string, requestParameters?: RequestParameters) => {
  return sendRequest<T>(url, { method: "PUT", ...requestParameters });
};

const sendRequest = async <T>(url: string, { method, body, headers }: RequestParameters & { method: Method }): Promise<T> => {
  const response = await fetch(url, {
    method: method,
    headers: new Headers({
      "content-type": "application/json",
      ...headers,
    }),
    body: body ? JSON.stringify(body) : null,
  });

  if (response.ok) {
    return response.json();
  } else {
    console.log(response);
    console.log(await response.json());

    throw new Error(response.statusText);
  }
};

const apiClient = { get, post, put };

export default apiClient;
