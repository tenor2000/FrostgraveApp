import NavBar from "./components/NavBar.tsx";
// import Sidebar from "./components/Sidebar.tsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ReferenceDataProvider } from "./context/ReferenceDataContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

import Reference from "./pages/reference/Reference.tsx";
import Warbands from "./pages/warbands/Warbands.tsx";
import CreateWizard from "./pages/warbands/CreateWizard.tsx";
import Spells from "./pages/spells/Spells.tsx";
import Login from "./pages/users/login.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <ReferenceDataProvider>
          <NavBar />
          {/* <Sidebar /> */}
          <main style={{ border: "1px solid red" }}>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="reference" element={<Reference />} />
              <Route path="reference/:refType" element={<Reference />} />
              <Route path="spells" element={<Spells />} />
              <Route path="spells/:school" element={<Spells />} />
              <Route path="warbands" element={<Warbands />} />
              <Route path="warbands/createWizard" element={<CreateWizard />} />
              <Route path="campaigns" element={<h1>Campaigns</h1>} />
              <Route path="users/login" element={<Login />} />
              <Route path="*" element={<h1>404 Page Not Found</h1>} />
            </Routes>
          </main>
        </ReferenceDataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
