import axiosClient from "../client";

export const login = (username, password) =>
  axiosClient.post("login", { username, password });
