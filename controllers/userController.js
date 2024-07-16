const { getDb } = require("../db/connection");

// reading single item
async function getUserByMobile(req, res) {
  try {
    const query = { mobile: req.params.mobile };
    const user = await getDb().collection("users").findOne(query);
    if (!user) {
      return res.status(404).send("user not found.");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getUserByMobile,
};
