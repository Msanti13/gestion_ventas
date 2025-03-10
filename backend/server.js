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

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});