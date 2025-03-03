//Debounce

export const  debounce = <T extends (...args: any[]) => void>(callee: T, timeoutMs: number) => {
  let lastCall: number | null = null
  let lastCallTimer: ReturnType<typeof setTimeout>

  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now()

    if (lastCall && now - lastCall <= timeoutMs) {
      clearTimeout(lastCallTimer)
    }

    lastCall = now
    lastCallTimer = setTimeout(() => callee.apply(this, args), timeoutMs)
  }
}


//(Clamp)  Функции для подключения в SCSS, которые автоматически вычислят среднее значение
/**
 * //Пример функции для размеров в rem
 * @param $min -  минимальный шрифт 
 * @param $width - ширина экрана
 * @param $max - максимальный шрифт 
 **/ 
@function clm_rem($min, $width, $max) {
	$min_rem: #{$min + rem};
	$max_rem: #{$max + rem};
	$width_vw: #{calc(round(($max * 16) / ($width / 100) * 100000) / 100000) + vw};
	@return clamp($min_rem, $width_vw, $max_rem);
}
//Пример подключения функции, если максимальный шрифт 2rem, минимальный 1.5rem и он должен уменьшаться, когда разрешение экрана меньше 600px
font-size: clm_rem(1.5, 600, 2);


/**
 * //Для размеров в px
 * @param $min -  минимальный отступ 
 * @param $width - ширина экрана
 * @param $max - максимальный отступ 
 **/ 
@function clm_px($min, $width, $max) {
	$min_px: #{$min + px};
	$max_px: #{$max + px};
	$width_vw: #{calc(round($max / ($width / 100) * 100000) / 100000) + vw};
	@return clamp($min_px, $width_vw, $max_px);
}
//Подключаем функцию для уменьшения отступов в блоке. Максимальный отступ 30px, минимальный 20px. Отступ должен уменьшаться при разрешении меньше 600px
padding: clm_px(20, 600, 30);

//=======================================================================

/**
 * Валидация на наличие поля 
 * keyof typeof
 * @param data - обьект 
 **/ 
const formData = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  id: 123
}
// type ValidationResult = {
//   [key in keyof typeof formData]: boolean
// }

export function validate<T>(data: T): { [key in keyof T]: boolean } | void {}
const r = validate<typeof formData>(formData)


/**
 * Изменение значения поля обьекта
 * @param obj - обьект 
 * @param field - поле
 * @param val - значение поля
 **/ 
const months = {
  January: 31,
  February: 28,
  March: 31,
}

export function pathField<T extends object, U extends keyof T, V extends T[U]>(obj: T, field: U, val: V){}
pathField(months, 'February', 31)

/**
 * Возвращает ключ поля обьекта
 * @param obj - обьект 
 * @param day - ключ
 **/ 
export function getKeyObj<T extends object, U extends keyof T>(obj: T, value: T[U]):U | null{
  const key = (Object.keys(obj) as Array<U>).find(k => obj[k] === value)
  return key || null
}
getKeyObj(months, 31)


/**
 * Возвращает значение поля обьекта
 * @param obj - обьект 
 * @param key - ключ
 **/ 
export function getValueObj<T extends object, U extends keyof T>(obj: T, key: U){
  return obj[key]
}
getValueObj(months, 'January')

/**
 * Возвращает заполненный массив 
 * @param len - длина массива 
 * @param elem - заполнитель
 **/ 
export function fillArray<T>(len: number, elem: T ): T[]{
      return new Array<T>(len).fill(elem)
}

//=======================================================================

/**
 * Замена значений в строке из массива данных, заменяет от 1-...
 * @param {string} str - Строка в которой находятся ключи $
 * @param {string[]} values - Массив значений для замены
 * */
export function replaceValues(str: string, values: string[]): string {
  return str.replace(/\$(\d+)/g, (_, index) => values[index - 1] || '');
}

/**
 * Возвращает разницу между датами в минутах
 * @param start
 * @param end
 * @param decimals
 * */
export function getSecondsBetweenDates(start: any, end: any, decimals = 0): number {
  const diff = end - start;
  const diffInMilliseconds = Math.abs(diff);
  const diffInSeconds = diffInMilliseconds / 1000;
  const roundedSeconds = diffInSeconds.toFixed(decimals);
  return Number(roundedSeconds);
}

/**
 * Получаем значение или отдаем значение по умолчанию, если value окажется пустым
 * @param value - передаваемое значение
 * @param def - значение по умолчанию
 * */
export function getValue<T = string>(value: T, def: T = null): T {
  if (value !== undefined && value !== null) {
    return value;
  }
  return def;
}

/**
 * Проверяет наличие ключа по значению
 * @param {any} enumObject - Набор именованных значений (Enum)
 * @param {(string | number)} value - Значение для по которому проверяем
 * @returns {boolean}
 */
export function hasKeyByValue(enumObject: any, value: string | number): boolean {
  for (const key in enumObject) {
    if (enumObject[key] === value) {
      return true;
    }
  }
  return false;
}

/**
 * Считает разницу между текущим и переданным временем
 * @param {number} time - Время
 */
export function getDiffTime(time: number): number {
  const currentDate = moment();
  const startTime = moment(new Date(time));
  const diff = startTime.diff(currentDate, 'milliseconds');

  return diff;
}

/**
 * Получает ключ по значению из enum
 * @param {any} enumObject - Enum
 * @param {[string | number]} value - Значение по которому можно найти ключ
 */
export function getKeyByValueEnum<T>(enumObject: any, value: string | number): T {
  return Object.keys(enumObject).find((key) => enumObject[key] === value) as T;
}

// Сливает вместе два объекта
export function deepMerge(to: TMixedObject, from: TMixedObject) {
  for (const key in from) {
    const value = from[key];

    if (isObject(value)) {
      key in to === false && (to[key] = {});

      deepMerge(to[key], value);
    } else {
      to[key] = value;
    }
  }
}

/** Рандомное число
 * @param {number} max - Максимальное число
 */
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
export function getRandomMinMax(min, max) {
  return Math.random() * (max - min) + min;
}

// Переводит текст в верхний регистр
export function uppercase(str: string): string {
  return str.toUpperCase();
}

/**
 * Первую букву делает маленькой
 * @param {string} str - Слова в котором надо сделать заглавную букву
 */
export function strLowerCase(str: string) {
  if (!str) return str;

  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Первую букву делает заглавной
 * @param {string} str - Строка в которой надо сделать заглавную букву
 */
export function ucFirst(str: string) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

/** Удаляет текст из  строки
 * @param {string} str - Строка из которой надо удалить текст
 * @param {string} substring - Строка которую надо удалить из текста
 */
export function removeTextByKey(str: string, substring: string): string {
  return str.replace(substring, '');
}

/**
 * Удаляет текст из строки и возвращает число
 * @param {string} str - Строка из которой надо удалить
 */
export function removeText(str: string): number {
  return +str.replace(/\D/g, '');
}

/**
 * Конвертирует строку в camelCase
 * @param {string} key - Строка которую необходимо конвектировать
 * @param {string} replace - На что запускаем пустоту
 */
export function convertCamelCase(key: string, replace = ' ') {
  const result = key.replace(/([A-Z])/g, ' $1');
  result.split(' ').join(replace).toLowerCase();

  return result[0].toUpperCase() + result.slice(1);
}

/**
 * Искусственная задержка
 * @param {number} delayMs - Время задержки в ms
 * */
export function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

//=======================================================================

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
* Валидация на положительное число 
* */
export function validateNumeric(value: string): boolean {
 const numberRegexp = /^\d+$/;
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