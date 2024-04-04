 export const BaseUrl = "https://dummyjson.com/";


export const EndPoints = {
  postDemo : "products/add",
  getDemo : "products"
};

import axios from "axios";

export async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error in get Product", error);
  }
}

export async function postDatahandler(url, postData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const resData = await response.json();
  return resData;
}
