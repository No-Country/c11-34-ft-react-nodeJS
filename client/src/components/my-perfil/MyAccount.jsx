import { useState } from "react"
import { toast } from "react-hot-toast"
import { editUser } from "../../services/user.services"
import { Ring } from "@uiball/loaders"

export function MyAccount({ user }) {

  const [view, setView] = useState(false)
  
  const [actions, setActions] = useState({
    error : '',
    load : false
  })

  const [passwords, setPasswords] = useState({
    password: '',
    password2 :''
  })

  const handleChange = (e) => setPasswords({...passwords, [e.target.name] : e.target.value})

  const resetFields = () => setPasswords({password : '', password2 : ''})

  const errorMsg =  (msg) => {
    setActions({...actions, error : msg})
    setTimeout(() => {
      setActions({...actions, error : ''})
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setActions({...actions, load : true})
      if(Object.values(passwords).includes('')) return errorMsg('Los campos no deben estar vacios')
      if(passwords.password !== passwords.password2) return errorMsg('Las contraseñas no coinciden')
      await editUser({id: user?.id, contrasena : passwords.password })
      resetFields()
      setActions({...actions, load : false})
      toast.success('Contraseñas actualizadas correctamente')
    } catch (error) {
      console.error(error)
      toast.error('Algo salio mal')
      setActions({...actions, load : false})
    }
  }

  return (
    <div>
      <section className={`${!view  && 'opacity-100 '} opacity-0  -z-0 transition-opacity mb-4 flex flex-col items-start`}>
      <p className="text-subtitle text-xs font-inter border shadow p-2 rounded-lg w-full lg:w-56 mb-3">********</p>
      <button disabled={view} className="font-inter text-sm bg-black text-white px-2 py-2  lg:w-56 rounded-lg self-end lg:self-start" onClick={() => setView(!view)}>Cambiar contraseña</button>
      </section>

      <form onSubmit={handleSubmit} className={`${view  && 'opacity-100 '} opacity-0 transition-opacity mb-4`}>
        <section className="w-full lg:w-56 flex flex-col items-start mb-6 relative">

          {
            actions.error &&
            <div className="text-red-300 text-xs rounded font-inter font-medium   absolute -top-6 left-0">
              <p>{actions.error}</p>
            </div>
          }  
          <label htmlFor="password" className="block mb-1 font-inter text-sm text-gray-500 ">Nueva Contraseña <span className="text-red-400">*</span></label>
            <input value={passwords.password} onChange={(e) => handleChange(e)} name="password" type="password"  className="border py-1 px-4 outline-none shadow mb-4 w-full"/>

            <label htmlFor="password" className="block mb-1 font-inter text-sm text-gray-500 ">Confirmar Contraseña <span className="text-red-400">*</span></label>
            <input value={passwords.password2} onChange={(e) => handleChange(e)} name="password2" type="password"  className="border py-1 px-4 outline-none shadow mb-4 w-full"/>
            <button disabled={actions.load} className=" bg-green-400 py-2 px-3 rounded-lg font-inter text-xs  hover:bg-green-500/90 transition-all  flex justify-center  self-end lg:w-full">
              {
                  actions.load
                  ? <Ring size={15} lineWeight={5} speed={2} color="black"/>
                  : 'Guardar cambios'
              }
            </button>
        </section>

      </form>
      <p className="text-subtitle text-xs font-inter border shadow p-2 rounded-lg w-56">Cuenta <span className="text-gray-400 font-medium">{user?.estado ? 'Activa' : 'Baja'}</span></p>
    </div>
  )
}
