import React, { useState } from "react";
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
  onSelectedFile: (file: File | null) => void;
}

export const ButtonFilePdf = ({
  title,
  color = "white",
  backgroundColor = "#1D8FE4",
  borderRadius = "8",
  size = "medium",
  selectedFile,
  onSelectedFile,
}: Props) => {
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      onSelectedFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setFileDataUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
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
          accept="application/pdf"
          id="contained-button-file"
          onChange={handleFileChange}
        />
      </Button>
      {selectedFile && <label className="ml-4">{selectedFile.name}</label>}
      {fileDataUrl && (
        <div className="pdf-preview mt-5">
          <iframe
            src={fileDataUrl}
            width="70%"
            height="800px"
            title="PDF Preview"
          ></iframe>
        </div>
      )}
    </div>
  );
};
