import React, { useState, useEffect } from 'react';

function BotonAgregarCliente({ onAgregarEditar, libroActual, isEditing, onCancelar }) {
  const [libroForm, setLibroForm] = useState(libroActual);

  useEffect(() => {
    setLibroForm(libroActual);
  }, [libroActual]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibroForm({ ...libroForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarEditar(libroForm);
  };

  return (

    <form className='' onSubmit={handleSubmit}>
        <div className='align-items-center d-flex'>
            <h3 className=' p-3 pt-3 agregar-cliente-text' >Nombre:</h3>
            <input type="texto" placeholder='' className='input-agregar-cliente' name="nombre" value={libroForm.nombre} onChange={handleInputChange} required/>
            
            
            <h3 className='p-3 pt-3 agregar-cliente-text' >Cedula:</h3>
            <input type="texto" placeholder='' className='input-agregar-cliente' name="cedula" value={libroForm.cedula} onChange={handleInputChange} required/>
            
        </div>

        <div className='align-items-center d-flex'>
        
            <h3 className='p-3 pt-3 agregar-cliente-text' >Telefono:</h3>
            <input type="texto" placeholder='' className='input-agregar-cliente' name="telefono" value={libroForm.telefono} onChange={handleInputChange} required/>
            
            <h3 className='p-3 pt-3 agregar-cliente-text' >Correo:</h3>
            <input type="texto" placeholder='' className='input-agregar-cliente' name="correo" value={libroForm.correo} onChange={handleInputChange} required/>

            
            <button type="submit" className="btn btn-primary me-2">{isEditing ? 'Actualizar' : 'Agregar'}</button>
            {isEditing && <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>}
        </div>

        
    </form>


  );
}

export default BotonAgregarCliente;
