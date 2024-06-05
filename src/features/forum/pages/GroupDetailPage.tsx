import GroupNoAvatar from "@/assets/images/group-no-avatar.jpg";
import { CreatePostForm, ForumState, IGroup, groupService } from "@/features";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiEarth, mdiLock } from "@mdi/js";
import { AppStatus } from "@/components";
import { AuthStorageService, getStatus, getStatusColor } from "@/common";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { useFunctionPost } from "@/features/posts/hook/post.hook";
import { PostWidget } from "@/features";
export const GroupDetailPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<IGroup>();

  const {
    posts,
    total,
    isOpenCreateForm,
    isOpenUpdateForm,
    setTotal,
    setPosts,
    setIsOpenCreateForm,
    setIsOpenUpdateForm,
    updatePostList,
  } = useFunctionPost({ groupId: id });
  const user = AuthStorageService.getLoginUser();

  async function getGroupDetail() {
    const response = await groupService.getGroupById(id!);
    if (response?.success) {
      console.log("--------", response);
      setGroup(response?.data?.group);
      setTotal(response?.data?.totalUsers);
    }
  }

  useEffect(() => {
    getGroupDetail();
  }, []);
  return (
    <div>
      <div className="w-full h-[200px] shadow-forumBox rounded-b-lg">
        <img
          className="w-full h-[200px] object-cover rounded-b-lg "
          src={GroupNoAvatar}
          alt="Group No Avatar"
        />
      </div>
      <div className="mt-5 text-2xl uppercase font-semibold">{group?.name}</div>

      <div className="flex items-center mt-2">
        <div className="mr-3">
          {group?.status === ForumState.PUBLIC ? (
            <Icon path={mdiEarth} size={1} />
          ) : (
            <Icon path={mdiLock} size={1} />
          )}
        </div>
        <AppStatus
          label={getStatus(group?.status!)}
          backgroundColor={getStatusColor(group?.status!).backgroundColor}
          dotColor={getStatusColor(group?.status!).dotColor}
        />
        <span className="ml-3">{total} thành viên</span>
      </div>

      <div className="grid grid-cols-12 gap-8 mt-5">
        <div className="col-span-8">
          <div className="flex items-center rounded-lg  shadow-forumBox bg-white p-6 mb-5">
            <Avatar alt="avatar" src={user?.avatar} />

            <div
              onClick={() => setIsOpenCreateForm(true)}
              className="bg-background-1 mx-2 pl-5 pr-[200px] py-3 rounded-full cursor-pointer hover:opacity-90"
            >
              Bạn viết gì đi...
            </div>
          </div>

          {posts &&
            posts.map((post) => <PostWidget key={post._id} post={post} />)}
        </div>

        <div className="col-span-4">
          <div className="bg-white p-5 rounded-lg shadow-forumBox">
            <p className="mb-2 text-lg font-semibold">Giới thiệu</p>

            <p>Ngày tạo: {dayjs(group?.createdAt).format("DD/MM/YYYY")}</p>
            <span className="mr-2">Quản trị viên: </span>
            <span className="flex items-center">
              <Avatar alt="avatar" src={user?.avatar} />{" "}
              <span className="ml-2">{group?.manager?.username}</span>
            </span>
          </div>
        </div>
      </div>

      <CreatePostForm
        isOpenForm={isOpenCreateForm}
        handleClose={() => setIsOpenCreateForm(false)}
        updatePostList={updatePostList}
        groupId={id!}
      />
    </div>
  );
};
