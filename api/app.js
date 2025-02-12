const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", function (req, res) {
  res.send("hehehehe");
});

app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/admin", adminRouter);
app.use("/api/mainAdmin", mainAdminRouter);

app.listen(3000);
