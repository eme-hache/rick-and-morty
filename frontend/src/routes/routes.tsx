import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/layout.component";
import { ROUTES } from "../constants/routes.constants";
import Character from "../pages/character.component";
import Home from "../pages/home.component";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CHARACTER} element={<Character />} />
      </Route>
    </Routes>
  );
}
