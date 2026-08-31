import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from "./components/Map/MapView";
import ExplorePage from "./pages/ExplorePage";
import ExploreResultsPage from "./pages/ExploreResultsPage";
import TripPlannerPanel from "./components/TripPlanner/TripPlannerPanel"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/results" element={<ExploreResultsPage />} />
        <Route path="/plan-trip" element={<TripPlannerPanel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
