import { PRODUCTION$ } from "./vars.env";

const LOGGING_: boolean = true;

export const THEME_ACCENT_SHIFT = 33;
export const DEBUG$ = !PRODUCTION$ && LOGGING_;

export const URL_APP_PUBLIC = PRODUCTION$
  ? "https://nikolav.rs/kantar-rs"
  : "http://localhost:3000/";
