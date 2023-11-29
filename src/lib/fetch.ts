export const apiFetch = (uri: string) => {
  const baseURL = "http://127.0.0.1:5000/api";
  const tokenStorage = localStorage.getItem("access-token");
  const token = `Bearer ${tokenStorage}`;

  return fetch(`http://127.0.0.1:5000/api/${uri}`, {
    headers: {
      "Authorization": token,
    },
  });
};
