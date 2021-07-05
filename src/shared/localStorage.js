const setLS = (name, value) => {
  localStorage.setItem(`${name}`, `${value}`);
};

const getLS = (name) => {
  localStorage.getItem(`${name}`);
};

const deleteLS = (name) => {
  localStorage.removeItem(`${name}`);
};

export { getLS, setLS, deleteLS };
