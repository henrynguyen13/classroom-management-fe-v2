import { CustomButton, InputText, Tiptap } from "@/components";
import { ISectionProps } from "../../interface";
import { useFunctionTextSection } from "../../hook";

export const CreateTextSection = (props: ISectionProps) => {
  const {
    handleClose,
    handleCreate,
    form,
    handleTiptapSectionChange,
    tiptapSectionContent,
  } = useFunctionTextSection(props);

  const { control } = form;

  return (
    <div>
      <div className="absolute top-24 right-10">
        <CustomButton
          text="Hủy"
          backgroundColor="grey"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleClose?.()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>
      <InputText
        control={control}
        name="name"
        label="Tên tài liệu"
        placeholder="Nhập tên tài liệu"
      />

      <Tiptap
        control={control}
        name="text"
        label="Nội dung"
        placeholder="Nhập nội dung"
        onChange={handleTiptapSectionChange}
        value={tiptapSectionContent}
      />
    </div>
  );
};
