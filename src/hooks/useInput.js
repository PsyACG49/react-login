import uselocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
  const [value, setValue] = uselocalStorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
};

export default useInput;
