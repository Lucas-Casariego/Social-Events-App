import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IActivity } from "../models/activity";
import { router } from "../router/Routes";
import { store } from "../stores/store";

// The agent.ts file is responsible for making API requests

// for intentionally delaying our application
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch(status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if(data.errors) { // check if there are any errors in the response
                const modelStateErrors = []; // create an empty array to store the errors
                for(const key in data.errors) { // loop through the errors
                    if(data.errors[key]) { // check if the error is not null
                        modelStateErrors.push(data.errors[key]) // if not null, add the error to the array
                    } 
                }
                // throw the errors
                throw modelStateErrors.flat(); //
            } else{
                toast.error(data); // if we get a normal 400 error, just display the error message
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            // this will redirect the user to the not found page
            // router.navigate allow us to navigate to a route from outside of a component (inside a component we'd use the navigate component)
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        }
  // this will pass the error back to the component that was calling the method that caused this particular error
    return Promise.reject(error);
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