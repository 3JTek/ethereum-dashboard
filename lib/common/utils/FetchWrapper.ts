import { ApiError, BadRequest, NotFound, UnAuthenticated, UnAuthorized, UnprocessableEntity } from "./Error";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type Headers = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any>;

type RequestParameters = {
  headers?: Headers;
  body?: Body;
};

class FetchWrapper {
  public get = <T>(url: string, requestParameters?: RequestParameters) => {
    return this.sendRequest<T>(url, { method: "GET", ...requestParameters });
  };

  public post = <T>(url: string, requestParameters?: RequestParameters) => {
    return this.sendRequest<T>(url, { method: "POST", ...requestParameters });
  };

  public put = <T>(url: string, requestParameters?: RequestParameters) => {
    return this.sendRequest<T>(url, { method: "PUT", ...requestParameters });
  };

  private sendRequest = async <T>(url: string, { method, body, headers }: RequestParameters & { method: Method }): Promise<T> => {
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
      console.error(await response.json());

      if (response.status === 400) {
        throw new BadRequest(response.statusText);
      }

      if (response.status === 401) {
        throw new UnAuthorized(response.statusText);
      }

      if (response.status === 403) {
        throw new UnAuthenticated(response.statusText);
      }

      if (response.status === 404) {
        throw new NotFound(response.statusText);
      }

      if (response.status === 422) {
        throw new UnprocessableEntity(response.statusText);
      }

      throw new ApiError(`Unhandled error: ${response.statusText}`);
    }
  };
}

export default FetchWrapper;
