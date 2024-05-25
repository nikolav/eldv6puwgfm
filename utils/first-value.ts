export const firstValue = (ls: any) => {
  try {
    for (let key in ls) {
      return ls[key];
    }
  } catch (error) {
    // pass
  }
  return ls;
};
