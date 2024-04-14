export const useGlobalVariable = (varname: string) => {
  const main$$ = useStoreMain();
  return computed({
    get: () => main$$.get(varname),
    set: (val) => main$$.put({ [varname]: val }),
  });
};
