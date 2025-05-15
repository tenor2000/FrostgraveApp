import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";

export default function BasicSpellCard({
  spellObj,
  titlebar = true,
  castnum = false,
  spellSchoolMod = false,
}) {
  const isPortrait = useMediaQuery(
    "(max-width: 768px) and (orientation: portrait)"
  );
  const { referenceData } = useReferenceData();
  const schoolName = getSchoolFromId(spellObj.school_id, referenceData).name;

  if (isPortrait) {
    return (
      <Paper
        sx={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            {titlebar && (
              <TableRow>
                <TableCell
                  colSpan={castnum ? 4 : 3}
                  sx={{ textAlign: "center" }}
                >
                  <h2>{spellObj.name}</h2>
                </TableCell>
              </TableRow>
            )}
            {!titlebar && (
              <TableRow>
                <TableCell
                  colSpan={castnum ? 4 : 3}
                  sx={{ textAlign: "center" }}
                >
                  <h3>School: {schoolName}</h3>
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody sx={{ "& td": { textAlign: "center", flex: 1 } }}>
            <TableRow>
              {titlebar && (
                <TableCell sx={{ width: "50%" }}>{schoolName}</TableCell>
              )}
              {!castnum && (
                <TableCell sx={{ width: "50%" }}>
                  Base Cast: {spellObj.base_cast}{" "}
                  {spellSchoolMod ? `(+${spellSchoolMod})` : ""}
                </TableCell>
              )}
              <TableCell sx={{ width: "50%" }}>{spellObj.category}</TableCell>
            </TableRow>
            {castnum && (
              <TableRow>
                <TableCell sx={{ width: "50%" }}>
                  Cast Number: {castnum}
                </TableCell>
                <TableCell sx={{ width: "50%" }}>
                  Base Cast: {spellObj.base_cast}{" "}
                  {spellSchoolMod ? `(+${spellSchoolMod})` : ""}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={castnum ? 2 : 3}>
                {spellObj.description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Table size="small">
        <TableHead>
          {titlebar && (
            <TableRow>
              <TableCell sx={{ textAlign: "center", width: "25%" }}>
                <h2>{spellObj.name ? spellObj.name : "--"}</h2>
              </TableCell>
              <TableCell sx={{ textAlign: "center", width: "75%" }}>
                Description
              </TableCell>
            </TableRow>
          )}
          {!titlebar && (
            <TableRow>
              <TableCell sx={{ textAlign: "center", width: "25%" }}></TableCell>
              <TableCell sx={{ textAlign: "center", width: "75%" }}>
                Description
              </TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody sx={{ "& td": { textAlign: "left" } }}>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>School: {schoolName}</TableCell>
            <TableCell rowSpan={4} sx={{ width: "75%" }}>
              {spellObj.description}
            </TableCell>
          </TableRow>
          {castnum && (
            <TableRow>
              <TableCell>Cast Number: {castnum}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>
              Base Cast: {spellObj.base_cast}{" "}
              {spellSchoolMod ? `(+${spellSchoolMod})` : ""}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category: {spellObj.category}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
