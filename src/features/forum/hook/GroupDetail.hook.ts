import { useEffect, useState } from "react";
import { groupService } from "../services/group.service";
import { IGroup, IGroupProps } from "../interface";
import { IUser } from "@/features";
import { openLoading, closeLoading } from "@/common";
import { useAppDispatch } from "@/plugins";

export const useFunctionGroupDetail = (props: IGroupProps) => {
  const { groupId, setTotalUsers } = props;
  const dispatch = useAppDispatch();
  const [isOpenAddUsers, setIsOpenAddUsers] = useState(false);
  const [usersInGroups, setUsersInGroups] = useState<IUser[]>([]);

  const [group, setGroup] = useState<IGroup>();

  async function getGroupDetail() {
    dispatch(openLoading());

    try {
      const response = await groupService.getGroupById(groupId!);
      if (response?.success) {
        setGroup(response?.data?.group);
        setTotalUsers?.(response?.data?.totalUsers);
        setUsersInGroups([
          ...response?.data?.group?.users,
          response?.data?.group?.manager,
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  }

  useEffect(() => {
    getGroupDetail();
  }, []);

  const updateUserList = () => {
    getGroupDetail();
  };
  return {
    isOpenAddUsers,
    setIsOpenAddUsers,
    group,
    updateUserList,
    usersInGroups,
  };
};
