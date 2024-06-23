import {
  ICommonListQuery,
  ROWS_PER_PAGE,
  openLoading,
  closeLoading,
} from "@/common";
import { useEffect, useState } from "react";
import { groupService } from "../services/group.service";
import { IGroup } from "../interface";
import { useAppDispatch } from "@/plugins";

export const useFunctionGroup = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const dispatch = useAppDispatch();

  const [total, setTotal] = useState(0);
  const [page, _setPage] = useState(0);
  const rowsPerPage = ROWS_PER_PAGE;

  async function getAllGroups(query: ICommonListQuery) {
    dispatch(openLoading());
    try {
      const response = await groupService.getAllGroups(query);
      setGroups(response.data?.items);
      setTotal(response.data?.totalItems);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  }

  useEffect(() => {
    getAllGroups({});
  }, []);

  const updateGroupList = () => {
    const query: ICommonListQuery = {
      page: page + 1,
      limit: rowsPerPage,
    };
    getAllGroups(query);
  };

  return {
    groups,
    total,
    isOpenCreateForm,
    isOpenUpdateForm,

    setTotal,
    setGroups,
    setIsOpenCreateForm,
    setIsOpenUpdateForm,
    updateGroupList,
  };
};
