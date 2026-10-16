require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/database');

const app = express();

// Middlewares para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir la carpeta Frontend estática (respetando la F mayúscula)
app.use(express.static(path.join(__dirname, '../Frontend')));

// Ruta principal para cargar el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Ruta POST para recibir el pedido
app.post('/pedido', async (req, res) => {
    let { nombre, email, telefono, producto, cantidad, tamano, extras, direccion, observaciones } = req.body;

    if (Array.isArray(extras)) {
        extras = extras.join(', ');
    } else if (!extras) {
        extras = 'Ninguno';
    }

    try {
        const query = `
            INSERT INTO pedidos (nombre, email, telefono, producto, cantidad, tamano, extras, direccion, observaciones)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await db.execute(query, [
            nombre || '',
            email || '',
            telefono || '',
            producto || '',
            cantidad || 1,
            tamano || '',
            extras,
            direccion || '',
            observaciones || ''
        ]);

        const parametros = new URLSearchParams({
            nombre: nombre || '',
            email: email || '',
            telefono: telefono || '',
            producto: producto || '',
            cantidad: cantidad || '1',
            tamano: tamano || '',
            extras: extras,
            direccion: direccion || '',
            observaciones: observaciones || ''
        });

        // Redireccionar al resumen
        res.redirect('/resumen.html?' + parametros.toString());
    } catch (error) {
        console.error('Error en MySQL:', error);
        res.status(500).send(`
            <div style="font-family: sans-serif; padding: 20px; color: red;">
                <h2>Error al guardar en la base de datos:</h2>
                <p><b>Mensaje:</b> ${error.message}</p>
            </div>
        `);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});