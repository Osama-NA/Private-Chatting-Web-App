const pool = require("../utils/db-connection.js");

exports.contactForms = (req, res) => {
  pool.query("SELECT * FROM contact_forms", (error, rows) => {
    if(error) console.log("Failed to select from contact_forms: " + error);

    if (rows.length > 0) {
      let forms = "";
      Object.keys(rows).forEach((key) => {
        const subject = rows[key]["subject"];
        const description = rows[key]["description"];
        const email = rows[key]["submitted_by"];
        const id = rows[key]["formID"];
        
        const form = `<tr><td><div>` + email + `</div></td><td><div>` + subject + `</div></td><td><div>` + description +
          `</div></td><td id= 'delete-col'>` +  `<img src='/images/delete.png' alt='delete'><form action= '/db/delete-contact-form' method='post'>` +
          `<input type='submit' id= 'delete' name='id' value= '` + id + `' /></form></td>|</tr>`;

        forms += form;
      });
      return res.render("contact-forms", { contactForms: forms });
    } else {
      return res.render("contact-forms");
    }
  });
};
