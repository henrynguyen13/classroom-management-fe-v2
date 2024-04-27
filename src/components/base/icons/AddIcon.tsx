interface Props {
  width?: string;
  height?: string;
  color?: string;
}
export const AddIcon = ({
  width = "24",
  height = "24",
  color = "#222222",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} />
      <path d="M12 15L12 9" stroke={color} stroke-linecap="square" />
      <path d="M15 12L9 12" stroke={color} stroke-linecap="square" />
    </svg>
  );
};
