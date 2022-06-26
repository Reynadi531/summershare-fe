export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const REGISTER_ENDPOINT = `${BACKEND_URL}/api/v1/auth/register`;
export const LOGIN_ENDPOINT = `${BACKEND_URL}/api/v1/auth/login`;
export const VIEW_ALL_POST = (
  page: number,
  limit: number,
  sort: string,
  order: string
) =>
  decodeURIComponent(
    `${BACKEND_URL}/api/v1/post?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
  );

export const CREATE_POST_ENDPOINT = `${BACKEND_URL}/api/v1/post`;
export const VIEW_POST_ENDPOINT = (id: string) =>
  `${BACKEND_URL}/api/v1/post/${id}`;
