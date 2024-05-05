import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiPlus, mdiPencil, mdiCheck } from "@mdi/js";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import {
  convertStatusSubmit,
  formatDate,
  isStudent,
  isTeacher,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  MAX_FILE_SIZE,
} from "@/common";
import { CustomButton, CardQuestion, ButtonFile, Loading } from "@/components";
import {
  CreateQuestion,
  UpdateQuestion,
  IQuestion,
  ListResponsesPage,
  IResponseList,
  MyListResponsesPage,
} from "@/features";
import { UpdateAssignment, assignmentService } from "../index";

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [response, setResponse] = useState<IResponseList>();
  const [list, setList] = useState<IResponseList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getAssignmentDetail = async () => {
      const response = await assignmentService.getAssignmentById(
        id as string,
        assignmentId as string
      );
      setName(response?.name || "");
      setDescription(response?.description || "");
      setExpiredAt(response?.expiredAt || new Date());
    };

    const getAllAQuestions = async () => {
      const response = await assignmentService.getAllAQuestions(
        id as string,
        assignmentId as string
      );

      setQuestions(response.data?.items || []);
      setTotalQuestions(response.data?.totalItems || 0);
    };
    getAssignmentDetail();
    getAllAQuestions();
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

  const handleQuestionCreateSuccess = (newQuestion: IQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setTotalQuestions((prevTotal) => prevTotal + 1);
  };
  const handleQuestionUpdateSuccess = (updatedQuestion: IQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === updatedQuestion._id ? updatedQuestion : question
      )
    );
  };

  const handleDelete = async (questionId: string) => {
    const response = await assignmentService.deleteAQuestion(
      id as string,
      assignmentId as string,
      questionId
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
                        <div>{description}</div>
                      </div>
                      <div className="col-span-2">
                        <CustomButton
                          startIcon={<Icon path={mdiPlus} size={1} />}
                          text="Tạo câu hỏi"
                          size="large"
                          width="190"
                          borderRadius="20"
                          onClick={() => setIsOpenCreateQuestionForm(true)}
                        />
                        <div className="mt-3">
                          <CustomButton
                            text="Chỉnh sửa"
                            size="large"
                            width="190"
                            borderRadius="20"
                            startIcon={<Icon path={mdiPencil} size={1} />}
                            onClick={() => setIsUpdateAssignment(true)}
                          />
                        </div>
                      </div>
                    </div>

                    {questions.length > 0 && isTeacherRole ? (
                      <>
                        <div className="mt-5 mb-3 text-base font-medium">
                          Câu hỏi ({totalQuestions})
                        </div>

                        {questions.map((question, index) => (
                          <>
                            <div key={index}>
                              <CardQuestion
                                id={question._id}
                                index={index + 1}
                                text={question.text}
                                answers={question.answers}
                                type={question.type}
                                handleDelete={() => handleDelete(question._id)}
                                handleUpdate={() =>
                                  setIsOpenUpdateQuestionForm({
                                    id: question._id,
                                    state: true,
                                  })
                                }
                              />
                            </div>

                            {isOpenUpdateQuestionForm.state &&
                              isOpenUpdateQuestionForm.id === question._id && (
                                <UpdateQuestion
                                  isOpenForm={isOpenUpdateQuestionForm}
                                  handleClose={() =>
                                    setIsOpenUpdateQuestionForm({
                                      id: question._id,
                                      state: false,
                                    })
                                  }
                                  classId={id as string}
                                  assignmentId={assignmentId as string}
                                  questionId={question._id as string}
                                  handleUpdateSuccess={
                                    handleQuestionUpdateSuccess
                                  }
                                />
                              )}
                          </>
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
                      <div className="mb-5">{description}</div>
                    </div>

                    <div className="col-span-1">
                      {questions.length === 0 ? (
                        <CustomButton
                          text="Nộp bài"
                          width="150"
                          borderRadius="20"
                          onClick={() => onSubmit()}
                        />
                      ) : null}
                    </div>
                  </div>

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

      {isOpenCreateQuestionForm && (
        <CreateQuestion
          isOpenForm={isOpenCreateQuestionForm}
          handleClose={() => setIsOpenCreateQuestionForm(false)}
          classId={id as string}
          assignmentId={assignmentId as string}
          handleQuestionCreateSuccess={handleQuestionCreateSuccess}
        />
      )}

      {isLoading ? <Loading isLoading={isLoading} /> : null}
    </div>
  );
};
