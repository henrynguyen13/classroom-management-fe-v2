import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { Controller } from "@/plugins";
interface Props {
  width?: string;
  control: any;
  name: string;
  value?: Date;
}
export const CustomDatePicker = ({
  width = "100%",
  control,
  name,
  value,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value || dayjs(Date.now()).toDate()}
      render={({ field }) => {
        const { value: fieldValue, onChange: fieldOnChange } = field;

        return (
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  hoverBorderColor: "#656565",
                },
              },
            }}
          >
            <DatePicker
              value={dayjs(fieldValue)}
              showTime
              format={"HH:mm:ss - dddd - DD/MM/YYYY"}
              onChange={fieldOnChange}
              style={{ height: 48, width: width }}
            />
          </ConfigProvider>
        );
      }}
    />
  );
};
