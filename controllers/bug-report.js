const db = require('../db-connection.js');

exports.bugReport = (req,res) => {
    const bugName = req.body['bug-name'];
    const bugDescription = req.body['bug-description'];
    const from = req.body['from'];
    const solved = 'No';

    if(bugName !== "" && bugDescription !== ""){
        db.query("SELECT * FROM bug_reports WHERE bug_description = ?" , [bugDescription] , (err, results) => {
            if(err){
                return res.render(from, {
                    bugReportMessage: "Failed to select bug names: " + error
                });
            }
            if(results.length === 0){
                db.query('INSERT INTO bug_reports SET ?', {bug_name: bugName, bug_description: bugDescription, solved: solved} , (error, results) => {
                    if(error){
                        return res.render(from, {
                            bugReportMessage: "Failed to report a bug: " + error
                        });
                    }else{
                        return res.render(from, {
                            bugReportMessage: "Bug reported successfully"
                        });
                    }
                });
            }else{
                return res.render(from, {
                    bugReportMessage: "Bug report already submitted"
                });
            }
        });
    }else{
        return res.render(from, {
            bugReportMessage: "Please fill in all the required fields"
        });
    }
};