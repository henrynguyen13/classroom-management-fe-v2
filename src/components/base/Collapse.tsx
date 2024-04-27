import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardDetail } from ".";
import { ICard } from "@/common";

interface Props {
  title: string;
  list: ICard[];
}
export default function Collapse({ title, list }: Props) {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardDetail list={list} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
