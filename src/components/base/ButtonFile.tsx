import * as React from "react";
import { styled, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  title: string;
  color?: string;
  borderRadius?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  selectedFile: File | null;
  previewTable?: string[];
  onSelectedFile: (file: File | null) => void;
}

export const ButtonFile = ({
  title,
  color = "white",
  backgroundColor = "#1D8FE4",
  borderRadius = "8",
  size = "medium",
  selectedFile,
  onSelectedFile,
}: Props) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      onSelectedFile(selectedFile);
      console.log("----e", event.target.files);
    }
  };

  return (
    <div>
      <Button
        sx={{
          color: color,
          backgroundColor: backgroundColor + " !important",
          textTransform: "none",
          borderRadius: borderRadius + "px",
        }}
        size={size}
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() =>
          document.getElementById("contained-button-file")?.click()
        }
      >
        {title}
        <VisuallyHiddenInput
          type="file"
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="contained-button-file"
          multiple
          onChange={handleFileChange}
        />
      </Button>

      {/* {previewTable && previewTable!.length === 0 && (
        <label className="ml-4" htmlFor="contained-button-file">
          {selectedFile?.name}
        </label>
      )} */}
      <label className="ml-4" htmlFor="contained-button-file">
        {selectedFile?.name}
      </label>
    </div>
  );
};
