import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import BasicSpellCard from "../spells/BasicSpellCard";
import { Box, Button, Typography, Paper } from "@mui/material";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import type { SpellType } from "../../types/ReferenceTypes";
import { getSpellFromId } from "../../utilFunctions/getSpellFromId";

export default function Spellbook({ currentWizard }) {
  const { referenceData, loading, error } = useReferenceData();
  const [displaySpell, setDisplaySpell] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currentWizard) {
    return <div>Please Select a Wizard.</div>;
  }

  const schoolName = getSchoolFromId(
    currentWizard.wizard_class_id,
    referenceData
  ).name;

  const primarySpells = currentWizard.primarySpellIds.map((spellId) =>
    getSpellFromId(spellId)
  );

  const alignedSpells = currentWizard.alignedSpellIds.map((spellId) =>
    getSpellFromId(spellId)
  );

  const neutralSpells = currentWizard.neutralSpellIds.map((spellId) =>
    getSpellFromId(spellId)
  );

  const opposedSpells = currentWizard.opposedSpellIds.map((spellId) =>
    getSpellFromId(spellId)
  );

  const primarySchool = getSchoolFromId(
    currentWizard.wizard_class_id,
    referenceData
  );

  let spellMod = 0;
  let varCast = "unknown";

  if (displaySpell) {
    if (primarySchool?.aligned.includes(displaySpell.school_id)) {
      spellMod = 2;
    } else if (primarySchool?.neutral.includes(displaySpell.school_id)) {
      spellMod = 4;
    } else if (primarySchool?.opposed.includes(displaySpell.school_id)) {
      spellMod = 6;
    }
    varCast = displaySpell.base_cast + spellMod;
  }

  return (
    <Box sx={{ margin: "1rem", padding: "1rem" }}>
      {displaySpell && (
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <BasicSpellCard
            spellObj={displaySpell}
            castnum={varCast}
            spellSchoolMod={spellMod}
          />
        </Box>
      )}
      <Typography variant="h5">{schoolName} Spells</Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        {primarySpells.map((spell: SpellType) => (
          <Button
            onClick={() => setDisplaySpell(spell)}
            variant="contained"
            key={spell._id}
          >
            {spell.name}
          </Button>
        ))}
      </Box>
      <Typography variant="h5">Aligned Spells</Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        {alignedSpells.map((spell: SpellType) => (
          <Button
            onClick={() => setDisplaySpell(spell)}
            variant="contained"
            key={spell._id}
          >
            {spell.name}
          </Button>
        ))}
      </Box>
      <Typography variant="h5">Neutral Spells</Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        {neutralSpells.map((spell: SpellType) => (
          <Button
            onClick={() => setDisplaySpell(spell)}
            variant="contained"
            key={spell._id}
          >
            {spell.name}
          </Button>
        ))}
      </Box>
      {opposedSpells.length > 0 && (
        <>
          <Typography variant="h5">Opposed Spells</Typography>
          <Box
            sx={{ justifyContent: "center", display: "flex", margin: "1rem" }}
          >
            {opposedSpells.map((spell: SpellType) => (
              <Button
                onClick={() => setDisplaySpell(spell)}
                variant="contained"
                key={spell._id}
              >
                {spell.name}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
