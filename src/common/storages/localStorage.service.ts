import { isValidJSON } from "../helpers";

export class LocalStorage {
  getLocalStorage(key: string): string {
    if (!localStorage) {
      return "";
    }
    return localStorage.getItem(key) || "";
  }

  setLocalStorage(key: string, value: string): void {
    if (!localStorage) {
      return;
    }
    localStorage.setItem(key, value);
  }

  getObjectFromKey<T>(key: string): T | Record<string, unknown> {
    const jsonString = this.getLocalStorage(key);
    if (isValidJSON(jsonString)) {
      return JSON.parse(jsonString) as T;
    }
    return {};
  }
}

export const storage = new LocalStorage();
