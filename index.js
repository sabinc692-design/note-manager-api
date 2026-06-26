const express = require("express");
const dotenv=require("dotenv");
const logger=require("./middleware/logger");
const noteroute = require("./routes/noderoute");
dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(logger);

//feature
app.use("/api/notes",noteroute)


// Start Server
const PORT=process.env.PORT||4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});