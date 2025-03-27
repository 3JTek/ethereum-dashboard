/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = (callback: any, timeout: number): ReturnType<typeof setTimeout> => {
  return setTimeout(callback, timeout);
};

export default debounce;
