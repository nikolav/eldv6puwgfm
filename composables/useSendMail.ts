import type { IInputSendMail } from "@/types";
import { MAIL_ENDPOINT } from "@/config";
export const useSendMail = () => {
  const auth = useStoreApiAuth();
  const sendMail = async (config: IInputSendMail) =>
    await $fetch(MAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token$}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: config,
    });

  return {
    sendMail,
  };
};
