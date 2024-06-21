const storage = {
  get(key) {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }
    return JSON.parse(value); // no es del if
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
    alert("ya no estas autorizado");
  },
};

export default storage;
