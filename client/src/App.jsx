import { Route, Routes } from "react-router-dom"
import { Home, Login, Register } from "./pages"
import { AuthLayout } from "./layouts"

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    </>
  )
}

export default App
