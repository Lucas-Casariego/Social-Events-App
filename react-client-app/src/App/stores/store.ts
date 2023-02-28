import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

// this file is responsible for creating our react context
// we'll use this react context to provide our stores to our components

interface IStore {
  activityStore: ActivityStore;
  commonStore: CommonStore;
}

// as we create new stores, we add them to the interface (Istore) and the store object
// and that's gonna be available in our react context
export const store: IStore = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

// we create a simple react hook that allow us to use our stores inside our components
export function useStore() {
  return useContext(StoreContext);
} 