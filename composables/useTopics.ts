// utils;
// calc keys for data fetching
export const useTopics = () => {
  const {
    docs: {
      PRODUCT_IMAGES,
      TAG_AUTH_PROFILE_prefix,
      CHAT_ORDER_COM_USER_prefix,
    },
    key: {
      TOPIC_CHAT_COM_prefix,
      TOPIC_CHAT_PRODUCTS_prefix,
      PRODUCT_RATING_prefix,
      PRODUCTS_LIKES_prefix,
      COM_RATING_prefix,
    },
  } = useAppConfig();
  const comChat = (comid: number | undefined) =>
    comid ? `${TOPIC_CHAT_COM_prefix}${comid}` : "";
  const productChat = (pid: number | undefined) =>
    pid ? `${TOPIC_CHAT_PRODUCTS_prefix}${pid}` : "";
  const productImages = (pid: number | undefined) =>
    pid ? `${PRODUCT_IMAGES}${pid}` : "";
  const authProfile = (uid: number | undefined) =>
    uid && `${TAG_AUTH_PROFILE_prefix}${uid}`;
  const ratingProduct = (pid: number | undefined) =>
    pid ? `${PRODUCT_RATING_prefix}${pid}` : "";
  const likesProduct = (pid: number | undefined) =>
    pid ? `${PRODUCTS_LIKES_prefix}${pid}` : "";
  const ratingCompany = (uid: number | undefined) =>
    uid ? `${COM_RATING_prefix}${uid}` : "";
  const chatOrder = (oid: number, cid: number, uid: number) =>
    oid && cid && uid
      ? `${CHAT_ORDER_COM_USER_prefix}${oid}:${cid}:${uid}`
      : "";
  return {
    comChat,
    productChat,
    productImages,
    authProfile,
    ratingProduct,
    likesProduct,
    ratingCompany,
    chatOrder,
  };
};
