import { BehaviorSubject } from "rxjs";

const userCache = new BehaviorSubject();
const tokenCache = new BehaviorSubject();
const substationCache = new BehaviorSubject();

export const setUserCache = (data) => {
  userCache.next(data);
};

export const getUserCache = () => {
  return userCache.value;
};

export const setTokenCache = (data) => {
  tokenCache.next(data);
};

export const getTokenCache = () => {
  return tokenCache.value;
};

export const setSubStationCache = (data) => {
    substationCache.next(data);
  };
  
  export const getSubStationCache = () => {
    return substationCache.value;
  };
