export function buildQuery(query: Record<string, unknown>): string {
  const keys = Object.keys(query);
  const len = keys.length;
  let params = "?";
  keys.some((e, i) => {
    params += `${e}=${query[e]}` + (i < len ? "&" : "");
  });
  return params;
}
