const localStorageManager = {
  /**
   * Guarda un valor en localStorage asociado a una clave.
   * @param {string} key La clave con la que se almacenará el valor.
   * @param {any} value El valor a almacenar. Si es un objeto o array, se serializará a JSON.
   */
  setItem(key, value) {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error("localStorage no está disponible en este entorno.");
      return;
    }
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error al guardar en localStorage (clave: ${key}):`, error);
    }
  },

  /**
   * Obtiene un valor de localStorage a partir de su clave.
   * @param {string} key La clave del valor que se desea obtener.
   * @returns {any | null} El valor recuperado (deserializado si es JSON) o null si la clave no existe o si localStorage no está disponible.
   */
  getItem(key) {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn("localStorage no está disponible en este entorno.");
      return null;
    }
    try {
      const serializedValue = window.localStorage.getItem(key);

      if (serializedValue === null) {
        return null;
      }
      // Como nuestro `setItem` siempre usa `JSON.stringify`, `JSON.parse`
      // restaurará el tipo de dato original (objeto, array, número, boolean, string).
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error(`Error al leer o parsear desde localStorage (clave: ${key}):`, error);
      return window.localStorage.getItem(key); // Como fallback, devolver el valor crudo si falla el parseo
    }
  },

  /**
   * Elimina un elemento de localStorage según su clave.
   * @param {string} key La clave del elemento a eliminar.
   */
  removeItem(key) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },

  /**
   * Limpia completamente el localStorage del dominio.
   */
  clear() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  },
};

// Exportar el módulo para que pueda ser importado desde otros archivos.
export default localStorageManager;