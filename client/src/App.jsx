import { Route, Routes } from "react-router-dom";
import { EditPerfil, Home, Login, Register, Restaurant, ResultsFilter, Tastes } from "./pages";
import {FormRegisterRestaurant, ListTastesRestaurant, OpenDays, CaracteristicsRestaurant, DinnersData, DescriptionRestaurantData, UploadPhoto, ListaMenu} from "../src/components/registerRestaurant"
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
          <Route path="/createRestaurant" element={<FormRegisterRestaurant />}/>
          <Route path="/createRestaurant/restaurantdata" element={<ListaMenu />} />
          <Route path="/createRestaurant/restaurantdata/photos" element={<UploadPhoto />} />
          <Route path="/createRestaurant/restaurantdata/description" element={<DescriptionRestaurantData />} />
          <Route path="/createRestaurant/restaurantdata/reservationDays" element={<OpenDays />} />
          <Route path="/createRestaurant/restaurantdata/diners" element={<DinnersData />} />
          <Route path="/createRestaurant/restaurantdata/listTastes" element={<ListTastesRestaurant />} />
          <Route path="/createRestaurant/restaurantdata/caracts" element={<CaracteristicsRestaurant />} />


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
