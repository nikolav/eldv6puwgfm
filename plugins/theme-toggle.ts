export default defineNuxtPlugin((_nuxtapp) => {
  const {
    theme: { DARK, LIGHT, DEFAULT },
    key: { THEME },
  } = useAppConfig();
  const theme$ = useState(THEME, () => DEFAULT);
  const themeToggle = (mode?: string | undefined) => {
    theme$.value = mode || (DARK !== theme$.value ? DARK : LIGHT);
  };

  return {
    provide: {
      theme: {
        theme: theme$,
        themeToggle,
      },
    },
  };
});
