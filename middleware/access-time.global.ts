export default defineNuxtRouteMiddleware((to, from) => {
  console.info("--mw-access-time");
  console.log({ access: Date.now(), to, from });
});
