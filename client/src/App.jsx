import {Route, Routes} from "react-router-dom";
import {
    CaracteristicsRestaurant,
    DescriptionRestaurantData,
    DinnersData,
    FormRegisterRestaurant,
    ListaMenu,
    ListTastesRestaurant,
    OpenDays
} from "../src/components/registerRestaurant";
import {
    Favorites,
    Home,
    Login,
    MyPerfil,
    MyReserves,
    MyRestaurant,
    Register,
    ReserveDone,
    Restaurant,
    ResultsFilter,
    Tastes
} from "./pages";
import {AuthLayout, CreateRestaurantLayout} from "./layouts";
import {Toaster} from "react-hot-toast";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route index element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>

                <Route path="/create-restaurant" element={<CreateRestaurantLayout/>}>
                    <Route index element={<FormRegisterRestaurant/>}/>
                    <Route path="restaurant-detail" element={<ListaMenu/>}/>
                    <Route path="description" element={<DescriptionRestaurantData/>}/>
                    <Route path="reservationDays" element={<OpenDays/>}/>
                    <Route path="diners" element={<DinnersData/>}/>
                    <Route path="listTastes" element={<ListTastesRestaurant/>}/>
                    <Route path="caracts" element={<CaracteristicsRestaurant/>}/>
                </Route>

                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/my-restaurant" element={<MyRestaurant/>}/>
                <Route path="/tastes" element={<Tastes/>}/>
                <Route path="/restaurant/:id" element={<Restaurant/>}/>
                <Route path="/my-perfil" element={<MyPerfil/>}/>
                <Route path="/my-reserva" element={<MyReserves/>}/>
                <Route path="/result" element={<ResultsFilter/>}/>
                <Route path="/reserve" element={<ReserveDone/>}/>
            </Routes>
            <Toaster
                toastOptions={
                    {
                        duration: 2000
                    }
                }
                position="top-right" reverseOrder={false}/>
        </>
    );
}

export default App;
