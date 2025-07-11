const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
const gadgets = require("./data/earphones.json");

// GET endpoint with search & maxPrice filter
app.get("/api/earphones", (req, res) => {
  const { search, maxPrice } = req.query;
  let filtered = gadgets;

  if (search) {
    const keyword = search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );
  }

  if (maxPrice) {
    const max = parseInt(maxPrice);
    filtered = filtered.filter((item) => {
      const price = parseInt(item.price.replace(/\D/g, ""));
      return price <= max;
    });
  }

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
