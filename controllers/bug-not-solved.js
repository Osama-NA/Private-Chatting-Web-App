const db = require("../utils/db-connection.js");

exports.bugNotSolved = (req, res) => {
  const isSolved = "No";
  const id = req.body["bug-id"];
  db.query(
    "UPDATE bug_Reports SET solved = '" + isSolved + "' WHERE bugID = ?",
    [id],
    (err, results) => {
      if (err) return res.render("bug-reports", { bugSolvedMessage: err });
      return res.redirect("/bug-reports");
    }
  );
};
