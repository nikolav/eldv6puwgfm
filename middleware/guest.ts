export default defineNuxtRouteMiddleware(async () => {
  console.info("--mw-guest");
  const auth = useStoreApiAuth();
  // if (auth.isAuth$) return await navigateTo({ name: "index" });
  if (auth.isAuth$ && !auth.isDefault$) await navigateTo({ name: "index" });
});
