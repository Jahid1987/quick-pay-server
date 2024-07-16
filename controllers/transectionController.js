const { getDb } = require("../db/connection");

async function createTransection(req, res) {
  try {
    const result = await getDb().collection("transections").insertOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
}

async function sendMoney(req, res) {
  try {
    const { sender, receiver, sendAmount, minusAmount } = req.body;
    await getDb()
      .collection("users")
      .updateOne(
        { email: sender },
        {
          $inc: {
            balance: -minusAmount,
          },
        }
      );
    await getDb()
      .collection("users")
      .updateOne(
        { email: receiver },
        {
          $inc: {
            balance: sendAmount,
          },
        }
      );

    res.status(200).send({ update: true });
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

module.exports = { sendMoney, cashOut, createTransection };
