const pool = require("../utils/db-connection.js");

exports.deleteContactForm = (req, res) => {
    let formID = req.body["id"];
    pool.query("DELETE FROM contact_forms WHERE formID = ?", [formID], (error) => {
        if (error) return res.render("contact-forms", { contactFormsMessage: error });
        return res.redirect("/contact-forms");
      }
    );
};
