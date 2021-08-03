const db = require("../utils/db-connection.js");

exports.reportedBugs = (req, res) => {
  db.query("SELECT * FROM bug_reports", (err, rows) => {
    if (rows.length > 0) {
      let reports = "";

      Object.keys(rows).forEach((key) => {
        const bugDescription = rows[key]["bug_description"];
        const bugName = rows[key]["bug_name"];
        const id = rows[key]["bugID"];
        const solved = rows[key]["solved"];

        let report = `<tr><td><div>` + bugName +
          `</div></td><td><div>` + bugDescription +
          `</div></td><td><div>` + solved + `</div></td>`;

        if (solved === "No") {
          report +=
            `<td class= 'col1'><img src='images/solved.png' alt='delete'><form action='/db/bug-solved' method='post'><input type='submit' class= 'solve' name='bug-id' value= '` +
            id +
            `' /></form></td>|</tr>`;
        } else {
          report +=
            `<td class= 'col2'><img src='images/delete.png' alt='delete'><form action='/db/bug-not-solved' method='post'><input type='submit' class= 'solve' name='bug-id' value= '` +
            id +
            `' /></form></td>|</tr>`;
        }

        reports += report;
      });

      res.render("bug-reports", { reports: reports });
    } else {
      return res.render("bug-reports");
    }
  });
};