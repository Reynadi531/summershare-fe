export const fetcher = (url: string, options: object) =>
  fetch(url, { ...options }).then((res) => res.json());
