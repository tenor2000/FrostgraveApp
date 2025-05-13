import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useState } from "react";
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

export default function NewWizardForm() {
  const [formData, setFormData] = useState<Wizard>({
    user_id: "",
    name: "",
    wizard_class_id: 0,
    primarySpellIds: [],
    alignedSpellIds: [],
    neutralSpellIds: [],
    backstory: "",
  });

  const { referenceData } = useReferenceData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        label="Class"
        name="wizard_class_id"
        value={formData.wizard_class_id}
        onChange={handleChange}
        required
      >
        <option value="0" disabled selected>
          --
        </option>
        {referenceData.magic_school.map(
          (schoolData: {
            school_id: number;
            name: string;
            aligned: number[];
            neutral: number[];
            opposed: number[];
          }) => (
            <MenuItem key={schoolData.school_id} value={schoolData.school_id}>
              {schoolData.name}
            </MenuItem>
          )
        )}
      </Select>
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
