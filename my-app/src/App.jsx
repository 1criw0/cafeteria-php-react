import React from "react";
import "./assets/css/stile.css";
import "./assets/css/light-bootstrap-dashboard.css";
import "./assets/css/es.css";
import "./assets/css/estilo2.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Datos from './components/paginas/datos';
import Productos from "./components/paginas/producto";
import Vercompras from "./components/paginas/vercompras";


function App() {
  return (
   <Router>
            <Routes>
            <Route exact path='/' element={<Datos/>}>
            </Route>
            <Route exact path='/datos' element={<Datos/>}>
            </Route>
            <Route exact path='/Productos' element={<Productos/>}>
            </Route>
            <Route exact path='/vercompras' element={<Vercompras/>}>
            </Route>
            
            
            </Routes>
        </Router>
  );
};
export default App;
