

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

// ThdIfsMPof8g5xi8

// marks

//Rutas
  app.use('/api/usuarios', require('./routes/usuarios'));
  app.use('/api/login', require('./routes/auth'));


app.listen(4005, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});