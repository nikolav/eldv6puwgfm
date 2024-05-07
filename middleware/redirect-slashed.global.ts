export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/" && to.path.endsWith("/")) {
    const nextPath = to.path.replace(/\/+$/, "") || "/";
    const to_ = assign({}, to, { path: nextPath });
    return navigateTo(to_, { redirectCode: 301 });
  }
});
