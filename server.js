// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Example Malaysian food data
const foods = [
  {
    name: "Nasi Lemak",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Nasi_Lemak.jpg",
    rating: 5,
    description: "Fragrant coconut rice served with sambal, fried anchovies, peanuts, boiled egg, and cucumber."
  },
  {
    name: "Char Kway Teow",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Char_kway_teow_served_on_banana_leaf.jpg",
    rating: 4,
    description: "Flat rice noodles stir-fried with prawns, egg, bean sprouts, and Chinese sausage."
  },
  {
    name: "Roti Canai",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Roti_canai.jpg",
    rating: 4,
    description: "Flaky and crispy flatbread served with dhal or curry."
  },
  {
    name: "Satay",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Malaysian_Satay.jpg",
    rating: 5,
    description: "Skewered and grilled meat served with peanut sauce."
  }
];

// API route
app.get('/api/foods', (req, res) => {
  res.json(foods);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/api/foods`);
});
