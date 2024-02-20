export const getBaseUrl = () =>
  (process.env.NEXT_PUBLIC_API_BASE_URL as string) ||
  ("https://whats-app-server.vercel.app/api/v1" as string);
