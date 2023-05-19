import { Outlet } from "react-router-dom";
import { BackgroundAuth } from "../components";

export default function AuthLayout() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-8 dt:grid-cols-12 lg:py-6   lg:px-6 min-h-screen font-montserrat">
      <BackgroundAuth />
      <section className="col-span-1 lg:col-span-3 dt:col-span-5 h-full flex flex-col w-full justify-center px-6 lg:px-16">
        <Outlet />
      </section>
    </main>
  )
}
