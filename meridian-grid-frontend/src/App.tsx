import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
