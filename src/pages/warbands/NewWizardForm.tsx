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
import getStoryPrompt from "../../utilFunctions/getStoryPrompt";
import { postNewWizard } from "../../services/postRequests";
import { useAuthData } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { WizardCreation } from "../../types/WarbandTypes";
import type { MagicSchool, SpellType } from "../../types/ReferenceTypes";

export default function NewWizardForm() {
  const { user, refreshData } = useAuthData();
  const { referenceData, loading, error } = useReferenceData();
  const [formData, dispatch] = useReducer(WizardFormReducer, {
    user_id: user?._id || "LocalStorage",
    name: "",
    wizard_class_id: 0,
    primarySpellIds: [0, 0, 0],
    alignedSpellIds: [0, 0, 0],
    neutralSpellIds: [0, 0, 0, 0, 0],
    backstory: getStoryPrompt(),
  });

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const primarySchool: MagicSchool = getSchoolFromId(
    formData.wizard_class_id,
    referenceData
  ) || {
    school_id: 0,
    name: "",
    aligned: [0, 0, 0],
    neutral: [0, 0, 0],
    opposed: [0, 0],
  };

  const selectedSchoolName: string = primarySchool?.name || "Primary";

  const alignedSchools: MagicSchool[] =
    primarySchool?.aligned.map((school_id) => {
      return getSchoolFromId(school_id, referenceData);
    }) || [];

  const neutralSchools: MagicSchool[] =
    primarySchool?.neutral.map((school_id) => {
      return getSchoolFromId(school_id, referenceData);
    }) || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("update")) {
      dispatch({
        type: name.split("-")[0],
        payload: { index: name.split("-")[1], value: Number(value) },
      });
    } else {
      dispatch({ type: name, payload: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await postNewWizard(formData);
    refreshData();
    // navigate(`/warbands/${result.warband_id}`);
    navigate(`/warbands`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column" },
        gap: 2,
        marginTop: 2,
      }}
    >
      {error && <div>{error}</div>}
      <Typography>Create a new Wizard</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          margin: "auto",
        }}
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
            <MenuItem value={0} disabled>
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
      {formData.wizard_class_id ? (
        <>
          <Typography>Primary Spells</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              margin: "auto",
            }}
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

          <Typography>Aligned Spells</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              margin: "auto",
            }}
          >
            {alignedSchools.map((schoolData: MagicSchool) => (
              <FormControl key={schoolData.school_id} required>
                <InputLabel id="spell-label">{`${schoolData.name} Spell`}</InputLabel>
                <Select
                  labelId="spell-label"
                  name={`updateAlignedSpellIds-${alignedSchools.indexOf(
                    schoolData
                  )}`}
                  value={
                    formData.alignedSpellIds[alignedSchools.indexOf(schoolData)]
                  }
                  onChange={handleChange}
                  sx={{ minWidth: 200 }}
                  label={`${schoolData.name} Spell`}
                  displayEmpty
                >
                  <MenuItem value={0} disabled>
                    --
                  </MenuItem>
                  {formData.wizard_class_id &&
                    referenceData.spell_data
                      .filter(
                        (spell: SpellType) =>
                          spell.school_id === schoolData.school_id
                      )
                      .map((spell: SpellType) => (
                        <MenuItem key={spell.spell_id} value={spell.spell_id}>
                          {spell.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            ))}
          </Box>

          <Typography>Neutral Spells</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              margin: "auto",
            }}
          >
            {[0, 1].map((index) => (
              <FormControl key={`neutral-${index}`} required>
                <InputLabel id="spell-label">
                  Neutral Spell {index + 1}
                </InputLabel>
                <Select
                  labelId="spell-label"
                  name={`updateNeutralSpellIds-${index}`}
                  value={formData.neutralSpellIds[index]}
                  onChange={handleChange}
                  sx={{ minWidth: 200 }}
                  label={`Neutral Spell ${index + 1}`}
                  displayEmpty
                >
                  <MenuItem value={0} disabled>
                    --
                  </MenuItem>
                  {formData.wizard_class_id &&
                    referenceData.spell_data
                      .filter((spell: SpellType) => {
                        const schoolIdArray = neutralSchools.map(
                          (school: MagicSchool) => school.school_id
                        );
                        return schoolIdArray.includes(spell.school_id);
                      })
                      .map((spell: SpellType) => (
                        <MenuItem
                          key={spell.spell_id}
                          value={spell.spell_id}
                          disabled={
                            formData.neutralSpellIds.includes(spell.spell_id) &&
                            formData.neutralSpellIds[index] !== spell.spell_id
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
            <TextField
              label="Backstory"
              name="backstory"
              value={formData.backstory}
              onChange={handleChange}
              multiline
              minRows={5}
              placeholder={"Your story begins..."}
              sx={{ width: { xs: "100%", md: "80vw" } }}
            />
          </Box>
        </>
      ) : null}
      <Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

function WizardFormReducer(state: WizardCreation, action: any) {
  switch (action.type) {
    case "id":
      return { ...state, user_id: action.payload };
    case "name":
      return { ...state, name: action.payload };
    case "wizard_class_id":
      return {
        ...state,
        wizard_class_id: action.payload,
        primarySpellIds: [0, 0, 0],
        alignedSpellIds: [0, 0, 0],
        neutralSpellIds: [0, 0, 0, 0, 0],
      };
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
