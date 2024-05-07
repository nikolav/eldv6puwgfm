export default defineNuxtRouteMiddleware(async () => {
  console.info("--mw-auth");
  const auth = useStoreApiAuth();
  // if (!(auth.isUser$ || auth.isAdmin$))
  if (!auth.isAuthenticated$) await navigateTo({ name: "auth-login" });
});
