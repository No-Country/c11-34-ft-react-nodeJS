import { useState } from "react"
import { Link } from "react-router-dom"
import { editUser, uploadImage } from "../../services"
import { toast } from "react-hot-toast"
import { Ring } from "@uiball/loaders"

export function EditPerfiForm({user}) {
    
  const [data, setData] = useState({
    nombre: user.nombre,
    correo : user.correo
  })  

  const [isLoad, setIsLoad] = useState(false)

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => setFile(e.target.files[0]);
  
  
  const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
     setIsLoad(true)
     await editUser({...data, id: user.id})
     if(file !== null) {
      await uploadImage({correo : user.correo, img_perfil : file})
     }
     setIsLoad(false)
     toast.success('Su usuario ha sido actualizado correctamente')
    } catch (error) {
      console.error(error)
      toast.error('Algo salio mal')
      setIsLoad(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className=" flex flex-col lg:flex-row   gap-x-12 gap-y-4">
      <div className="flex-col flex items-start">
            <label htmlFor="nombre"  className="block mb-1 font-inter text-sm text-gray-500 ">Nombre</label>
            <input value={data.nombre} onChange={(e) => handleChange(e)} name="nombre" type="text" className="border py-1 px-4 outline-none shadow mb-4 w-full lg:w-auto"/>
            <label htmlFor="correo" className="block mb-1 font-inter text-sm text-gray-500 ">Email</label>
            <input value={data.correo} onChange={(e) => handleChange(e)} name="correo" type="text"  className="border py-1 px-4 outline-none shadow mb-4 w-full lg:w-auto"/>
            
            <div className="w-full  flex justify-between items-center">
                <label className="mb-1 font-inter text-sm text-gray-500 ">Gustos</label>
                <Link to='/tastes' className="font-inter text-xs  text-subtitle hover:underline ">Actualizar gustos </Link>
            </div>
    
            <div className="flex gap-x-2 items-center border rounded-lg py-2 px-2 mb-4 w-full lg:w-auto">

                {
                  !user?.gustos?.length && 
                  <p className="text-xs font-inter text-gray-600">No hay gustos que ver</p>
                }
                {
                    user?.gustos?.map(gusto => (
                        <p className="text-xs font-inter text-gray-600" key={gusto}>{gusto}</p>
                    ))
                }
            </div>
            <button disabled={isLoad} type="submit" className=" bg-green-400 py-2 px-3 rounded-lg font-inter text-xs hover:bg-green-500/90 transition-all self-end lg:self-start w-auto flex justify-center" >
              {
                isLoad
                ? <Ring size={15} lineWeight={5} speed={2} color="black"/>
                : 'Guardar cambios'
              }
            </button>
      </div>
      <div className=" lg:w-80 ">
        <div className="flex items-center justify-center w-full ">
            <label htmlFor="file" className="">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer w-full">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    {
                      !file 
                      ? <>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para </span> subir/editar imagen</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG OR JPEG (MAX. 800x400px)</p>
                        </>
                      : <div className="w-full h-full justify-center items-center "><p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">Imagen cargada</p></div>
                    }
                </div>
                <input id="file"  accept=".jpg, .jpeg, .png" onChange={(e) => handleFileChange(e)} type="file" className="hidden " />
            </label>
        </div> 

      </div>
    </form>
  )
}
