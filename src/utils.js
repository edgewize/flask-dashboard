export const buildApiUrl = (url) => {
  let api_target =
    process.env.NODE_ENV === "development" ? "http://127.0.0.1:9999" : "";
  return api_target + url;
};

export function range(start, end) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}
