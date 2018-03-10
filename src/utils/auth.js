const tokenKey = 'survey-session';

export const setToken = token => {
  localStorage.setItem(tokenKey, token);
}

export const getToken = () => {
  return localStorage.getItem(tokenKey);
}

export const clearSession = () => {
  localStorage.removeItem(tokenKey);
}