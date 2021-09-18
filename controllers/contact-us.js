const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");

exports.contactUs = (req, res) => {
  const { subject, description } = req.body;
  const email = userInfo.getItem("email");

  if (email && subject && description) {
    pool.query("SELECT * FROM contact_forms WHERE subject = '" + subject + "' AND description = '"
      + description + "' AND submitted_by = '" + email + "'", (error, results) => {
        if (error) {
          return res.render("contact-index", {
            contactUsMessage: "Failed to select contact forms names: " + err,
          });
        }

        if (results.length === 0) {
          pool.query("INSERT INTO contact_forms SET ?",
            { submitted_by: email, subject: subject, description: description },
            (error) => {
              if (error) {
                return res.render("contact-index", {
                  contactUsMessage:
                    "Failed to submit contact form" + error,
                });
              } else {
                return res.render("contact-index", {
                  contactUsMessage: "Contact form submitted successfully",
                });
              }
            }
          );
        } else {
          return res.render("contact-index", {
            contactUsMessage: "Contact form already submitted",
          });
        }
      }
    );
  } else {
    return res.render("contact-index", {
      contactUsMessage: "Please fill in all the required fields",
    });
  }
};