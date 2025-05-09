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

type Armor = {
  name: string;
  armorMod: number;
  moveMod: number;
  notes: string;
  source: string;
};

export default function Armor() {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const objectArray: Armor[] = referenceData.armor_data;

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
              <TableCell>Type</TableCell>
              <TableCell>Armor Mod</TableCell>
              <TableCell>Movement Mod</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map((object: Armor) => (
              <TableRow key={object.name}>
                <TableCell>{object.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.armorMod}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.moveMod}
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
