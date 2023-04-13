const { BehaviorSubject } = require("rxjs");

export const cachedSubstations = new BehaviorSubject();

export const setCachedSubstations = ({stations,refresh}) => {
    cachedSubstations.next({stations,refresh})
}