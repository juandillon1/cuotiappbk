const db = require('mongoose');
const uri = 'mongodb+srv://admin:123321@cluster0.tdysj.mongodb.net/cuotasDB?retryWrites=true&w=majority';

const connectDB = () => {
    db.connect(uri, () => {
        console.log('conectado');
    });
}

module.exports = {
    connectDB,
}