import { Route, Routes } from "react-router-dom";
import {FormRegisterRestaurant, ListTastesRestaurant, OpenDays, CaracteristicsRestaurant, DinnersData, DescriptionRestaurantData, UploadPhoto, ListaMenu} from "../src/components/registerRestaurant";
import { Home, Login, MyPerfil, Register, Restaurant, ResultsFilter, Tastes, ReserveDone } from "./pages";
import { AuthLayout, CreateRestaurantLayout } from "./layouts";
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

        <Route path="/create-restaurant" element={<CreateRestaurantLayout />}>
            <Route index element={<FormRegisterRestaurant />} />
            <Route path="restaurant-detail"  element={<ListaMenu />} />
            <Route path="photos" element={<UploadPhoto />} />
            <Route path="description" element={<DescriptionRestaurantData />} />
            <Route path="reservationDays" element={<OpenDays />} />
            <Route path="diners" element={<DinnersData />} />
            <Route path="listTastes" element={<ListTastesRestaurant />} />
            <Route path="caracts" element={<CaracteristicsRestaurant />} />
        </Route>


        <Route path="/tastes" element={<Tastes />} />
        <Route path="/restaurant/:id" element={<Restaurant/>}/>
        <Route path="/my-perfil" element={<MyPerfil/>}/>
        <Route path="/result" element={<ResultsFilter />}/>
        <Route path="/reserve" element={<ReserveDone />}/>
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
