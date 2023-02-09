import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

// The agent.ts file is responsible for making API requests

// for intentionally delaying our application
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
})

// this is gonna contain all the request to the backend (API)
// this whole file is a set of helper functions, to make requests to our API in a nice clean way


// <T> is a generic type, we're gonna use this to specify the type of data we're getting back from our API
// T would be substituted for activity array, or activity, or whatever we're getting back from our API 
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  // our get request is going to contain whatever we're getting back from this url
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
};

// an object that stores our requests for our activities
const Activities = {
  list: () => requests.get<IActivity[]>('/activities'),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => requests.post<void>('/activities', activity),
  update: (activity: IActivity) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

// 
const agent = {
  Activities
} 

export default agent;