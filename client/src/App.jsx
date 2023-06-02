import { Route, Routes } from "react-router-dom";
import { EditPerfil, Home, Login, Register, Restaurant, ResultsFilter, Tastes } from "./pages";
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
        <Route path="/edit-perfil" element={<EditPerfil/>}/>
        <Route path="/result" element={<ResultsFilter />}/>
      </Routes>
      <Toaster 
      toastOptions={
        {
          duration : 2000
        }
      }
      position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
