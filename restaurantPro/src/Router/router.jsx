import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from '../../src/components/main/main';
import SingIn from "../../src/components/singIn/singIn";



export default function App() {
  return (
    <Fragment>
        <Router>
            <Routes>
                <Route path="/" exact element={<Main/>}/>
                <Route path="/singin" exact element={<SingIn/>}/>
                {/* <Route path="/register" exact element={<Register/>}/> */}
            </Routes>
        </Router>
    </Fragment>
  );
}

