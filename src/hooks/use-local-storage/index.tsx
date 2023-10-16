export const useLocalStorage = () => {
  const useGetLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key)!);
  };

  const useSetLocalStorage = (key: string, item: object) => {
    localStorage.setItem(key, JSON.stringify(item));
  };

  return {
    useGetLocalStorage,
    useSetLocalStorage,
  };
};
