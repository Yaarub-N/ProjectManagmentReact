import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/create" element={<CreateProject />} />
            <Route
              path="/projects/:projectNumber"
              element={<ProjectDetails />}
            />
            <Route path="/edit/:projectNumber" element={<EditProject />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
