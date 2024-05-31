"use client";
import getConfig from "next/config";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const getApiUrl = () => {
  const { publicRuntimeConfig } = getConfig();
  console.log(publicRuntimeConfig);

  return publicRuntimeConfig.apiUrl;
};
