import { ICommonListQuery, ROWS_PER_PAGE } from "@/common";
import { useEffect, useState } from "react";
import { groupService } from "../services/group.service";
import { IGroup, IGroupProps } from "../interface";
import { IUser } from "@/features";

export const useFunctionGroupDetail = (props: IGroupProps) => {
  const { groupId, setTotalUsers } = props;
  const [isOpenAddUsers, setIsOpenAddUsers] = useState(false);
  const [usersInGroups, setUsersInGroups] = useState<IUser[]>([]);

  const [group, setGroup] = useState<IGroup>();

  async function getGroupDetail() {
    const response = await groupService.getGroupById(groupId!);
    if (response?.success) {
      console.log("--------", response);
      setGroup(response?.data?.group);
      setTotalUsers?.(response?.data?.totalUsers);
      setUsersInGroups([
        ...response?.data?.group?.users,
        response?.data?.group?.manager,
      ]);
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
