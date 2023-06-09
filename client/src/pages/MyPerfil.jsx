import { EditPerfiForm, MyAccount } from "../components";
import { NavBarUI } from "../components/NavBarUI";

import { Ring } from "@uiball/loaders";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function MyPerfil() {

  const {load, user} = useUser()
  const navigate = useNavigate()
  const [view, setView] = useState('edit-perfil');

  useEffect(() => {
   if(!load && !Object.values(user).length ) navigate('/auth')
  }, [user, navigate, load])

  const emailUserForReserv = localStorage.setItem('userEmailReservation', user.correo);

  const handleChangeView = () => setView(view === 'edit-perfil' ? 'my-account' : 'edit-perfil')


  if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>

  return (
    <main className="pb-8 lg:pb-0">
      <NavBarUI />
      <section className="grid grid-cols-1  lg:grid-cols-12 gap-x-28  px-8 lg:px-24  py-12 gap-y-4 ">
        <section className="lg:col-span-4 flex flex-col  items-center gap-y-4 border-2 pt-2  rounded-lg shadow w-96">
          <img src={user.imagen ? user.imagen : "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"} alt="image placholder" className="w-52 h-52 rounded-full object-cover"/>
          <h3 className="font-montserrat text-lg font-medium">{user.nombre}</h3>
          <div className="w-full text-sm">
            <button className={`${view === 'edit-perfil' ? 'border-l-green-400 border-l-4 font-medium text-black' : 'text-subtitle '} py-2 font-inter  w-full border shadow `} onClick={handleChangeView}>Editar Perfil</button>
            <button className={`${view !== 'edit-perfil' ? 'border-l-green-400 border-l-4 font-medium text-black' : 'text-subtitle'}  py-2 font-inter  w-full border shadow `}onClick={handleChangeView}>Mi cuenta</button>
          </div>
        </section>
        <section className="flex flex-col gap-y-8 lg:col-span-8">
          <h2 className="font-montserrat text-xl font-medium">{view === 'edit-perfil' ? 'Editar Perfil' : 'Mi Cuenta'}</h2>
          {view === 'edit-perfil' && <EditPerfiForm user={user}/>}
          {view === 'my-account' && <MyAccount user={user} />}
        </section>
      </section>
    </main>
  )
}