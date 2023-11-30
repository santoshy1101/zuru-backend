const express = require("express");
const { connectToDb } = require("./db");
const cors = require("cors"); 
const projectRoutes = require("./project.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/project", projectRoutes);
app.use("/", (req,res)=>{
res.send("App is Running")
});

// Start the server
const PORT = process.env.PORT || 3000;

const startServer = () =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

connectToDb(startServer);
