import { CustomDropdown, InputText } from "@/components";
import { useFunctionReview } from "../hook";
import { SectionType } from "@/common";
import { Section_Type } from "../interface";
import { CreatePdfSection, CreateTextSection } from "../components";
import { useNavigate, useParams } from "react-router-dom";

export const CreateSectionPage = () => {
  const { setSelectedType, selectedType, handleChangeType, update } =
    useFunctionReview();

  const { id, reviewId } = useParams();

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/classes/${id}`);
  };
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
        label="Loại tài liệu"
      />

      {selectedType === Section_Type.PDF && (
        <CreatePdfSection
          handleClose={handleClose}
          type={selectedType}
          reviewId={reviewId}
          update={update}
        />
      )}

      {selectedType === Section_Type.TEXT && (
        <CreateTextSection
          handleClose={handleClose}
          type={selectedType}
          reviewId={reviewId}
          update={update}
        />
      )}
    </div>
  );
};
