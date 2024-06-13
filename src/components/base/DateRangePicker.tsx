import { DatePicker, Space } from "antd";
import { styled, css } from "styled-components";

const { RangePicker } = DatePicker;

interface Props {
  onChange?: (e: any) => void;
  defaultValue?: any;
  width?: string;
}
export const DateRangePicker = ({ onChange, defaultValue, width }: Props) => (
  <Wrapper $width={width}>
    <Space direction="vertical" size={12}>
      <RangePicker
        placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
        className="range-picker"
        onChange={onChange}
        defaultValue={defaultValue}
        format="DD/MM/YYYY"
      />
    </Space>
  </Wrapper>
);

const Wrapper = styled.div<{ $width?: string }>`
  ${({ $width }) =>
    css`
      .ant-picker {
        height: 48px;
        width: ${$width ? $width : "578px"};
      }
    `}
  .ant-picker-outlined {
    border-color: #aeaeae;
  }
  .ant-picker-outlined:focus-within {
    border-color: #1d8fe4;
    border-width: 2px;
  }

  .ant-picker-input {
    input {
      font-size: 16px;
      color: #666666;
    }
  }
`;
