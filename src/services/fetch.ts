const globalHeaders = {} as Record<string, string>;

const localCredentials = btoa(
  `${process.env.NEXT_PUBLIC_CREDENTIAL_ID}:${process.env.NEXT_PUBLIC_CREDENTIAL_PASSWORD}`,
);

const localAuthHeader = {
  Authorization: `Basic ${localCredentials}`,
};

export const GlobalHeader = () => {
  const getHeaders = () => {
    return globalHeaders;
  };

  const setHeader = (key: string, value: string) => {
    globalHeaders[key] = value;
  };

  const removeHeader = (key: string) => {
    delete globalHeaders[key];
  };

  return {
    getHeaders,
    setHeader,
    removeHeader,
  };
};

const mergeUrl = (url: string, params?: Record<string, any>) => {
  if (!params) {
    return url;
  }

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  if (Object.keys(filteredParams).length === 0) {
    return url;
  }

  const urlParams = new URLSearchParams(filteredParams);

  return `${url}?${urlParams.toString()}`;
};

const mergeHeaders = (headers?: Record<string, any>, baseUrl?: string) => {
  const baseHeader = {
    "Content-Type": "application/json",
  };

  const localCredentials =
    process.env.NEXT_PUBLIC_NODE_ENV === "local" &&
    process.env.NEXT_PUBLIC_JSON_SERVER_URL !== baseUrl
      ? localAuthHeader
      : {};

  return {
    ...baseHeader,
    ...GlobalHeader().getHeaders(),
    ...localCredentials,
    ...headers,
  };
};

const responseInterceptor = async (response: Response) => {
  if (response.status === 400) {
  }

  if (!response.ok) {
    const result = await response.json();
    return Promise.reject({ ...result, url: response.url });
  }

  return response;
};

interface Props extends RequestInit {
  url?: string;
  baseUrl?: string;
  method?: string;
  headers?: Record<string, any>;
  params?: Record<string, any>;
}

export const fetcher = async ({
  url = "",
  baseUrl = process.env.NEXT_PUBLIC_API_URL,
  method = "GET",
  headers,
  params,
  ...props
}: Props) => {
  const mergedUrl = mergeUrl(baseUrl + url, params);
  const mergedHeaders = mergeHeaders(headers, baseUrl);

  try {
    const response = await fetch(mergedUrl, {
      method,
      headers: mergedHeaders,
      ...props,
    });

    const processedResponse = await responseInterceptor(response);

    if (processedResponse.status === 204) {
      return {
        status: processedResponse.status,
      };
    }

    return await processedResponse.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};
