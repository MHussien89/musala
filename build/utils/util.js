export const isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
};
export const getNextDays = (days) => {
    const today = new Date();
    const nextDays = new Date(today);
    nextDays.setDate(nextDays.getDate() + days);
    return nextDays;
};
export const getPastDays = (days) => {
    const today = new Date();
    const pastDays = new Date(today);
    pastDays.setDate(pastDays.getDate() - days);
    return pastDays;
};
//# sourceMappingURL=util.js.map