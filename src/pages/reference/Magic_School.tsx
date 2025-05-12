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
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";

type School_of_Magic = {
  name: string;
  school_id: number;
  nicknames: string[];
  aligned: number[];
  neutral: number[];
  opposed: number[];
};

export default function SchoolComponent() {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const objectArray: School_of_Magic[] = referenceData.magic_school_data;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          sx={{
            "& thead th": {
              textAlign: "center",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: "1px solid lightgray" }}>
                School
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{ borderRight: "1px solid lightgray" }}
              >
                Aligned
              </TableCell>
              <TableCell
                colSpan={5}
                sx={{ borderRight: "1px solid lightgray" }}
              >
                Neutral
              </TableCell>
              <TableCell>Opposed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map((object: School_of_Magic) => (
              <TableRow key={object.name}>
                <TableCell>{object.name}</TableCell>
                <TableCell>
                  {getSchoolFromId(object.aligned[0], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.aligned[1], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.aligned[2], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.neutral[0], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.neutral[1], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.neutral[2], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.neutral[3], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.neutral[4], referenceData)?.name}
                </TableCell>
                <TableCell>
                  {getSchoolFromId(object.opposed[0], referenceData)?.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
