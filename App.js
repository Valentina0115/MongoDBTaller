const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// aqui va las rutas
 const seriesRouter = require('./Routers/serieRouter')
const App = express();
dotenv.config();
const port = process.env.PORT
// middleware
App.use(bodyParser.json());
// conexion a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/NetflixDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.error('Error al conectar a MongoDB:', err));
// Rutas
App.use('/api/Netflix',seriesRouter );
// Iniciar servidor
App.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto ${port}`);
  });