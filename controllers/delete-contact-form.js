const db = require("../utils/db-connection.js");

exports.deleteContactForm = (req, res) => {
    let formID = req.body["id"];
    db.query(
      "DELETE FROM contact_forms WHERE formID = ?",
      [formID],
      (err, rows) => {
        if (err) return res.render("contact-forms", { contactFormsMessage: err });
        return res.redirect("/contact-forms");
      }
    );
};
