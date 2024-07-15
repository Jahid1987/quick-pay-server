const { getDb } = require("../db/connection");

async function sendMoney(req, res) {
  try {
    const { db } = await getDb();
    res.send({ message: "ok" });
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
