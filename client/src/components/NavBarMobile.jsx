
export function NavBarMobile() {

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-bg-color z-10 flex flex-col justify-between items-center py-24 px-10">
        <div className="flex flex-col gap-8 justify-between items-start w-full">
            <a>Inicio</a>
            <a>Acerca de</a>
            <a>Contacto</a>
            <a>Registra tu restaurante</a>
        </div>
        <div>
            <button className="whitespace-nowrap w-60 h-12 rounded-lg bg-bg-dark text-letter-color">
                Iniciar Sesión
            </button>
        </div>
    </div>
  )
}