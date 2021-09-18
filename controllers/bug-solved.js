const pool = require("../utils/db-connection.js");

exports.bugSolved = (req, res) => {
  const isSolved = "Yes";
  const id = req.body["bug-id"];

  pool.query("UPDATE bug_Reports SET solved = '" + isSolved + "' WHERE bugID = ?",
    [id], (error) => {
      if (error) return res.render("bug-reports", { bugSolvedMessage: err });
      return res.redirect("/bug-reports");
    }
  );
};
