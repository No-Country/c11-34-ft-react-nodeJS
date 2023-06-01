import { EditPerfiForm } from "../components";
import { NavBarUI } from "../components/NavBarUI";

import { Ring } from "@uiball/loaders";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function EditPerfil() {

  const {load, user} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
   if(!load && !Object.values(user).length ) navigate('/auth')
  }, [user, navigate, load])


  if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>

  return (
    <main className="pb-8 lg:pb-0">
      <NavBarUI />
      <section className="flex flex-col lg:flex-row gap-x-20 px-8 lg:px-40  py-12 gap-y-4">
        <section className="flex flex-col  items-center gap-y-4 border-2 py-2 px-6 rounded-lg shadow">
          <img src={user.imagen ? user.imagen : "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"} alt="image placholder" className="w-56 h-56 rounded-full object-cover"/>
          <h3 className="font-montserrat text-lg font-medium">{user.nombre}</h3>
        </section>
        <section className="flex flex-col gap-y-8">
          <h2 className="font-montserrat text-xl font-medium">Editar Perfil</h2>
          <EditPerfiForm user={user}/>
        </section>
      </section>
    </main>
  )
}