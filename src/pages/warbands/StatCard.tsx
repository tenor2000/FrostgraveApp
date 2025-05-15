import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import modSign from "../../utilFunctions/modSign";
import { getItemFromId } from "../../utilFunctions/getItemFromId";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import { useReferenceData } from "../../context/ReferenceDataContext";

export default function StatCard({ wizard }) {
  const { statMods, itemSlots } = wizard;

  const { referenceData } = useReferenceData();

  const getStat = (base, mod) => base + (mod ?? 0);
  const className = getSchoolFromId(wizard.wizard_class_id, referenceData).name;

  const stats = [
    { label: "Move", value: getStat(wizard.move, statMods.move) },
    { label: "Fight", value: modSign(getStat(wizard.fight, statMods.fight)) },
    { label: "Shoot", value: modSign(getStat(wizard.shoot, statMods.shoot)) },
    { label: "Armor", value: getStat(wizard.armor, statMods.armor) },
    { label: "Will", value: modSign(getStat(wizard.will, statMods.will)) },
    {
      label: "Health",
      value: getStat(wizard.health, statMods.health),
    },
  ];

  const items = Object.values(itemSlots)
    .filter((id) => id !== 0)
    .map((id, i) => ({
      slot: `Slot ${i + 1}`,
      name: getItemFromId(id).name,
    }));

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
      <CardHeader
        title={wizard.name}
        subheader={`Level ${wizard.level} ${className}`}
        sx={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stats
        </Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              {stats.slice(0, 3).map((stat) => (
                <TableCell key={stat.label}>
                  <Typography variant="body2">
                    <strong>{stat.label}:</strong> {stat.value}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {stats.slice(3, 6).map((stat) => (
                <TableCell key={stat.label}>
                  <Typography variant="body2">
                    <strong>{stat.label}:</strong> {stat.value}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h6" gutterBottom>
          Equipped Items
        </Typography>
        {items.length ? (
          <List dense>
            {items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.slot}: ${item.name}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No items equipped
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
