import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";
import { Group } from "@/assets";
import { AppStatus } from "@/components";
interface IProps {
  name?: string;
  avatar?: string;
  status?: string;
  backgroundColor?: string;
  dotColor?: string;
  totalMembers?: number;
}

export const GroupBox = ({
  name,
  avatar,
  status,
  totalMembers,
  backgroundColor,
  dotColor,
}: IProps) => {
  return (
    <div className="grid grid-cols-12 gap-5 max-w-[400px] p-[12px]  rounded-md shadow-forumBox hover:opacity-90 cursor-pointer">
      <div className="col-span-4">
        <img src={avatar} alt={avatar} />
      </div>
      <div className="col-span-8">
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-semibold h-12">{name}</h2>
          <Icon path={mdiDotsHorizontal} size={1} />
        </div>
        <div className="flex">
          <img src={Group} alt="Group" />
          <div className="ml-2">{totalMembers} thành viên</div>
        </div>
        <div className="mt-3">
          <span className="mr-2">Trạng thái: </span>
          <AppStatus
            label={status}
            backgroundColor={backgroundColor}
            dotColor={dotColor}
          />
        </div>
      </div>
    </div>
  );
};
