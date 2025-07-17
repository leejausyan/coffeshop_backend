const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get menu
router.get("/menu", async (req, res) => {
  const result = await pool.query("SELECT * FROM menu");
  res.json(result.rows);
});

// Submit order
router.post("/order", async (req, res) => {
  const { name, table_number, items, payment_method } = req.body;
  const result = await pool.query(
    "INSERT INTO orders(name, table_number, items, payment_method, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [name, table_number, items, payment_method, "pending"]
  );
  res.json(result.rows[0]);
});

// Get all orders
router.get("/orders", async (req, res) => {
  const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
  res.json(result.rows);
});

// Update order status
router.patch("/orders/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
