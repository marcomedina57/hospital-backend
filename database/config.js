const mongoose = require('mongoose');

// uSmcSOh4Rt7q5wlu

// juanes

const dbConnection = async() => {
  
    try {
    await mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('DB Online');
}
catch(error) {
    console.log(error);
    throw new Error('Erro2 al a hora dei niciar BD');
}

}

module.exports = {
    dbConnection
}