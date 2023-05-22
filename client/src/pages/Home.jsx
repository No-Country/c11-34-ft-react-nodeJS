import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="font-montserrat flex flex-col gap-y-4">
     <Link to='/auth' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Navegar Login</Link>
     <Link to='/auth/register' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Register</Link>
     <Link to='/card' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Cards</Link>

     {/* Cards */}

    </main>
  )
}
