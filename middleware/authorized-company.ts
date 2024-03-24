export default defineNuxtRouteMiddleware(async () => {
  const auth = useStoreApiAuth();
  if (!auth.isCompany$) return await navigateTo({ name: "index" });
});
