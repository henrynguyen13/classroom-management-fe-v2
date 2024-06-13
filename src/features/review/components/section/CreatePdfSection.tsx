import {
  ButtonFile,
  ButtonFilePdf,
  CustomButton,
  InputText,
} from "@/components";
import { useFunctionPdfSection } from "../../hook/CreatePdfSection.hook";
import { ISectionProps } from "../../interface";

export const CreatePdfSection = (props: ISectionProps) => {
  const { handleClose, handleCreate, form, handleFileSelect, selectedFile } =
    useFunctionPdfSection(props);

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

      <ButtonFilePdf
        title="Tải file lên"
        onSelectedFile={handleFileSelect}
        selectedFile={selectedFile}
      />
    </div>
  );
};
