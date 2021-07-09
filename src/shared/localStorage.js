const setLS = (key, value) => {
  localStorage.setItem(`${key}`, `${value}`);
};

const getLS = (key) => {
  localStorage.getItem(key);
};

const deleteLS = (key) => {
  localStorage.removeItem(key);
};

export { getLS, setLS, deleteLS };
