import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/activity';
import { v4 as uuid} from 'uuid';
import { format } from 'date-fns';


export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // wiht makeAutoObservable we don't need to specify the observable and action decorators
    // we just need to specify the class
    // mobx will figure out that all properties should be observables
    // and all funtion should be actions
    makeAutoObservable(this);
  }

  // this returns an array of IActivity sorted by date
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (activityA, activityB) =>
        activityA.date!.getTime() - activityB.date!.getTime()
    );
  }

  get groupedActivities() { 
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        // we convert the date to a string and split it by the T character (ej: 2021-03-06T00:00:00 -> 2021-01-01)
        const date = format(activity.date!, 'dd MMM yyyy');
                      // si ya hay act ese dia    // agregar otra      // agregar un nuevo arr con la act   
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as {[key: string]: IActivity[]})
    );
  } 

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    // if our activity is inside the activityRegistry, we don't need to make a request to the API
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    }
    // but if not, we need to make a request to the API
    else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: IActivity) => {
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity); // key: activity.id, value: activity
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

  // updateActivity is an async action that will update an activity in the database and in the activityRegistry
  updateActivity = async (activity: IActivity) => {
    this.loading = true; // set loading to true
    try {
      await agent.Activities.update(activity); // update the activity in the database
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
      // there are two delete
      // agent.Activities.delete(id)  that deletes from the database
      // and this.activityRegistry.delete(id); that deletes from the local state

      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
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
