const db = require('../utils/db-connection.js');

exports.guestContactUs = (req, res) => {
    const {email, subject, description} = req.body;

    if(email && subject && description ){
        db.query("SELECT * FROM contact_forms WHERE subject = '"+subject+"' AND description = '" + description +"'", (err, results) => {
            if(err){
                return res.render('index', {
                    guestContactUsMessage: "Failed to select contact forms names: " + err
                });
            }
            if(results.length === 0){
                db.query('INSERT INTO contact_forms SET ?', {submitted_by: email, subject: subject, description: description} , (error, result) => {
                    if(error){
                        return res.render('index',{
                            guestContactUsMessage: "Failed to submit contact form" + error
                        });
                    }else{
                        return res.render('index',{
                            guestContactUsMessage: "Contact form submitted successfully"
                        });
                    }
                });
            }else{
                return res.render('index', {
                    guestContactUsMessage: "Contact form already submitted"
                });
            }
        });
    }else{
        return res.render('index',{
            guestContactUsMessage: "Please fill in all the required fields"
        });
    }
};