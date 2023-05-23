
export function LoginGoogleButton() {

 //TODO : Hacer logica de authenticacion con google


  return (
    <button
        type="button" 
        id="g_id_onload"
        data-client_id="565935417184-okrrn47e20u7jrgtk4mmjoar5b7678e4.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleLoginWithGoogle"
        data-auto_prompt="false"
        className='flex gap-x-4 items-center justify-center p-2.5 font-inter rounded-full border-2 border-border-color font-medium'>
        <img src='https://img.freepik.com/iconos-gratis/buscar_318-265146.jpg' alt='google logo' width='24' height='24'/>
        Ingresar con Google
    </button>
  )
}
