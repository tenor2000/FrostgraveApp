import { useParams } from "react-router-dom";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BasicAccordian from "../../components/BasicAccordian";
import BasicSpellCard from "./BasicSpellCard";

type Spell = {
  _id: string;
  spell_id: number;
  name: string;
  school: string;
  base_cast: number;
  category: string;
  description: string;
};

export default function Reference() {
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();
  const { school } = useParams<{ school: string }>();
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  let spellData: Spell[] = referenceData.spell_data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const schooltypes = [
    ...new Set(spellData.map((spell: Spell) => spell.school.toLowerCase())),
  ];

  if (school && !schooltypes.includes(school.toLowerCase())) {
    nav("page-not-found");
  }

  if (school && schooltypes.includes(school.toLowerCase())) {
    spellData = spellData.filter(
      (spell: Spell) => spell.school.toLowerCase() === school.toLowerCase()
    );
  }

  if (searchTerm) {
    spellData = spellData.filter((spell: Spell) =>
      spell.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      <Box>
        <h2>Spells</h2>
        <SearchBar searchText={searchTerm} setSearchText={setSearchTerm} />
      </Box>
      <Box>
        {spellData.map((spell: Spell) => (
          <BasicAccordian title={spell.name} key={spell._id}>
            <BasicSpellCard spellObj={spell} titlebar={false} />
          </BasicAccordian>
        ))}
      </Box>
    </>
  );
}
