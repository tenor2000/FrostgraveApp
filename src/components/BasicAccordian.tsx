import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BasicAccordian({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <Accordion sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", color: "white" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls={`${title}-info`}
      >
        <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
