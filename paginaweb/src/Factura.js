import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ImageComponent from './Logo.png';
import Dropdown from './Dropdown'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Factura() {
    const [libros, setLibros] = useState([]);
    const [libroActual, setLibroActual] = useState({ nombre: '', precio: '', stock: '' });
    const [isEditing, setIsEditing] = useState(false);

    const [fact, setFact] = useState([]);
    const [factActual, setFactActual] = useState({ nombre: '', precio: '', stock: '' });


    const [factura, setFactura]=useState({ numerofactura: '0000000', fecha:'', clienteid:'', total:0});
  
    const API_URL = 'http://localhost:3000/api/facturas';
  
    useEffect(() => {
      fetchLibros();
    }, []);
  
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setDropdown] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    const [Products, setProducts] = useState([]);
  
  
    useEffect(() => {
      fetchDropdown();
      fetchProducts();

    }, []);
  
    const fetchDropdown = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clientes');
        setDropdown(response.data);
      } catch (error) {
        console.error('Error fetching libros:', error);
      }
    };
  
    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/producto');
          setProducts (response.data);
        } catch (error) {
          console.error('Error fetching libros:', error);
        }
      };
  
    const handleChangeDrop = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleChangeProd = (event) => {
        setSelectedProduct(event.target.value);
      };


    const fetchLibros = async () => {
      try {
        const response = await axios.get(API_URL);
        setLibros(response.data);
      } catch (error) {
        console.error('Error fetching libros:', error);
      }
    };
    const calcularTotal = (productos) => {
        // Utilizamos el método reduce para sumar los precios
        const total = productos.reduce((acumulador, producto) => {
          // Convertimos el precio a número antes de sumarlo
          const precio = parseFloat(producto.precio);
          
          // Verificamos si el precio es un número válido
          if (!isNaN(precio)) {
            return acumulador + precio;
          } else {
            console.error(`Precio inválido para el producto con ID ${producto.id}`);
            return acumulador;
          }
        }, 0);
      
        return total.toFixed(2); // Devolvemos el total redondeado a dos decimales
    };
    const calc = async () => {
        
        var num= await axios.get('http://localhost:3000/api/ultimaFactura');
        const fechaActual = new Date();

        setFactura({ numerofactura: ''+num.data, fecha:fechaActual.toDateString(), clienteid:selectedOption, total: calcularTotal(fact)});




    };
    const addFact = async (prod) => {
        const response = await axios.get('http://localhost:3000/api/producto/'+selectedProduct);
        const newFact = [...fact, response.data];
        setFact(newFact);

        await axios.put('http://localhost:3000/api/productoDec/'+selectedProduct);

    };
    
    const handleAgregarEditarLibro = async (libro) => {
        try {
          if (isEditing) {
            await axios.put(`${API_URL}/${libro.id}`, libro);
          } else {
            await axios.post(API_URL, libro);
          }
          fetchLibros();
          setLibroActual({ nombre: '', precio: '', stock: ''  });
          setIsEditing(false);
        } catch (error) {
          console.error('Error adding or updating libro:', error);
        }
    };

    const handleEditLibro = (libro) => {
        setLibroActual(libro);
        setIsEditing(true);
    };
    

    const handleDeleteLibro = async (id) => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          fetchLibros();
        } catch (error) {
          console.error('Error deleting libro:', error);
        }
    };

    const handleCancelar = () => {
        setLibroActual({ nombre: '', precio: '', stock: '' });
        setIsEditing(false);
    };

    function redirigir(destino) {
        // Cambia 'url_destino' por la URL a la que deseas redirigir
        window.location.href = destino;
    }

    async function numFactura() {
        try {
            var num= await axios.get('http://localhost:3000/api/ultimaFactura');
            const fechaActual = new Date();
            calc();
            
        } catch (error) {
            console.error('Error fetching libros:', error);
        }
    }
    async function AceptarFactura(){
        try {
            if (factura.clienteid===0 || factura.fecha=='' || factura.numerofactura==='0000000' ||factura.total===0 ) {
                alert('Algun dato no ha sido ingresado');
            } else {
                await axios.post(API_URL, factura);
            }
            
        } catch (error) {
            alert('error en los daatos ingresados');
        }
        
    }

    return (
        <div>
            <header>
                <div class=' d-flex align-items-center'>
                    <img src={ImageComponent }width={100} alt="logo del proyecto" />
                    
                    <h2 class='p-4 header-text'>LabSuelos</h2>
                    
                </div>
            </header>
            
            <div class='d-flex align-items-center'>
                <div className='p-3 template d-flex  100-w vh-100 bg-white'>
                
                    <div className=' empleado-panel rounded-corner bg-gray'>
                        <div className='mb-2 rounded-corner bg-green'>
                            <h3 className='pb-3 pt-3 bold-text' >Empleado</h3>
                        </div >
                        
                        <div className='d-grid'>
                            <button className='boton-panel' onClick={() => redirigir('http://localhost:3001/Factura')} href ='/producto'> Facturas</button>
                        </div>
                        <div className='d-grid'>
                            <button className='boton-panel' onClick={() => redirigir('http://localhost:3001/Producto')} href ='/producto'> Productos</button>
                        </div>
                        <div className='d-grid'>
                            <button className='boton-panel' onClick={() => redirigir('http://localhost:3001/AgregarCliente')} href ='/empleado'> Clientes</button>
                        </div>
                    </div>
                

                    <div className='p-3 template d-flex flex-column 100-w vh-100'>
                        

                        
                        
                        
                        <div className=' ingresar-cliente rounded-corner bg-gray'>
                        <div className=' rounded-corner bg-green'>
                        <h3 className='pb-3 pt-3 bold-text' >Facturacion</h3>
                        
                        </div >
                        
                        <div className='d-grid '>
                            <div className='align-items-center d-flex'>
                            
                            <h3 className=' p-3 pt-3 agregar-cliente-text' >Cliente:</h3>
                            <div>
                            <select value={selectedOption} onChange={handleChangeDrop}>
                                <option value="">Select an option</option>
                                {options.map((option) => (
                                <option key={option.nombre} value={option.id}>
                                    {option.nombre}
                                </option>
                                ))}
                            </select>
                            </div>
                            
                            
                                
                                <button className='boton-panel' onClick={() => numFactura()} > Actualizar factura</button>
                                <label className='nav-path-black'>NO:{factura.numerofactura}  Fecha:{factura.fecha}  cliente: {factura.clienteid}  total: {factura.total} </label>
                            
                            </div>
                            <div className='align-items-center d-flex'>
                                <div>
                                <select value={selectedProduct} onChange={handleChangeProd}>
                                    <option value="">Ecoge un producto</option>
                                    {Products.map((Prod) => (
                                    <option key={Prod.nombre} value={Prod.id}>
                                        {Prod.nombre}
                                    </option>
                                    ))}
                                </select>
                                </div>
                                <button className='boton-panel' onClick={() => addFact()} > Agregar producto</button>
                                <form>
                                    <button className='boton-panel' onClick={() => AceptarFactura()} > Aceptar</button>
                                </form>
                            </div>

                        </div>
                        
                        </div>
                        
                        <div className='m-4 panel-cliente rounded-corner bg-gray '>
                            <div className='align-items-center d-flex'>
                                <div className=' letrero'>
                                    <h3 className='pb-3 pt-3 bold-text' >Productos Agregados</h3>
                                </div >

                                <div className=' letrero'>
                                    <h3 className='pb-3 pt-3 bold-text' >Facturas</h3>
                                </div >

                            </div>
                            <div className='align-items-center d-flex'>
                            <div className="table-container2 ">
                                    <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fact.map((libro, index) => (
                                        <tr key={libro.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                                            <td>{libro.id}</td>
                                            <td>{libro.nombre}</td>
                                            <td>{libro.precio}</td>

                                            <td>
                                            </td>
                                        </tr>
                                        ))} 
                                    </tbody>
                                    </table>
                                    
                                </div>


                                <div className="table-container2">
                                    <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                        <th>ID</th>
                                        <th>NumeroFactura</th>
                                        <th>fecha</th>
                                        <th>Cliente</th>
                                        <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {libros.map((libro, index) => (
                                        <tr key={libro.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                                            <td>{libro.id}</td>
                                            <td>{libro.numerofactura}</td>
                                            <td>{libro.fecha}</td>
                                            <td>{libro.nombrecliente}</td>
                                            <td>{libro.total}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        ))} 
                                    </tbody>
                                    </table>
                                    
                                </div>
                                
                                </div>    
                            
                        </div>
                        
                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Factura