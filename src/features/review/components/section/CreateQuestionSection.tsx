import { CardQuestion, CustomButton, InputText } from "@/components";
import { ISectionProps } from "../../interface";
import { useCreateQuestionSection } from "../../hook";
import { BankModal } from "@/features";

export const CreateQuestionSection = (props: ISectionProps) => {
  const {
    form,
    isOpenBankModal,
    questionsDto,
    handleDelete,
    setIsOpenBankModal,
    handleAddQuestionsDto,
    handleCreate,
    handleClose,
  } = useCreateQuestionSection(props);

  const { control } = form;
  return (
    <>
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
      {/* 
      <div className="mb-[10px]">
        <span className="text-base font-medium">Thời gian diễn ra</span>
        <span className="text-red">*</span>
      </div>

      <Controller
        control={control}
        name="duration"
        // defaultValue={dayjs(Date.now()).toDate()}
        render={({ field }) => {
          const { onChange: fieldOnChange } = field;
          return (
            <DateRangePicker
              width="calc(100vw - 240px - 100px)"
              // defaultValue={[dayjs(Date.now()).toDate(), _]}
              onChange={(e) => {
                fieldOnChange(e);
                console.log("e", e);
              }}
            />
          );
        }}
      /> */}
      <div className="mb-5"></div>
      <CustomButton
        text="Chọn câu hỏi từ ngân hàng"
        size="large"
        width="300"
        onClick={() => setIsOpenBankModal(true)}
      />

      {isOpenBankModal && (
        <BankModal
          isOpenForm={isOpenBankModal}
          handleClose={() => setIsOpenBankModal(false)}
          onAddQuestions={handleAddQuestionsDto}
        />
      )}

      {questionsDto.map((question, index) => (
        <div key={index}>
          <CardQuestion
            id={question._id}
            index={index + 1}
            text={question.text}
            answers={question.answers}
            answerTF={question?.answerTF}
            answerShort={question?.answerShort}
            type={question.type}
            level={question.level}
            // handleAdd={() => onAddQuestions(question)}
            handleDelete={() => handleDelete(question._id)}
            //   handleUpdate={() =>
            //     setIsOpenUpdateQuestionForm({
            //       id: question._id,
            //       state: true,
            //     })
            //   }
          />
        </div>
      ))}
    </>
  );
};
