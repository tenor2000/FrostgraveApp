import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useReferenceData } from "../../context/ReferenceDataContext";

type Creature = {
  class: string;
  type: number;
  move: number;
  fight: number;
  shoot: number;
  armor: number;
  will: number;
  health: number;
  notes: string;
  source: string;
};

export default function Creature() {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const objectArray: Creature[] = referenceData.creature_data;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          sx={{
            "& thead th": {
              textAlign: "left",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Move</TableCell>
              <TableCell>Fight</TableCell>
              <TableCell>Shoot</TableCell>
              <TableCell>Armor</TableCell>
              <TableCell>Will</TableCell>
              <TableCell>Health</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map((object: Creature) => (
              <TableRow key={object.class}>
                <TableCell>{object.class}</TableCell>
                <TableCell>{object.type}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.move}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.fight}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.shoot}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.armor}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.will}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.health}
                </TableCell>
                <TableCell>{object.notes}</TableCell>
                <TableCell>{object.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
