import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiPlus, mdiPencil, mdiCheck } from "@mdi/js";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { NoData } from "@/assets";

import {
  convertStatusSubmit,
  formatDate,
  isStudent,
  isTeacher,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  MAX_FILE_SIZE,
  ASSIGNMENT,
  convertStatusAssignment,
} from "@/common";
import {
  CustomButton,
  CardQuestion,
  ButtonFile,
  Loading,
  OutputTiptap,
} from "@/components";
import {
  CreateQuestion,
  UpdateQuestion,
  IQuestion,
  ListResponsesPage,
  IResponseList,
  MyListResponsesPage,
} from "@/features";
import {
  AssignmentStatus,
  BankModal,
  UpdateAssignment,
  assignmentService,
} from "../index";
import React from "react";

export const AssignmentDetailPage = () => {
  const { id, assignmentId } = useParams();
  const navigate = useNavigate();
  const [isUpdateAssignment, setIsUpdateAssignment] = useState(false);
  const [isOpenCreateQuestionForm, setIsOpenCreateQuestionForm] =
    useState(false);
  const [isOpenUpdateQuestionForm, setIsOpenUpdateQuestionForm] = useState<{
    id: string;
    state: boolean;
  }>({ id: "", state: false });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expiredAt, setExpiredAt] = useState<Date>();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [type, setType] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpenBankModal, setIsOpenBankModal] = useState(false);

  const [response, setResponse] = useState<IResponseList>();
  const [list, setList] = useState<IResponseList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getAssignmentDetail = async () => {
      const response = await assignmentService.getAssignmentById(
        id as string,
        assignmentId as string
      );

      console.log("-------", response);
      setName(response?.name || "");
      setDescription(response?.description || "");
      setExpiredAt(response?.expiredAt || new Date());
      setQuestions(response?.questions || []);
      setTotalQuestions(response?.questions?.length);
      setType(response?.type || "");
    };
    getAssignmentDetail();
  }, [assignmentId]);

  useEffect(() => {
    const getListResponses = async () => {
      const response = await assignmentService.getAllAResponses(
        id as string,
        assignmentId as string
      );
      if (response?.success) {
        setList(response?.data.items);
      }
    };

    getListResponses();
  }, [response]);

  const onSubmit = async () => {
    if (selectedFile && selectedFile?.size > MAX_FILE_SIZE) {
      throw new Error("This file is exceeds 10MB");
    } else {
      setIsLoading(true);
      const response = await assignmentService.createAUploadAResponse(
        id as string,
        assignmentId as string,
        selectedFile as File
      );
      if (response?.success) {
        setSelectedFile(null);
        setIsLoading(false);
        setResponse(response);
        showSuccessNotificationFunction("Nộp bài thành công");
      }
    }
  };
  const onUpdateSuccess = (updatedData: any) => {
    setName(updatedData.name);
    setDescription(updatedData.description);
    setExpiredAt(updatedData.expiredAt);
  };

  // const handleQuestionCreateSuccess = (newQuestion: IQuestion) => {
  //   setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  //   setTotalQuestions((prevTotal) => prevTotal + 1);
  // };
  // const handleQuestionUpdateSuccess = (updatedQuestion: IQuestion) => {
  //   setQuestions((prevQuestions) =>
  //     prevQuestions.map((question) =>
  //       question._id === updatedQuestion._id ? updatedQuestion : question
  //     )
  //   );
  // };

  const handleDelete = async (questionId: string) => {
    const updatedQuestions = questions.filter(
      (question) => question._id !== questionId
    );

    setQuestions(updatedQuestions);

    const response = await assignmentService.update(
      id as string,
      assignmentId as string,
      { questions: updatedQuestions.map((question) => question?._id) }
    );
    if (response?.success) {
      showSuccessNotificationFunction("Xóa câu hỏi thành công");
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      setTotalQuestions((prevTotal) => prevTotal - 1);
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };
  const isTeacherRole = isTeacher();
  const isStudentRole = isStudent();
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleAddQuestionsDto = async (question: IQuestion) => {
    const updatedQuestions = [...questions, question];
    console.log("updated", updatedQuestions);

    const response = await assignmentService.update(
      id as string,
      assignmentId as string,
      { questions: updatedQuestions.map((question) => question?._id) }
    );
    if (response?.success) {
      showSuccessNotificationFunction("Thêm câu hỏi thành công");
      setQuestions(updatedQuestions);

      setTotalQuestions((prevTotal) => prevTotal + 1);
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };
  return (
    <div>
      {!isUpdateAssignment && (
        <>
          {isTeacherRole && (
            <>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Nội dung" value="1" />
                      <Tab label="Danh sách nộp bài" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-10">
                        <div className="text-2xl font-semibold">{name}</div>
                        <div className="text-base font-medium mt-2">
                          Hết hạn vào: {formatDate(expiredAt)}
                        </div>
                        <div className="mt-5 mb-3 text-base font-medium">
                          Hướng dẫn
                        </div>
                        <OutputTiptap value={description} />
                      </div>
                      <div className="col-span-2">
                        {/* <CustomButton
                          startIcon={<Icon path={mdiPlus} size={1} />}
                          text="Tạo câu hỏi"
                          size="large"
                          width="190"
                          borderRadius="20"
                          onClick={() => setIsOpenCreateQuestionForm(true)}
                        /> */}
                        <div className="mt-3">
                          {type === ASSIGNMENT.TEST && (
                            <div className="mb-3">
                              <CustomButton
                                width="250"
                                size="medium"
                                text="Chọn câu hỏi từ ngân hàng"
                                onClick={() => setIsOpenBankModal(true)}
                              />
                            </div>
                          )}
                          <CustomButton
                            text="Chỉnh sửa"
                            size="medium"
                            width="250"
                            // borderRadius="20"
                            startIcon={<Icon path={mdiPencil} size={1} />}
                            onClick={() => setIsUpdateAssignment(true)}
                          />
                        </div>
                      </div>
                    </div>

                    {questions.length > 0 ? (
                      <>
                        <div className="mt-5 mb-3 text-base font-medium">
                          Câu hỏi ({totalQuestions})
                        </div>

                        {questions.map((question, index) => (
                          <React.Fragment key={index}>
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
                                typeButton="delete"
                                handleDelete={() => handleDelete(question._id)}
                                handleUpdate={() =>
                                  setIsOpenUpdateQuestionForm({
                                    id: question._id,
                                    state: true,
                                  })
                                }
                              />
                            </div>
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}
                  </TabPanel>
                  <TabPanel value="2">
                    <ListResponsesPage expiredAt={expiredAt as Date} />
                  </TabPanel>
                </TabContext>
              </Box>
            </>
          )}
        </>
      )}
      <div>
        {isStudentRole && (
          <>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Nội dung" value="1" />
                    <Tab label="Kết quả" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-11">
                      {list.length > 0 ? (
                        <div className="flex italic mb-2">
                          <Icon path={mdiCheck} size={1} className="mr-1" />
                          {convertStatusSubmit(
                            list[0].createdAt,
                            expiredAt as Date
                          )}{" "}
                          lúc {formatDate(list[0].createdAt)}
                        </div>
                      ) : null}
                      <div className="text-2xl font-semibold">{name}</div>
                      <div className="text-base font-medium mt-2">
                        Hết hạn vào: {formatDate(expiredAt)}
                      </div>
                      <div className="mt-5 mb-3 text-base font-medium">
                        Hướng dẫn
                      </div>
                      <div className="mb-5">
                        <OutputTiptap value={description} />
                      </div>
                    </div>

                    <div className="col-span-1">
                      {questions.length === 0 &&
                      expiredAt &&
                      convertStatusAssignment(expiredAt) !==
                        AssignmentStatus.EXPIRED ? (
                        <CustomButton
                          text="Nộp bài"
                          width="150"
                          borderRadius="20"
                          onClick={() => onSubmit()}
                        />
                      ) : null}
                    </div>
                  </div>

                  {expiredAt &&
                  convertStatusAssignment(expiredAt) !==
                    AssignmentStatus.EXPIRED ? (
                    <>
                      {questions.length > 0 ? (
                        <CustomButton
                          onClick={() =>
                            navigate(
                              `/classes/${id}/assignment/${assignmentId}/test`
                            )
                          }
                          text="Bắt đầu làm bài"
                        />
                      ) : (
                        <ButtonFile
                          title="Tải file lên"
                          onSelectedFile={handleFileSelect}
                          selectedFile={selectedFile}
                        />
                      )}
                    </>
                  ) : (
                    <div className="mt-2">
                      <img
                        src={NoData}
                        className="h-60 flex my-0 mx-auto"
                        alt="No-data"
                      />
                      <div className="mt-4 font-medium text-center">
                        Bài tập đã quá hạn để nộp bài.
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="2">
                  <MyListResponsesPage expiredAt={expiredAt as Date} />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </div>

      {isUpdateAssignment && (
        <UpdateAssignment
          setIsUpdate={setIsUpdateAssignment}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}

      <BankModal
        isOpenForm={isOpenBankModal}
        handleClose={() => setIsOpenBankModal(false)}
        onAddQuestions={handleAddQuestionsDto}
      />

      {isLoading ? <Loading isLoading={isLoading} /> : null}
    </div>
  );
};
