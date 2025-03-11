const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para agregar un nuevo producto
app.post('/productos', async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, proveedor_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Productos (nombre, descripcion, precio, stock, categoria, proveedor_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, categoria, proveedor_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para actualizar un producto
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoria, proveedor_id } = req.body;
  try {
    await db.query(
      'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, proveedor_id = ? WHERE id = ?',
      [nombre, descripcion, precio, stock, categoria, proveedor_id, id]
    );
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Productos WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// Obtener todos los proveedores
app.get('/proveedores', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Proveedores');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un proveedor por ID
app.get('/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Proveedores WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un nuevo proveedor
app.post('/proveedores', async (req, res) => {
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Proveedores (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
      [nombre, contacto, telefono, email, direccion]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un proveedor
app.put('/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    await db.query(
      'UPDATE Proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
      [nombre, contacto, telefono, email, direccion, id]
    );
    res.json({ message: 'Proveedor actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un proveedor
app.delete('/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Proveedores WHERE id = ?', [id]);
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});