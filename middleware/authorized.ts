export default defineNuxtRouteMiddleware(async () => {
  console.info("--mw-auth");
  const auth = useStoreApiAuth();
  if (!(auth.isUser$ || auth.isAdmin$))
    return await navigateTo({ name: "auth-login" });
});
