const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        this.homePath     = '/home';

        //conectar a BD
        this.conectarDB();
        // middlewares
        this.middlewares();

        // rutas de mi aplciacion
        this.routes();
    }

    async conectarDB(){
        // conectar a BD
        await dbConnection();
    }
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }
    routes(){
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.homePath, require('../routes/home'));

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando el puerto: ${this.port}!`)
        });
    }
}

module.exports = Server;