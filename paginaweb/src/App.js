import React from 'react';
import{BrowserRouter, Routes, Route} from 'react-router-dom'

import Producto from './Producto'
import AgregarCliente from './AgregarCliente';
import Factura from './Factura';
import Venta from './Venta';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/producto' element= {<Producto/>}></Route>
        <Route path='/agregarcliente' element= {<AgregarCliente/>}></Route>
        <Route path='/factura' element= {<Factura/>}></Route>
        <Route path='/venta' element= {<Venta/>}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
