import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";

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
  school: number[];
};

export default function NewWizardForm() {
  const [formData, dispatch] = useReducer(WizardFormReducer, {
    user_id: "",
    name: "",
    wizard_class_id: 0,
    primarySpellIds: [],
    alignedSpellIds: [],
    neutralSpellIds: [],
    backstory: "",
  });

  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  console.log(formData.wizard_class_id);
  const primarySpells = referenceData.spell_data.filter((spell: SpellType) =>
    schoolData.aligned.includes(formData.wizard_class_id)
  );
  const neutralSpells = referenceData.magic_school_data.filter(
    (schoolData: MagicSchool) =>
      schoolData.neutral.includes(formData.wizard_class_id)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
      <Box>
        <Typography>Primary Spells</Typography>
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
    case "primarySpellIds":
      return { ...state, primarySpellIds: action.payload };
    case "alignedSpellIds":
      return { ...state, alignedSpellIds: action.payload };
    case "neutralSpellIds":
      return { ...state, neutralSpellIds: action.payload };
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
