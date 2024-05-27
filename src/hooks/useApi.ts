import axios from "axios";

const apiClient = () =>
  axios.create({
    baseURL: "https://api.themoviedb.org",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzIyNTkxZWQ3ZDJlMDdhZWUxMGEzM2Y4N2JmYWNlNCIsInN1YiI6IjY2M2ZhNDhlODQ3ZmFlNTYzMjY3NGUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ShxaBBm53u1VllcxJg4V68PdfR9CuwvBz-Bqqwq9ucE",
    },
    params: {
      language: "pt-BR",
    },
  });

export const api = () => ({
  get: async (url: string) => {
    return apiClient()
      .get(url)
      .then(({ data }) => data);
  },
  post: async (url: string, data: object) => {
    return apiClient()
      .post(url, data)
      .then(({ data }) => data);
  },
  put: async (url: string, data: object) => {
    return apiClient()
      .put(url, data)
      .then(({ data }) => data);
  },
});
