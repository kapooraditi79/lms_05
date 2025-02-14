import express from 'express'
import mongoose from 'mongoose'
const app = express();


const MongoURL="mongodb://127.0.0.1:27017"
const PORT=3000;

app.get("/", (req, res)=>{
  res.send("hehehehe");
});

// app.use("/api/student", studentRouter);
// app.use("/api/teacher", teacherRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/mainAdmin", mainAdminRouter);


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