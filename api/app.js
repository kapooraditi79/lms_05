import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import methodOverride from 'method-override'
import studentRoute from './routes/studentRouter.js'
import classRoute from './routes/classRouter.js'
import parentRoute from './routes/parentRouter.js'

dotenv.config();
const app = express();
const MongoURL="mongodb://127.0.0.1:27017"
const PORT=3000;

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


app.use('/api/student',studentRoute)
app.use('/api/class',classRoute)
app.use('/api/parent',parentRoute)

app.get("/", (req, res)=>{
  res.send("hehehehe");
});
mongoose
  .connect(MongoURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });