import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Main, SignIn, SignUp} from '../components'

export default function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" exact element={<Main/>}/>
                <Route path="/signin" exact element={<SignIn/>}/>
                <Route path="/signup" exact element={<SignUp/>}/>
            </Routes>
        </Router>
    </>
  );
}

