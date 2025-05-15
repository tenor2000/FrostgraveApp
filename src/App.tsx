import NavBar from "./components/NavBar.tsx";
// import Sidebar from "./components/Sidebar.tsx";
import { useMediaQuery } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ReferenceDataProvider } from "./context/ReferenceDataContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Home from "./pages/home/Home.tsx";
import Reference from "./pages/reference/Reference.tsx";
import Warbands from "./pages/warbands/Warbands.tsx";
import NewWizardForm from "./pages/warbands/NewWizardForm.tsx";
import Spells from "./pages/spells/Spells.tsx";
import Login from "./pages/users/Login.tsx";
import Register from "./pages/users/Register.tsx";
import Profile from "./pages/users/Profile.tsx";
import MobileBottomNav from "./components/BottomNav.tsx";

function App() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <AuthProvider>
        <ReferenceDataProvider>
          <NavBar />
          {/* <Sidebar /> */}
          <main style={{ border: "1px solid red" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="reference" element={<Reference />} />
              <Route path="reference/:refType" element={<Reference />} />
              <Route path="spells" element={<Spells />} />
              <Route path="spells/:school" element={<Spells />} />
              <Route path="warbands" element={<Warbands />} />
              <Route path="warbands/createWizard" element={<NewWizardForm />} />
              <Route path="campaigns" element={<h1>Campaigns</h1>} />
              <Route path="users/login" element={<Login />} />
              <Route path="users/register" element={<Register />} />
              <Route path="users/profile" element={<Profile />} />
              <Route path="*" element={<h1>404 Page Not Found</h1>} />
            </Routes>
          </main>
          {isMobile && <MobileBottomNav />}
        </ReferenceDataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
