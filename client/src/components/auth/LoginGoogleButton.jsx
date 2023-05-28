import { GoogleLogin } from "@react-oauth/google";
import { authGoogle } from "../../services";
import { useState } from "react";

export function LoginGoogleButton() {

 //TODO : Hacer logica de authenticacion con google
 const [newUser, setNewUser] = useState({})

  async function authenticationGoogle (response) {
    try {
      const credential = { id_token_google: response.credential }
      const user = authGoogle(credential)
      setNewUser(user)
      console.log(newUser)
      
    } catch (error) {
      console.error('Algo salio mal: ', error)
    }
  }


  return (
    <GoogleLogin 
      onSuccess={authenticationGoogle}
      onError={console.log}
    />
  )
}
