import { AuthStorageService, ROLES } from "@/common";
import { CustomButton } from "@/components";
import { useFunctionReview } from "../hook";

import { ReviewFolder, CreateFolder, UpdateFolder } from "../components/folder";
import { useParams } from "react-router-dom";

export const ReviewPage = () => {
  const user = AuthStorageService.getLoginUser();

  const { id } = useParams();

  const {
    reviews,
    isOpenCreateForm,
    isOpenUpdateForm,
    setIsOpenCreateForm,
    update,
    handleDelete,
    closeUpdateForm,
    openUpdateForm,
    currentReviewId,
  } = useFunctionReview({ classId: id });
  return (
    <div>
      {user?.role === ROLES.TEACHER && (
        <div className="flex justify-end mb-5">
          <CustomButton
            text="Tạo mục mới"
            size="large"
            width="180"
            onClick={() => setIsOpenCreateForm(true)}
          />
        </div>
      )}

      {reviews.map((review) => (
        <ReviewFolder
          classId={id}
          review={review}
          handleDelete={handleDelete}
          openUpdateForm={openUpdateForm}
          role={user?.role}
        />
      ))}

      <CreateFolder
        isOpenForm={isOpenCreateForm}
        handleClose={() => setIsOpenCreateForm(false)}
        update={update}
      />
      {currentReviewId && (
        <UpdateFolder
          isOpenForm={isOpenUpdateForm}
          handleClose={closeUpdateForm}
          update={update}
          reviewId={currentReviewId}
        />
      )}
    </div>
  );
};
