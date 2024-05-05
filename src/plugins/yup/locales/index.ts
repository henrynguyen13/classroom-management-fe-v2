import i18n from "i18next";
import { defaultLocale } from "yup";

const { mixed: mixedLocale, string: stringLocale } = defaultLocale;

const mixed: typeof mixedLocale = {
  default: (data) => {
    return `yup:mixed.default|${JSON.stringify({
      ...data,
      field: i18n?.t(`form:${data.label || data.path}.label`),
    })}`;
  },
  required: (data) => {
    return `yup:mixed.required|${JSON.stringify({
      ...data,
      field: i18n?.t(`form:${data.label || data.path}.label`),
    })}`;
  },
};

const string: typeof stringLocale = {
  min: (data) => {
    return `yup:string.min|${JSON.stringify({
      ...data,
      field: i18n?.t(`form:${data.label || data.path}.label`),
    })}`;
  },
  max: (data) => {
    return `yup:string.max|${JSON.stringify({
      ...data,
      field: i18n?.t(`form:${data.label || data.path}.label`),
    })}`;
  },
  matches: (data) => {
    return `yup:string.matches|${JSON.stringify({
      ...data,
      field: i18n?.t(`form:${data.label || data.path}.label`),
    })}`;
  },
  email: () => {
    return i18n?.t(`yup:string.email`);
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mixed,
  string,
};
