const Battle = require("../models/Battle");
const jwt = require("jsonwebtoken");

class battleController {
  static async newBattle(req, res) {
    const userF = req.body.userF;
    const userS = req.body.userS;

    Battle.createBattle(userF, userS, (err) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(201).json({ message: "Battle created successfully" });
      }
    });
  }
 
  static async battleEnding(req, res) {
    const id = req.body.id;
    console.log("end battle id :", id);

    Battle.endBattle(id)
      .then(() => {
        res.status(200).json({ message: "Battle ended successfully" });
      })
      .catch((err) => {
        console.error("Error ending battle:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
  static async getInProgress(req, res) {
    const userId = req.body.userId;
    console.log(userId);

    Battle.getInProgress(userId, (err) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res
          .status(201)
          .json({ message: "In progress battles sent successfully" });
      }
    });
  }
}

module.exports = battleController;
