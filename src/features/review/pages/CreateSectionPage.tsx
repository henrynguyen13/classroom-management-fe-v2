import { CustomDropdown, InputText } from "@/components";
import { useFunctionReview } from "../hook";
import { SectionType } from "@/common";
import { Section_Type } from "../interface";

export const CreateSectionPage = () => {
  const { setSelectedType, selectedType, handleChangeType } =
    useFunctionReview();
  return (
    <div>
      <h3 className="text-xl mb-5">Tạo tài liệu ôn tập</h3>

      {/* <InputText
          control={control}
          name="name"
          label="Tên"
          placeholder="Nhập tên"
          width="578"
        /> */}

      <CustomDropdown
        placeholder="Chọn loại ôn tập"
        name="type"
        // onChange={(_, value: any) => {
        //   setSelectedLevelQuestion(value?.id);
        // }}
        value={{
          id: selectedType,
          label: SectionType.find((type) => type?.id === selectedType)?.label!,
        }}
        onChange={handleChangeType}
        options={SectionType}
        label="Mức độ câu hỏi"
      />

      {selectedType === Section_Type.PDF}
    </div>
  );
};
