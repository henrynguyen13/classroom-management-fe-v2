import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IItem } from "@/common/interfaces";

interface Props {
  name: string;
  items: IItem[];
  maxWidth?: number;
}
export default function SingleSelect({ items, name, maxWidth = 500 }: Props) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <Box sx={{ minWidth: 120, maxWidth: maxWidth }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={name}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
          }}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
