import { AppDispatch } from "../..";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./types";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const json = localStorage.getItem("events") || "[]";
      const events = JSON.parse(json) as IEvent[];
      events.push(event);

      dispatch(EventActionCreators.setEvents(events));
      localStorage.setItem("events", JSON.stringify(events));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const json = localStorage.getItem("events") || "[]";
      const events = JSON.parse(json) as IEvent[];

      const currentUserEvents = events.filter(
        (ev) => ev.author === username || ev.guest === username
      );

      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  },
};
