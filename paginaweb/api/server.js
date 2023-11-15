const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const moment = require('moment');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tarea3',
  password: '1234',
  port: 5432,//5432
});

// Rutas CRUD aquí

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de manejo de base de datos');
});

// Obtener todos los clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Clientes');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtener un cliente por ID
app.get('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Clientes WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear un nuevo cliente
app.post('/api/clientes', async (req, res) => {
  try {
    let { nombre, cedula, telefono, correo } = req.body;
    console.log({ nombre, cedula, telefono, correo });
    // Formatear la fecha a 'DD/MMM/YYYY' usando moment.js
    //const fechaFormateada = publicado ? moment(publicado, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;
    //console.log(fechaFormateada);
    await pool.query('INSERT INTO Clientes (Nombre, Cedula, Telefono , Correo) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, cedula, telefono, correo]);
    res.json({ message: 'Cliente agragado exitosamente' });

    
  } catch (error) {
    console.error('Error inserting libro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un cliente
app.put('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, telefono, correo } = req.body;
    await pool.query('UPDATE Clientes SET nombre = $1, cedula = $2, Telefono = $3, Correo = $4 WHERE id = $5', [nombre, cedula, telefono, correo, id]);
    res.json({ message: 'Libro actualizado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

// Eliminar un cliente
app.delete('/api/clientes/:id', async (req, res) => {

  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


///////////////////////////////////////////

app.get('/api/producto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtener un cliente por ID
app.get('/api/producto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear un nuevo cliente
app.post('/api/producto', async (req, res) => {
  try {
    let { nombre, precio, stock } = req.body;
    console.log({ nombre, precio, stock });

    await pool.query('INSERT INTO productos (Nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *', [nombre, precio, stock]);
    res.json({ message: 'Cliente agragado exitosamente' });

    
  } catch (error) {
    console.error('Error inserting libro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un cliente
app.put('/api/producto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    console.log({ nombre, precio, stock });
    await pool.query('UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4', [nombre, precio, stock, id]);
    res.json({ message: 'Libro actualizado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

app.put('/api/productoDec/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE productos SET stock = stock - 1 WHERE id = $1;', [ id]);
    res.json({ message: 'Libro actualizado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

// Eliminar un cliente
app.delete('/api/producto/:id', async (req, res) => {

  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///////////////////Facturas/////////////////////////


app.get('/api/facturas', async (req, res) => {
  try {
    const result = await pool.query('SELECT Facturas.ID AS id, Facturas.NumeroFactura, Facturas.Fecha, Facturas.Total, Clientes.Nombre AS NombreCliente, Clientes.Cedula, Clientes.Correo, Clientes.Telefono FROM Facturas JOIN Clientes ON Facturas.ClienteID = Clientes.ID;');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/ultimaFactura', async (req, res) => {
  try {
    const result = await pool.query('SELECT MAX(CAST(NumeroFactura AS INTEGER))+1 AS UltimoNumeroFactura FROM Facturas');
    console.log(result.rows[0].ultimonumerofactura);

    res.json(result.rows[0].ultimonumerofactura);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Obtener un cliente por ID
app.get('/api/facturas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM facturas WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear un nuevo cliente
app.post('/api/facturas', async (req, res) => {
  try {
    let { numerofactura, fecha, clienteid, total } = req.body;
    console.log({ numerofactura, fecha, clienteid, total });
    
    await pool.query('INSERT INTO facturas (NumeroFactura, Fecha, ClienteID, Total) VALUES ($1, $2, $3, $4) RETURNING *', [numerofactura, fecha, clienteid, total]);

  } catch (error) {
    console.error('Error inserting libro:', error);
    res.status(500).json({ error: error.message });
  }
});




app.delete('/api/facturas/:id', async (req, res) => {

  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM facturas WHERE id = $1', [id]);
    
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

