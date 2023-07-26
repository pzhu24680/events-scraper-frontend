export const clearToken = () => {
  localStorage.removeItem("access_token");
};

export const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
};
