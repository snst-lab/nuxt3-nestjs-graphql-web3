import { jsonToGraphQLQuery } from "json-to-graphql-query";

export async function useQuery(
  methodName: string,
  args?: Record<string, any> | null,
  field?: string[] | null,
  variables?: Record<string, any> | null
) {
  args = args ?? {};
  field = field ?? ["response"];
  variables = variables ?? {};
  const config = useRuntimeConfig();
  const queryString = jsonToGraphQLQuery({
    [methodName]: {
      __args: args,
    },
  });
  const { data } = await axios.post(config.public.api.graphQlBase, {
    query: `query {${queryString}{${field.join("\n")}}}`,
    variables,
  });
  return handleResponse(methodName, data);
}

export async function useMutation(
  methodName: string,
  args?: Record<string, any> | null,
  field?: string[] | null,
  variables?: Record<string, any> | null
) {
  args = args ?? {};
  field = field ?? ["response"];
  variables = variables ?? {};
  const config = useRuntimeConfig();
  const queryString = jsonToGraphQLQuery({
    [methodName]: {
      __args: args,
    },
  });
  const { data } = await axios.post(config.public.api.graphQlBase, {
    query: `mutation {${queryString}{${field.join("\n")}}}`,
    variables,
  });
  return handleResponse(methodName, data);
}

function handleResponse(methodName: string, data: any) {
  if (data.data && data.data[methodName]) {
    return data.data[methodName]["response"] ?? null;
  } else {
    const error = data.errors[0].extensions;

    switch (error?.response?.statusCode) {
      case 403:
        error.message = "セッションが無効です。再度認証してください。";
        break;
      case 404:
        error.message = "リクエストされたURLが存在しません。";
        break;
      default:
        error.message = "無効なリクエストです。";
    }

    switch (error.exception?.code) {
      case "P2002":
        error.message = "すでに登録されています。";
        break;
      default:
        error.message = "無効なリクエストです。";
    }

    return {
      data: null,
      error,
    };
  }
}
