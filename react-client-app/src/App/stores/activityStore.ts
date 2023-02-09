import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/activity';
import { v4 as uuid} from 'uuid';


export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    // wiht makeAutoObservable we don't need to specify the observable and action decorators
    // we just need to specify the class
    // mobx will figure out that all properties should be observables
    // and all funtion should be actions
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (activityA, activityB) =>
        Date.parse(activityA.date) - Date.parse(activityB.date)
    );
  }

  

  loadActivities = async () => {
    // this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity); // key: activity.id, value: activity
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id); // this will return the activity with the id key
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: IActivity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity); // add the new activity to the activityRegistry
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: IActivity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity); // update the activity in the activityRegistry
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      // the difference between the first delete (agent.Activities.delete(id))
      //and second delete (this.activities = [...this.activities.filter(a => a.id !== id)])
      // the first one is deleting the activity from the database and second one is deleting it from the local state

      agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
