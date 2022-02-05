export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};
export const getNextDays = (days: number): Date => {
  const today = new Date()
   const nextDays = new Date(today)
   nextDays.setDate(nextDays.getDate() + days);
   return nextDays;
};
export const getPastDays = (days: number): Date => {
  const today = new Date()
   const pastDays = new Date(today)
   pastDays.setDate(pastDays.getDate() - days);
   return pastDays;
};
