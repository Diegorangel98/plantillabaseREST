const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a la BD establecida');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}



module.exports = {
    dbConnection
};