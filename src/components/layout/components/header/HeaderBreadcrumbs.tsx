import Icon from "@mdi/react";
import { Link, Breadcrumbs } from "@mui/material";
import { mdiHomeImportOutline } from "@mdi/js";

export const HeaderBreadcrumnbs = ({ pathname }: { pathname: string }) => {
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
      return "Chi tiết bài tập";
    } else if (pathname.includes("/assignment")) {
      return "Bài tập ";
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
};
