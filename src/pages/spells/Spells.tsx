import { useParams } from "react-router-dom";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useNavigate } from "react-router-dom";
import { Box, Pagination, Stack } from "@mui/material";
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
  const [page, setPage] = useState(1);
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

  // Pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSpells = spellData.slice(startIndex, endIndex);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-evenly" },
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        {school ? (
          <h2>Spellbook: {school[0].toUpperCase() + school.slice(1)}</h2>
        ) : (
          <h2>Spellbook: All Schools</h2>
        )}
        <SearchBar searchText={searchTerm} setSearchText={setSearchTerm} />
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(spellData.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>
      <Box>
        {paginatedSpells.map((spell: Spell) => (
          <BasicAccordian title={spell.name} key={spell._id}>
            <BasicSpellCard spellObj={spell} titlebar={false} />
          </BasicAccordian>
        ))}
      </Box>
    </>
  );
}
