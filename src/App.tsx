import NavBar from "./components/NavBar.tsx";
// import Sidebar from "./components/Sidebar.tsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ReferenceDataProvider } from "./context/ReferenceDataContext.tsx";

import Reference from "./pages/reference/Reference.tsx";
import Warbands from "./pages/warbands/Warbands.tsx";
import CreateWizard from "./pages/warbands/CreateWizard.tsx";
import Spells from "./pages/spells/Spells.tsx";

function App() {
  return (
    <>
      <ReferenceDataProvider>
        <NavBar />
        {/* <Sidebar /> */}
        <main style={{ border: "1px solid red" }}>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="reference" element={<Reference />} />
            <Route path="reference/:type" element={<Reference />} />
            <Route path="spells" element={<Spells />} />
            <Route path="spells/:school" element={<Spells />} />
            <Route path="warbands" element={<Warbands />} />
            <Route path="warbands/createWizard" element={<CreateWizard />} />
            <Route path="campaigns" element={<h1>Campaigns</h1>} />
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </main>
      </ReferenceDataProvider>
    </>
  );
}

export default App;
