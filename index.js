//dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();

//routes
const empleado = require('./routes/empleado')
const user = require('./routes/user');

//middleware
const cors = require('./middleware/cors');
const auth = require('./middleware/auth');
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",index);
app.use("/user",user);
app.use(auth);
app.use("/consulta",empleado)
app.use(notFound);



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});
