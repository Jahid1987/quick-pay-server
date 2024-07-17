const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

async function getAllTransections(req, res) {
  try {
    const transections = await getDb()
      .collection("transections")
      .find()
      .toArray();
    if (!transections) {
      return res.status(404).send("transections not found");
    }
    res.status(200).send(transections);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function getTransections(req, res) {
  try {
    const email = req?.user?.email;
    const limit = parseInt(req?.query?.limit);
    const pipeline = [
      {
        $match: {
          $or: [{ sender: email }, { receiver: email }],
        },
      },
      {
        $project: {
          _id: 1,
          sendAmount: 1,
          minusAmount: 1,
          sender: 1,
          receiver: 1,
          transectionType: 1,
          status: 1,
          role: {
            $cond: [{ $eq: ["$sender", email] }, "sent", "received"],
          },
        },
      },
      {
        $limit: limit,
      },
    ];
    const transections = await getDb()
      .collection("transections")
      .aggregate(pipeline)
      .toArray();
    if (!transections || transections.length === 0) {
      return res.status(404).send("transections not found");
    }
    res.status(200).send(transections);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function createTransection(req, res) {
  try {
    const result = await getDb().collection("transections").insertOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
}

async function updateTransection(req, res) {
  console.log(req.body.status);
  try {
    const status = req.body.status;
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { status },
    };
    // await updateBalance(req, res);
    const result = await getDb()
      .collection("transections")
      .updateOne(filter, {
        $set: { status: "success" },
      });
    // update the balance
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
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updateBalance(req, res) {
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

module.exports = {
  updateTransection,
  updateBalance,
  cashOut,
  createTransection,
  getTransections,
  getAllTransections,
};
