import { useEffect, useState } from "react";
import { isLogin } from "../utils/isLogin";
import { toast } from "react-hot-toast"

export function useAuth () {

   const [isAuth, setIsAuth] = useState(false)


   const handleAuthentication = async () => {
      return await isLogin()
   }

   useEffect(() => {
      handleAuthentication()
         .then(res  => setIsAuth(res))
         .catch(err => console.log(err))
   }, [])

   const logoutUser = () => {
      localStorage.removeItem('correo')
      setIsAuth(false)
      toast.success('Hasta pronto ✋')
      window.location.reload()
   }

   return {
      isAuth,
      logoutUser
   }

}