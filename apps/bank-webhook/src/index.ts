import express from "express";
// import db from "@repo/db"

const app = express();
const PORT = 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to bank webhook server of digiwallet"
  });
});

app.post("/hdfcwebhook", (req, res) => {
  const {token, user_id, amount} = req.body;
  const paymentInfo = {
    token: token,
    userId: user_id,
    amount: amount
  }
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${PORT}`);
});