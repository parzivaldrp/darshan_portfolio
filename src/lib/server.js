import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../lib/connectDB';
import addProject from '../app/api/addProject/route';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(proccess.env.MONGOURI);

app.use(bodyParser.json());

app.use('/api', addProject);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})