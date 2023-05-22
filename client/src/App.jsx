import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import Card from "../src/components/prueba";
import { AuthLayout } from "./layouts";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Ruta de prueba */}
        <Route path="/card" element={<Card />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
