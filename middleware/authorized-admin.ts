export default defineNuxtRouteMiddleware(async () => {
  console.info("--mw-auth-admin");
  const auth = useStoreApiAuth();
  if (!auth.isAdmin$) return await navigateTo({ name: "auth-login" });
});
