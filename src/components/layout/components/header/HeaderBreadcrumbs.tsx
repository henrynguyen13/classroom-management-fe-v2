import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Icon from "@mdi/react";
import { mdiHomeImportOutline } from "@mdi/js";
export default function HeaderBreadcrumnbs({ pathname }: { pathname: string }) {
  const getBreadcrumbText = () => {
    if (pathname === "/classes") {
      return "Lớp học";
    } else if (pathname.includes("/test")) {
      return "Kiểm tra";
    } else if (pathname.includes("/classes/")) {
      return "Chi tiết lớp học";
    } else if (pathname === "/exams") {
      return "Đề thi";
    } else if (pathname === "/my-classes") {
      return "Lớp học của tôi";
    } else if (pathname === "/dashboard") {
      return "Trang chủ";
    } else if (pathname.includes("/assignment/")) {
      return "Chi tiết tập về nhà";
    } else if (pathname.includes("/assignment")) {
      return "Bài tập về nhà";
    } else if (pathname.includes("/profile")) {
      return "Thông tin cá nhân";
    } else {
      return "";
    }
  };
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <Icon path={mdiHomeImportOutline} size={1} />{" "}
      </Link>
      <Link underline="hover" color="#1B1B33" href={pathname}>
        {getBreadcrumbText()}
      </Link>
    </Breadcrumbs>
  );
}
