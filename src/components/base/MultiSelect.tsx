import * as React from "react";

import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Chip,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  label: string;
  name: string[];
  getValue: (e: any) => any;
  handleSelect: (e: any) => Promise<void>;
}

export default function MultiSelect({
  label,
  name,
  getValue,
  handleSelect,
}: Props) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    handleSelect(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={label}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id={label} label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getValue(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {name.map((i) => (
            <MenuItem key={i} value={i}>
              {getValue(i)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
