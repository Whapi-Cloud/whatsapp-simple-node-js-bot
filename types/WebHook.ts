import { Event } from "./Event";

export type WebHook = {
  url: string;
  events: Event[];
  mode: string;
};
