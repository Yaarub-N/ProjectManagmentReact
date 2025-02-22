import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";

const App = ({ darkMode, setDarkMode }) => {
  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/projects/:projectNumber" element={<ProjectDetails />} />
        <Route path="/edit/:projectNumber" element={<EditProject />} />
      </Routes>
    </Router>
  );
};

export default App;
