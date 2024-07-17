const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");
// reading all users
async function getAllUsers(req, res) {
  try {
    const user = await getDb().collection("users").find().toArray();
    if (!user) {
      return res.status(404).send("user not found.");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// reading single item
async function getUserByMobile(req, res) {
  try {
    const query = { mobile: req.params.mobile };
    console.log(query);
    const user = await getDb().collection("users").findOne(query);
    if (!user) {
      return res.status(404).send("user not found.");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function updateUser(req, res) {
  try {
    const { _id, role } = req.body;
    const filter = { _id: new ObjectId(_id) };
    let updateDoc = {};
    if (role === "user") {
      updateDoc = {
        $set: {
          status: "accepted",
          balance: 40,
        },
      };
    }
    if (role === "agent" || role === "marchent") {
      updateDoc = {
        $set: {
          status: "accepted",
          balance: 10000,
        },
      };
    }
    // await updateBalance(req, res);
    const result = await getDb()
      .collection("users")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
module.exports = {
  getUserByMobile,
  getAllUsers,
  updateUser,
};
