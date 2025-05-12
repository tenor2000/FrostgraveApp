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
import modSign from "../../utilFunctions/modSign";

type Weapon = {
  name: string;
  damageMod: number;
  maxRange: number;
  notes: string;
  source: string;
};

export default function Weapon() {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const objectArray: Weapon[] = referenceData.weapon_data;

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
              <TableCell>Damage Mod</TableCell>
              <TableCell>Max Range</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map((object: Weapon) => (
              <TableRow key={object.name}>
                <TableCell>{object.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {modSign(object.damageMod)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.maxRange}
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
