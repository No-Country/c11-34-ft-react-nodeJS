import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, Restaurant, ResultsFilter, Tastes } from "./pages";
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
        <Route path="/tastes" element={<Tastes />} />
        <Route path="/restaurant/:id" element={<Restaurant/>}/>
        <Route path="/result" element={<ResultsFilter />}/>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
