import { Card, Chip } from "@mui/material";
import { ICard, ROLES, AuthStorageService } from "@/common";

interface Props {
  list: ICard[];
}

export const CardDetail = ({ list }: Props) => {
  const role = AuthStorageService.getLoginUser().role;
  return (
    <Card>
      <div className="w-full  rounded-lg  px-8 pb-8">
        {/* <div className="text-xl pb-8">{title}</div>
        <div className="border-[1px] border-border"></div> */}
        <div className="grid grid-cols-2">
          {list
            .filter((item) => item?.role.includes(role as ROLES))
            .map((item, index) => (
              <div key={index} className="mt-6">
                <div className="flex items-center mb-2 text-neutral-2 font-medium">
                  <div className="mr-2">
                    <img src={item.icon} alt={item.icon} />
                  </div>
                  {item.title}
                </div>
                {item.title === "Số buổi vắng" && (
                  <Chip
                    label={item.content}
                    variant="outlined"
                    sx={{
                      background: "#ed3a3a",
                      color: "#ffffff",

                      "&. MuiChip-label": {
                        fontSize: "14px",
                      },
                    }}
                  />
                )}
                {item?.content && (
                  <div className="text-neutral-1">{item.content}</div>
                )}
                {item?.time && (
                  <div className="text-neutral-1">
                    {item.time.map((i, index) => (
                      <li key={index}>
                        Từ {i.from} đến {i.to} {i.date}
                      </li>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};
