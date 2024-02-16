/**
 * Записать запись в SessionStorage
 * */
export const setSessionStorage = (name: string, data: any = null, json = false) => {
  if (json) {
    data = JSON.stringify(data);
  }
  return sessionStorage.setItem(name, data);
};

/**
 *  Получить запись из SessionStorage
 * */
export const getSessionStorage = (name: string, json = false): any => {
  let item = sessionStorage.getItem(name);
  if (json) {
    item = JSON.parse(item);
  }
  return item;
};
/**
 * Удалить запись из SessionStorage по ключу
 * */
export const removeSessionStorage = (name: string) => {
  sessionStorage.removeItem(name);
};

//=======================================================================

/**
 * Записать запись в LocalStorage
 * */
export const setLocalStorage = (name: string, data: any = null, json = false) => {
  if (json) {
    data = JSON.stringify(data);
  }
  return localStorage.setItem(name, data);
};

/**
 *  Получить запись из LocalStorage
 * */
export const getLocalStorage = (name: string, json = false): any => {
  let item = localStorage.getItem(name);
  if (json) {
    item = JSON.parse(item);
  }
  return item;
};
/**
 * Удалить запись из LocalStorage по ключу
 * */
export const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

//=======================================================================

/**
 * Валидация почты
 * */
export function validateEmail(email:string): boolean {
  const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return emailRegexp.test(email);
}

/**
 * Валидация повтора пароля
 * */
export function validateComparisonPassword(password: string, newPassword: string): boolean {
  return password === newPassword;
}
/**
 * Проверяем на пустоту
 * */
export function validateEmpty(value: string): boolean {
  return value !== null && value !== '';
}

/**
 * Валидация длины
 * */
export function validateLength(value: string, count: number): boolean {
  if (!validateEmpty(value)) return false;
  return value.length >= count;
}

/**
 * Валидация на цифры
 * */
export function validateNumber(value: string): boolean {
  const numberRegexp = /^(?=.*\d).{1,}$/;
  return numberRegexp.test(value);
}

/**
 * Валидация на специальные символы
 * */
export function validateSpecificCharacter(value: string): boolean {
  const specificCharacterRegexp = /^(?=.*[%*()?\@#$~!]).{1,}$/;
  // return specificCharacterRegexp.test(value);
  return true
}

/**
 * Валидация на специальные символы
 * */
export function validateLowerCaseLetter(value: string): boolean {
  const lowerCaseLetterRegexp = /^(?=.*[a-z]).{1,}$/;
  return lowerCaseLetterRegexp.test(value);
}
/**
 * Валидация на нижние буквы
 * */
export function validateUpperCaseLetter(value: string): boolean {
  const upperCaseLetterRegexp = /^(?=.*[A-Z]).{8,}$/;
  return upperCaseLetterRegexp.test(value);
}

/**
 * Валидация логина
 * */
export function validateLogin(login: string): boolean {
  const loginRegexp = /^[a-zA-Z0-9_-]{3,16}$/;

  return loginRegexp.test(login);
}