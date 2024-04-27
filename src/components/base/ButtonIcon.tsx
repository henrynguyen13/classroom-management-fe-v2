import IconButton from "@mui/material/IconButton";

interface Props {
  icon: any;
}
export default function ButtonIcon({ icon }: Props) {
  return <IconButton size="large">{icon}</IconButton>;
}
