const db = require("../utils/db-connection.js");

exports.bugSolved = (req, res) => {
  const isSolved = "Yes";
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
