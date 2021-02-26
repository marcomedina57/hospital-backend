

var cors = require('cors');
const express = require('express');

require('dotenv').config();

// Configurar CORS

const app = express();
app.use(cors());

// Lectura y parseo del body

app.use(express.json());

const { dbConnection} = require('./database/config');

// Crear el servidor de express



// Base de datos

dbConnection();

//Directorio publico

app.use(express.static('public'))

// ThdIfsMPof8g5xi8

// marks

//Rutas
  app.use('/api/usuarios', require('./routes/usuarios'));
  app.use('/api/login', require('./routes/auth'));
  app.use('/api/hospitales', require('./routes/hospitales'));
  app.use('/api/medicos', require('./routes/medicos'));
  app.use('/api/todo', require('./routes/busquedas'));
  app.use('/api/upload', require('./routes/upload'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
    
});