import { Backdrop, Box, Fade, Modal } from "@mui/material";
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  minWidth?: string;
  height?: string;
}
export const Form = (props: Props) => {
  const {
    isOpenForm,
    handleClose,
    title,
    children,
    minWidth = "",
    width = "500px",
    height = "auto",
  } = props;
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    width: width,
    height: height + " !important",
    minWidth: minWidth,

    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#aaaaaa",
      borderRadius: 2,
    },
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenForm}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpenForm}>
        <Box sx={style}>
          <div className="flex justify-between items-center mb-10">
            <div className="text-xl">{title}</div>
            <div onClick={handleClose}>
              <Icon
                className="hover:text-error cursor-pointer"
                path={mdiCloseCircle}
                size={1.5}
              />
            </div>
          </div>
          <div>{children}</div>
        </Box>
      </Fade>
    </Modal>
  );
};
