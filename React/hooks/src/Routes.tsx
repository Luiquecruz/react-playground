import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import {TweetsPage} from "./pages/TweetsPage";
import {ProfilePage} from "./pages/ProfilePage";
import App from "./App";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TweetsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}