export const buildApiUrl = (url) => {
  let api_target =
    process.env.NODE_ENV === "development" ? "http://127.0.0.1:9999" : "";
  return api_target + url;
};
