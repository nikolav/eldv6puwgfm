export default defineNuxtRouteMiddleware(async () => {
  console.info("--mw-auth-com");
  const auth = useStoreApiAuth();
  if (!auth.isCompany$) return await navigateTo({ name: "index" });
});
