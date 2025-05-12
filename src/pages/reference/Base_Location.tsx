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

type Location = {
  name: string;
  effects: string;
  source: string;
};

export default function BaseLocations() {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const objectArray: Location[] = referenceData.base_location_data;

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
              <TableCell>Effect</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map((object: Location) => (
              <TableRow key={object.name}>
                <TableCell>{object.name}</TableCell>
                <TableCell>{object.effects}</TableCell>
                <TableCell>{object.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
