const mongoose = require('mongoose');


const dbConnection = async() => {
  
    try {
    await mongoose.connect(DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('DB Online');
}
catch(error) {
    console.log(error);
    throw new Error('Erro al a hora dei niciar BD');
}

}

module.exports = {
    dbConnection
}