// utils;
// calc keys for data fetching
export const useTopics = () => {
  const {
    docs: {
      PRODUCT_IMAGES,
      TAG_AUTH_PROFILE_prefix,
      CHAT_ORDER_COM_USER_prefix,
      COM_PHOTOS_prefix,
    },
    key: {
      PAKETI_UPLATA,
      MAILING_LIST,
      CHAT_MAIN,
      TOPIC_CHAT_COM_prefix,
      TOPIC_CHAT_PRODUCTS_prefix,
      PRODUCT_RATING_prefix,
      PRODUCTS_LIKES_prefix,
      COM_RATING_prefix,
      COM_LIKES_prefix,
      TOPIC_CHAT_PACKAGES,
      POST_IMAGES_prefix,
      TOPIC_RATING_POSTS_prefix,
      POSTS_LIKES_prefix,
      POSTS_CHAT_prefix,
    },
  } = useAppConfig();
  const comChat = (comid: number | undefined) =>
    comid ? `${TOPIC_CHAT_COM_prefix}${comid}` : "";
  const productChat = (pid: number | undefined) =>
    pid ? `${TOPIC_CHAT_PRODUCTS_prefix}${pid}` : "";
  const productImages = (pid: number | undefined) =>
    pid ? `${PRODUCT_IMAGES}${pid}` : "";
  const authProfile = (uid: number | undefined) =>
    uid ? `${TAG_AUTH_PROFILE_prefix}${uid}` : "";
  const ratingProduct = (pid: number | undefined) =>
    pid ? `${PRODUCT_RATING_prefix}${pid}` : "";
  const likesProduct = (pid: number | undefined) =>
    pid ? `${PRODUCTS_LIKES_prefix}${pid}` : "";
  const ratingCompany = (uid: number | undefined) =>
    uid ? `${COM_RATING_prefix}${uid}` : "";
  const chatOrder = (
    oid: number | undefined,
    cid: number | undefined,
    uid: number | undefined
  ) =>
    oid && cid && uid
      ? `${CHAT_ORDER_COM_USER_prefix}${oid}:${cid}:${uid}`
      : "";
  const userPhotos = (uid: number | undefined) =>
    uid ? `${COM_PHOTOS_prefix}${uid}` : "";
  const comLikes = (uid: number | undefined) =>
    uid ? `${COM_LIKES_prefix}${uid}` : "";
  const domainPackagesPayment = (uid: number | undefined) =>
    uid ? `${trimEnd(PAKETI_UPLATA, "/")}/${uid}` : `misc`;
  const postImage = (sid: number | undefined, imageId: number | undefined) =>
    sid && imageId ? `${POST_IMAGES_prefix}${sid}:${imageId}` : "";
  const ratingPosts = (sid: number | undefined) =>
    sid ? `${TOPIC_RATING_POSTS_prefix}${sid}` : "";
  const likesPosts = (sid: number | undefined) =>
    sid ? `${POSTS_LIKES_prefix}${sid}` : "";
  const chatPosts = (sid: number | undefined) =>
    sid ? `${POSTS_CHAT_prefix}${sid}` : "";

  return {
    PAKETI_UPLATA,
    CHAT_MAIN,
    MAILING_LIST,
    TOPIC_CHAT_PACKAGES,
    //
    domainPackagesPayment,
    authProfile,
    chatOrder,
    comChat,
    likesProduct,
    productChat,
    productImages,
    ratingCompany,
    ratingProduct,
    userPhotos,
    comLikes,
    postImage,
    ratingPosts,
    likesPosts,
    chatPosts,
  };
};
