import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ICard } from "@/common";
import { CardDetail } from ".";

interface Props {
  title: string;
  list: ICard[];
}
export const Collapse = ({ title, list }: Props) => {
  return (
    <div>
      <Accordion defaultExpanded sx={{ backgroundColor: "#F5F5F5" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardDetail list={list} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
