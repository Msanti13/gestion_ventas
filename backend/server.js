const express = require('express'); // Importar el paquete express
const cors = require('cors'); // Importar el paquete cors
const db = require('./db'); // Importar el pool de conexiones a la base de datos

const app = express(); // Crear una nueva aplicación express
app.use(cors());  // Habilitar CORS para la aplicación express (solo en desarrollo) 
app.use(express.json()); // Habilitar el soporte para JSON en la aplicación express

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => { // Definir una ruta para obtener todos los productos
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

//RUTA PARA PROVEEDORES
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

//Ruta para compras
// Obtener todas las compras
app.get('/compras', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Compras');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una compra por ID
app.get('/compras/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Compras WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Compra no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar una nueva compra
app.post('/compras', async (req, res) => {
    const {proveedor_id, total } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Compras (proveedor_id, total) VALUES (?, ?)',
            [ proveedor_id, total]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar una compra

app.put('/compras/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, total, proveedor_id } = req.body;
    try {
        await db.query(
            'UPDATE Compras SET fecha = ?, total = ?, proveedor_id = ? WHERE id = ?',
            [fecha, total, proveedor_id, id]
        );
        res.json({ message: 'Compra actualizada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);

// Eliminar una compra
app.delete('/compras/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Compras WHERE id = ?', [id]);
        res.json({ message: 'Compra eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//RUTA PARA VENTAS
// Obtener todas las ventas
app.get('/ventas', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Ventas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener una venta por ID
app.get('/ventas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Ventas WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar una nueva venta
app.post('/ventas', async (req, res) => {
    const { fecha, total, cliente_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Ventas (fecha, total, cliente_id) VALUES (?, ?, ?)',
            [fecha, total, cliente_id]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar una venta
app.put('/ventas/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, total, cliente_id } = req.body;
    try {
        await db.query(
            'UPDATE Ventas SET fecha = ?, total = ?, cliente_id = ? WHERE id = ?',
            [fecha, total, cliente_id, id]
        );
        res.json({ message: 'Venta actualizada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar una venta
app.delete('/ventas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Ventas WHERE id = ?', [id]);
        res.json({ message: 'Venta eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//DETALLE COMPRAS
// Obtener todos los detalles de compras

// agregar un nuevo detalle de compra
app.post('/detalle_compras', async (req, res) => {
   
    const { compra_id, producto_id, cantidad, precio_unitario } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Detalle_compras (compra_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
            [compra_id, producto_id, cantidad, precio_unitario]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
});


// Obtener todos los detalles de compras
app.get('/detalle_compras', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Detalle_compras');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un detalle de compra por ID
app.get('/detalle_compras/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Detalle_compras WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Detalle de compra no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un detalle de compra
app.put('/detalle_compras/:id', async (req, res) => {
    const { id } = req.params;
    const { compra_id, producto_id, cantidad, precio_unitario } = req.body;
    try {
        await db.query(
            'UPDATE Detalle_compras SET compra_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ? WHERE id = ?',
            [compra_id, producto_id, cantidad, precio_unitario, id]
        );
        res.json({ message: 'Detalle de compra actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un detalle de compra
app.delete('/detalle_compras/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Detalle_compras WHERE id = ?', [id]);
        res.json({ message: 'Detalle de compra eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});