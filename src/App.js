import Header from "./components/Header";
import Home from "./components/Home";
import Booklist from "./components/Booklist";
import Bookdetail from "./components/Bookdetail";
import Team from "./components/Team";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booklist" element={<Booklist />} />
        <Route path="/bookdetail/:id" element={<Bookdetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
