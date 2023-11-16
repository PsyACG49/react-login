import uselocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
  const [value, setvalue] = uselocalStorage(key, initValue);

  const toggle = (value) => {
    setvalue((prev) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
