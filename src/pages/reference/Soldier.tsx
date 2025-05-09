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

type Soldier = {
  class: string;
  type: string;
  move: number;
  fight: number;
  shoot: number;
  armor: number;
  will: number;
  health: number;
  cost: number;
  permItemSlots: number[];
  notes: string | null;
  source: string;
};

export default function Soldier() {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const objectArray: Soldier[] = referenceData.soldier_data;

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
              <TableCell>Class</TableCell>
              <TableCell>Move</TableCell>
              <TableCell>Fight</TableCell>
              <TableCell>Shoot</TableCell>
              <TableCell>Armor</TableCell>
              <TableCell>Will</TableCell>
              <TableCell>Health</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map((object: Soldier) => (
              <TableRow key={object.class}>
                <TableCell>{object.class}</TableCell>
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
                <TableCell sx={{ textAlign: "center" }}>
                  {object.cost} gc
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.permItemSlots}
                </TableCell>
                <TableCell>{object.type}</TableCell>
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
