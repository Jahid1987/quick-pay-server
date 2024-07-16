const { getDb } = require("../db/connection");

async function sendMoney(req, res) {
  try {
    const { sender, receiver, sendAmount, minusAmount } = req.body;
    const result = await getDb().collection("transections").insertOne(req.body);

    await getDb()
      .collection("users")
      .updateOne(
        { email: sender },
        {
          $inc: {
            amount: -minusAmount,
          },
        }
      );
    await getDb()
      .collection("users")
      .updateOne(
        { email: receiver },
        {
          $inc: {
            amount: sendAmount,
          },
        }
      );

    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
}
async function cashOut(req, res) {
  try {
    const { db } = await getDb();
    res.send({ message: "ok" });
  } catch (error) {
    res.send(error);
  }
}

module.exports = { sendMoney, cashOut };
