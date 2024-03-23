export default defineNuxtRouteMiddleware(async () => {
  const auth = useStoreApiAuth();
  if (auth.isAuth$) return await navigateTo({ name: "index" });
});
