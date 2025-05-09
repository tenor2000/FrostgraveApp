import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Pagination,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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

export default function Spells() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const { school } = useParams<{ school: string }>();
  const { referenceData, loading, error } = useReferenceData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  // Sorting the list of spells
  let spellData: Spell[] = referenceData.spell_data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Getting school names from the list of spells
  const schooltypes = [
    ...new Set(
      spellData
        .map((spell: Spell) => spell.school.toLowerCase())
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  // Making sure param is valid school name
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

  // Tab Navigation
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const itemsPerPage = isMobile ? 6 : 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSpells = spellData.slice(startIndex, endIndex);

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="spell school tabs"
            allowScrollButtonsMobile
          >
            <Tab
              component={Link}
              to="/spells"
              label="All"
              sx={{ fontWeight: "bold", minWidth: "100px" }}
            />
            {schooltypes.map((school: string) => (
              <Tab
                key={school}
                component={Link}
                onClick={() => setPage(1)}
                to={`/spells/${school}`}
                label={school}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
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
        <SearchBar
          searchText={searchTerm}
          setSearchText={setSearchTerm}
          setPaginate={setPage}
        />
        {itemsPerPage < spellData.length && (
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(spellData.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        )}
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
