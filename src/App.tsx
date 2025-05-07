import Header from "./components/Header.tsx";
import Nav from "./components/Nav.tsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Reference from "./pages/Reference.tsx";
import Warbands from "./pages/Warbands.tsx";
import NewWizard from "./pages/NewWizard.tsx";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/spells" element={<h1>Spells</h1>} />
        <Route path="/warbands" element={<Warbands />} />
        <Route path="/warbands/newWizard" element={<NewWizard />} />
        <Route path="/documentation" element={<h1>Docs</h1>} />
      </Routes>
    </>
  );
}

export default App;
