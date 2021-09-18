const pool = require("../utils/db-connection.js");

exports.bugNotSolved = (req, res) => {
  const isSolved = "No";
  const id = req.body["bug-id"];
  
  pool.query("UPDATE bug_Reports SET solved = '" + isSolved + "' WHERE bugID = ?",
    [id], (error) => {
      if (error) return res.render("bug-reports", { bugSolvedMessage: error });
      return res.redirect("/bug-reports");
    }
  );
};
