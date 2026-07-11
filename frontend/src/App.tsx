import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from "./components/Map/MapView";
import ExplorePage from "./pages/ExplorePage";
import ExploreResultsPage from "./pages/ExploreResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/results" element={<ExploreResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
