"use server";

import axios from "axios";

export const fetcher = async (url: string) => {
  return await axios
    .get(`${process.env.API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      params: {
        language: "pt-BR",
      },
    })
    .then(({ data }) => {
      return data;
    });
};
