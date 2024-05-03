import type { InjectionKey, Ref } from "vue";
import type { IAppData, IAuthProfile } from "@/types";

export const APP_DATA = <InjectionKey<IAppData>>Symbol();
export const PROFILE = <InjectionKey<Ref<IAuthProfile>>>Symbol();
export const AVATAR = <InjectionKey<Ref<string>>>Symbol();
