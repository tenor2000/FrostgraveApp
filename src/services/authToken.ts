export function getToken() {
  return localStorage.getItem("accessTokenFG");
}

export function setToken(token: string) {
  localStorage.setItem("accessTokenFG", token);
}

export function removeToken() {
  localStorage.removeItem("accessTokenFG");
}
