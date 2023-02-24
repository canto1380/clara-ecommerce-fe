
export const setDataToken = (data) => {
  return localStorage.setItem("data-security-page", JSON.stringify(data));
};
export const setToken = (token) => {
  return localStorage.setItem("jwt-security-page", JSON.stringify(token));
};
export const getToken = () => {
  return localStorage.getToken("jwt-security-page");
};
export const deleteToken = () => {
  localStorage.removeItem("data-security-page");
  return localStorage.removeItem("jwt-security-page");
};
export const isAuthenticated = () => {
  if (localStorage.getItem("jwt-security-page")) return true;
  return false;
};

export const setCartData = (data) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem("cart-clara", JSON.stringify(data));
  }
};
export const getCartData = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart-clara"))
  }
};
