import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { getItemFromId } from "../../utilFunctions/getItemFromId";
import modSign from "../../utilFunctions/modSign";
import moveIcon from "../../assets/Game-Icons-net/move.svg";
import fightIcon from "../../assets/Game-Icons-net/axe-sword.svg";
import shootIcon from "../../assets/Game-Icons-net/high-shot.svg";
import armorIcon from "../../assets/Game-Icons-net/abdominal-armor.svg";
import willIcon from "../../assets/Game-Icons-net/brain.svg";
import healthIcon from "../../assets/Game-Icons-net/health-normal.svg";

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
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
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
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                Class
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "green" }}>
                <img src={moveIcon} className="stat-icon" alt="Move" />
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                <img src={fightIcon} className="stat-icon" alt="Fight" />
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                <img src={shootIcon} className="stat-icon" alt="Shoot" />
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                <img src={armorIcon} className="stat-icon" alt="Armor" />
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                <img src={willIcon} className="stat-icon" alt="Will" />
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                <img src={healthIcon} className="stat-icon" alt="Health" />
              </TableCell>
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
                  {modSign(object.fight)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {modSign(object.shoot)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.armor}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {modSign(object.will)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.health}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.cost} gc
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {object.permItemSlots
                    .map((id) => {
                      const item = getItemFromId(id, referenceData);
                      return item?.name;
                    })
                    .filter(Boolean)
                    .join(", ")}
                </TableCell>
                <TableCell>{object.type}</TableCell>
                <TableCell>
                  {object.notes ? (
                    <Tooltip title={object.notes || ""}>📝</Tooltip>
                  ) : (
                    "--"
                  )}
                </TableCell>{" "}
                <TableCell>{object.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
