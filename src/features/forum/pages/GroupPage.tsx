import { GroupBox } from "../components/GroupBox";
import GroupNoAvatar from "@/assets/images/group-no-avatar.jpg";
import { useFunctionGroup } from "../hook/group.hook";
import { CustomButton } from "@/components";
import { CreateGroupForm } from "../components";
import { ForumState } from "../interface";
import { useNavigate } from "react-router-dom";
import { getStatus } from "@/common";
export const ForumPage = () => {
  const navigate = useNavigate();
  const {
    groups,
    total,
    setGroups,
    setTotal,
    isOpenUpdateForm,
    setIsOpenUpdateForm,
    updateGroupList,
    isOpenCreateForm,
    setIsOpenCreateForm,
  } = useFunctionGroup();

  return (
    <div>
      <div className="flex justify-end py-5">
        <CustomButton
          text="Tạo nhóm mới"
          onClick={() => setIsOpenCreateForm(true)}
        />
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-12">
          {groups.map((group) => (
            <div
              key={group?._id}
              className="col-span-4"
              onClick={() => navigate(`/forum/${group?._id}`)}
            >
              <GroupBox
                name={group?.name}
                avatar={group?.avatar ?? GroupNoAvatar}
                totalMembers={group?.users.length + 1}
                status={getStatus(group?.status)}
                backgroundColor="#EDFFDF"
                dotColor="#57AA16"
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <img
            src={GroupNoAvatar}
            className="h-80 flex my-0 mx-auto"
            alt="No-groups"
          />
          <div className="mt-2 text-center font-medium">
            Hiện chưa có nhóm nào.
          </div>
        </>
      )}

      <CreateGroupForm
        isOpenForm={isOpenCreateForm}
        handleClose={() => setIsOpenCreateForm(false)}
        updateGroupList={updateGroupList}
      />
    </div>
  );
};
