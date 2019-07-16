import { PartialVideo } from "./Playlist"

export interface Play {
  currentTime: number
  currentPartialVideo: PartialVideo
}

export interface Stop {}
export interface Pause {}

export type PartialVideoPlayer = Play | Stop | Pause
