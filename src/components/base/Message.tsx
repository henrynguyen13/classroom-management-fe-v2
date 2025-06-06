import { Message } from "@/common";
import { IUser } from "@/features";

const determineMessageStyle = (user: IUser, messageUserId: string) => {
  if (user && messageUserId === user._id) {
    return "bg-violet-900 p-4 ml-24 mb-4 rounded";
  } else {
    return "bg-slate-700 p-4 mr-24 mb-4 rounded";
  }
};

export const Messages = ({
  user,
  messages,
}: {
  user: IUser;
  messages: Message[];
}) => {
  return (
    <div className="w-ful flex h-4/6 flex-col-reverse overflow-y-scroll">
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            className={determineMessageStyle(user, message.user.userId)}
          >
            <span className="text-sm text-gray-400">
              {message.user.userName}
            </span>
            <span className="text-sm text-gray-400">{" " + "•" + " "}</span>
            <span className="text-sm text-gray-400">{message.timeSent}</span>
            <p className="text-white">{message.message}</p>
          </div>
        );
      })}
    </div>
  );
};
