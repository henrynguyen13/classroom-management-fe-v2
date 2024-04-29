import isPlainObject from "lodash/isPlainObject";
import mapKeys from "lodash/mapKeys";
import trim from "lodash/trim";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { ClassStatus } from "@/features/classes/constants";
import { AssignmentStatus } from "@/features/assignments/interfaces";
import { useDispatch } from "react-redux";
import { ROLES } from "./constants";
import authStorageService from "./storages/authStorage.service";
import { loggedout } from "@/features/auth/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
export function isValidJSON(str: string) {
  try {
    const object = JSON.parse(str);
    if (object && typeof object === "object") return true;
    return false;
  } catch (error) {
    return false;
  }
}

export function formatDate(date: any) {
  return dayjs(date)
    .locale("vi")
    .format("h:mm A, dddd, DD/MM/YYYY")
    .replace(/, (\w)/, (match) => `${match.toUpperCase()}`);
}
export function trimData(body: any): void {
  const trimValue = (item: any) => {
    mapKeys(item, (value, key) => {
      // remove string contain only space characters
      if (typeof value === "string") {
        item[key] = value.trim();
      }

      // iterate array
      else if (Array.isArray(value)) {
        value.forEach((subValue, index) => {
          // remove string contain only space characters
          if (typeof subValue === "string") {
            value[index] = trim(subValue);
          } else if (isPlainObject(subValue)) {
            trimValue(subValue);
          }
        });
      } else if (isPlainObject(value)) {
        trimValue(value);
      }
    });
  };

  trimValue(body);
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
  try {
    JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return true;
}

export async function showErrorNotificationFunction(message: string) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export async function showSuccessNotificationFunction(message: string) {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function hasPermissionToAccessRoute(
  requiredPermissions: string[]
): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;

  // TODO: implement logic later
  return true;
}

export const showAlert = ({
  title,
  text = "Bạn sẽ không thể khôi phục",
  confirmButtonText = "Xác nhận",
  cancelButtonText = "Hủy",
}: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: cancelButtonText ? true : false,
    confirmButtonColor: "#1D8FE4",
    cancelButtonColor: "secondary",
    confirmButtonText,
    cancelButtonText,
  });
};

export const showSuccessAlert = ({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#1D8FE4",
  });
};

export const subtractHours = (date: any, hours: any) => {
  date.setHours(date.getHours() - hours);

  return date;
};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const convertStatusClass = (status: string) => {
  return status === ClassStatus.CREATED
    ? "Đã tạo"
    : status === ClassStatus.OPENING
    ? "Đang mở"
    : "Đã đóng";
};

export const convertUserRole = (role: string) => {
  switch (role) {
    case ROLES.STUDENT:
      return "Học sinh";
    case ROLES.TEACHER:
      return "Giáo viên";
    case ROLES.ACADEMIC_AFFAIR:
      return "Giáo vụ";
    case ROLES.ADMIN:
      return "Quản trị viên";
  }
};

export const checkExpiredTime = (nowTime: any, expiredTime: any) => {
  return Math.ceil((expiredTime - nowTime) / (24 * 60 * 60 * 1000));
};

export const convertStatusAssignment = (expiredDate: Date) => {
  let expiredTime = new Date(expiredDate).getTime();
  const nowTime = new Date();
  const time = checkExpiredTime(nowTime, expiredTime);
  if (time > 0) {
    return AssignmentStatus.HAPPENNING;
  } else {
    return AssignmentStatus.EXPIRED;
  }
};

export const convertStatusSubmit = (submittedDate: Date, expiredDate: Date) => {
  let expiredTime = new Date(expiredDate).getTime();
  let submittedTime = new Date(submittedDate).getTime();

  const time = checkExpiredTime(submittedTime, expiredTime);
  if (time > 0) {
    return "Đã nộp";
  } else {
    return "Nộp bài muộn";
  }
};
export const isTeacher = () => {
  return authStorageService.getLoginUser().role === ROLES.TEACHER;
};

export const isStudent = () => {
  return authStorageService.getLoginUser().role === ROLES.STUDENT;
};

export const logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(loggedout());
  authStorageService.resetAll();
  navigate("/login");
};

export const convertArrayToJSON = (array: any[]) => {
  const headers: string[] = array[0];
  const jsonData: any[] = [];

  for (let i = 1; i < array.length; i++) {
    const row = array[i];
    const obj: { [key: string]: string } = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = row[j];
      obj[header] = value.toString();
    }

    jsonData.push(obj);
  }

  return jsonData;
};
