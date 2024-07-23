const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = process.env.PORT || 8080; 

app.use(cors());  

mongoose.connect(process.env.MONGODB_CONNECTION , {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json());
app.use('/doctors', doctorRoutes); 
app.use('/patient', patientRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});