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
const MAX_DISPLAY_CHIPS = 2;
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
  const [displayChips, setDisplayChips] =
    React.useState<number>(MAX_DISPLAY_CHIPS);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    handleSelect(value);
  };

  React.useEffect(() => {
    if (personName.length > MAX_DISPLAY_CHIPS) {
      setDisplayChips(MAX_DISPLAY_CHIPS);
    } else {
      setDisplayChips(personName.length);
    }
  }, [personName]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 330 }}>
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
              {selected.slice(0, displayChips).map((value) => (
                <Chip key={value} label={getValue(value)} />
              ))}
              {selected.length > displayChips && (
                <Chip label={`+${selected.length - displayChips}`} />
              )}
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{ height: "52px", borderRadius: "8px" }}
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
