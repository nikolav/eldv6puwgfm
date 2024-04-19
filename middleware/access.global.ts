export default defineNuxtRouteMiddleware((to, from) => {
  console.log({ access: Date.now(), to, from });
});
