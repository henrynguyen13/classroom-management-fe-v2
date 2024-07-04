import { GroupBox } from "../components/GroupBox";
import GroupNoAvatar from "@/assets/images/group-no-avatar.jpg";
import { useFunctionGroup } from "../hook/group.hook";
import { CustomButton } from "@/components";
import { CreateGroupForm } from "../components";
import { useNavigate } from "react-router-dom";
import { getStatus, getStatusColor } from "@/common";
export const ForumPage = () => {
  const navigate = useNavigate();
  const { groups, updateGroupList, isOpenCreateForm, setIsOpenCreateForm } =
    useFunctionGroup();

  return (
    <div>
      <div className="flex justify-end py-5">
        <CustomButton
          text="Tạo nhóm mới"
          onClick={() => setIsOpenCreateForm(true)}
        />
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-12 gap-5">
          {groups.map((group) => (
            <div
              key={group?._id}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
              onClick={() => navigate(`/forum/${group?._id}`)}
            >
              <GroupBox
                name={group?.name}
                avatar={group?.avatar ?? GroupNoAvatar}
                totalMembers={group?.users.length + 1}
                status={getStatus(group?.status)}
                // backgroundColor="#EDFFDF"
                // dotColor="#57AA16"
                backgroundColor={getStatusColor(group?.status!).backgroundColor}
                dotColor={getStatusColor(group?.status!).dotColor}
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
