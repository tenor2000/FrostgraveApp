import {
  TextField,
  Button,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";

type Wizard = {
  user_id: string;
  name: string;
  wizard_class_id: number;
  primarySpellIds: number[];
  alignedSpellIds: number[];
  neutralSpellIds: number[];
  backstory: string;
};

type MagicSchool = {
  school_id: number;
  name: string;
  aligned: number[];
  neutral: number[];
  opposed: number[];
};

type SpellType = {
  spell_id: number;
  name: string;
  school_id: number;
};

export default function NewWizardForm() {
  const [formData, dispatch] = useReducer(WizardFormReducer, {
    user_id: "",
    name: "",
    wizard_class_id: 0,
    primarySpellIds: [0, 0, 0],
    alignedSpellIds: [0, 0, 0],
    neutralSpellIds: [0, 0, 0, 0, 0],
    backstory: "",
  });

  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const selectedSchoolName: string =
    getSchoolFromId(formData.wizard_class_id, referenceData)?.name || "Primary";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("update")) {
      dispatch({
        type: name.split("-")[0],
        payload: { index: name.split("-")[1], value: Number(value) },
      });
    }
    dispatch({ type: name, payload: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, margin: "auto" }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ flex: 1 }}
        />
        <FormControl required sx={{ flex: 1 }}>
          <InputLabel id="class-label">Class</InputLabel>
          <Select
            labelId="class-label"
            name="wizard_class_id"
            value={formData.wizard_class_id}
            onChange={handleChange}
            label="Class"
            displayEmpty
          >
            <MenuItem value="0" disabled>
              Select a Class
            </MenuItem>
            {referenceData.magic_school_data.map((schoolData: MagicSchool) => (
              <MenuItem key={schoolData.school_id} value={schoolData.school_id}>
                {schoolData.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography>Primary Spells</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, margin: "auto" }}
      >
        {[0, 1, 2].map((index) => (
          <FormControl key={index} required>
            <InputLabel id="spell-label">{`${selectedSchoolName} Spell ${
              index + 1
            }`}</InputLabel>
            <Select
              labelId="spell-label"
              name={`updatePrimarySpellIds-${index}`}
              value={formData.primarySpellIds[index]}
              onChange={handleChange}
              sx={{ minWidth: 200 }}
              label={`${selectedSchoolName} Spell ${index + 1}`}
              displayEmpty
            >
              <MenuItem value="0" disabled selected>
                --
              </MenuItem>
              {formData.wizard_class_id &&
                referenceData.spell_data
                  .filter(
                    (spell: SpellType) =>
                      spell.school_id === formData.wizard_class_id
                  )
                  .map((spell: SpellType) => (
                    <MenuItem
                      key={spell.spell_id}
                      value={spell.spell_id}
                      disabled={
                        formData.primarySpellIds.includes(spell.spell_id) &&
                        formData.primarySpellIds[index] !== spell.spell_id
                      }
                    >
                      {spell.name}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        ))}
      </Box>
      <Box>
        <Typography>Aligned Spells</Typography>
        <Select
          name="wizard_class_id"
          value={formData.wizard_class_id}
          onChange={handleChange}
          required
        >
          <MenuItem value="0" disabled selected>
            --
          </MenuItem>
          {referenceData.magic_school_data.map((schoolData: MagicSchool) => (
            <MenuItem key={schoolData.school_id} value={schoolData.school_id}>
              {schoolData.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography>Neutral Spells</Typography>
        <Select
          name="wizard_class_id"
          value={formData.wizard_class_id}
          onChange={handleChange}
          required
        >
          <MenuItem value="0" disabled selected>
            --
          </MenuItem>
          {referenceData.magic_school_data.map((schoolData: MagicSchool) => (
            <MenuItem key={schoolData.school_id} value={schoolData.school_id}>
              {schoolData.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TextField
        label="Backstory"
        name="backstory"
        value={formData.backstory}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

function WizardFormReducer(state: Wizard, action: any) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "wizard_class_id":
      return { ...state, wizard_class_id: action.payload };
    case "updatePrimarySpellIds": {
      const updated = [...state.primarySpellIds];
      updated[action.payload.index] = action.payload.value;
      return { ...state, primarySpellIds: updated };
    }
    case "updateAlignedSpellIds": {
      const updated = [...state.alignedSpellIds];
      updated[action.payload.index] = action.payload.value;
      return { ...state, alignedSpellIds: updated };
    }
    case "updateNeutralSpellIds": {
      const updated = [...state.neutralSpellIds];
      updated[action.payload.index] = action.payload.value;
      return { ...state, neutralSpellIds: updated };
    }
    case "backstory":
      return { ...state, backstory: action.payload };
    default:
      return state;
  }
}

function WizardFormChoiceReducer(state: Wizard, action: any) {
  switch (action.type) {
    case "primarySpellIds":
      return { ...state, primarySpellIds: action.payload };
    case "alignedSpellIds":
      return { ...state, alignedSpellIds: action.payload };
    case "neutralSpellIds":
      return { ...state, neutralSpellIds: action.payload };
    default:
      return state;
  }
}
