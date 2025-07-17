const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orders");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", orderRoutes);

app.get("/", (req, res) => res.send("Cafe Order API running"));

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
