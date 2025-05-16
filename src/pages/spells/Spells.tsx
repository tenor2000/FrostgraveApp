import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Pagination,
  Stack,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BasicAccordian from "../../components/BasicAccordian";
import BasicSpellCard from "./BasicSpellCard";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import type { SpellType } from "../../types/ReferenceTypes";

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
  let spellData: SpellType[] = referenceData.spell_data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Getting school names from the list of spells
  const schooltypes = [
    ...new Set(
      spellData
        .map((spell: SpellType) =>
          getSchoolFromId(spell.school_id, referenceData)?.name.toLowerCase()
        )
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  // Making sure param is valid school name
  if (school && !schooltypes.includes(school.toLowerCase())) {
    nav("page-not-found");
  }

  if (school && schooltypes.includes(school.toLowerCase())) {
    spellData = spellData.filter(
      (spell: SpellType) =>
        getSchoolFromId(spell.school_id, referenceData)?.name.toLowerCase() ===
        school.toLowerCase()
    );
  }

  if (searchTerm) {
    spellData = spellData.filter((spell: SpellType) =>
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
      <Box sx={{ padding: "1rem", marginBottom: "1rem" }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="spell school tabs"
            allowScrollButtonsMobile
            sx={{ bgcolor: "rgba(0, 0, 0, 0.5)" }}
          >
            <Tab
              component={Link}
              to="/spells"
              label="All"
              sx={{ fontWeight: "bold", minWidth: "100px", color: "white" }}
            />
            {schooltypes.map((school: string) => (
              <Tab
                key={school}
                component={Link}
                onClick={() => setPage(1)}
                to={`/spells/${school}`}
                label={school}
                sx={{ fontWeight: "bold", minWidth: "100px", color: "white" }}
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
      </Box>
      <Box>
        {paginatedSpells.map((spell: SpellType) => (
          <BasicAccordian title={spell.name} key={spell._id}>
            <BasicSpellCard spellObj={spell} titlebar={false} />
          </BasicAccordian>
        ))}
      </Box>
      {itemsPerPage < spellData.length && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack
            spacing={2}
            sx={{
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Pagination
              count={Math.ceil(spellData.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="secondary"
              sx={{
                button: {
                  color: "white",
                  borderColor: "white",
                },
                ".Mui-selected": {
                  color: "white",
                },
              }}
            />
          </Stack>
        </Box>
      )}
    </>
  );
}
