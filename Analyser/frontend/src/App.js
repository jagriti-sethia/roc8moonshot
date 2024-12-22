import { Route, Routes } from "react-router-dom";

import './App.css';
import Signi from "./pages/register"
import Login from "./pages/login";
import Homepage from "./pages/HomePage";
import ProtectedLoginRoute from "./components/protectedlogin";
import ProtectedRoute from "./components/protectedroute";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={< Signi />} />
        <Route element={<ProtectedLoginRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Homepage />} />
        </Route>
      </Routes>


    </div>
  );
}

export default App;
