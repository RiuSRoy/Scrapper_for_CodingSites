var submission = require('./spoj_submission');

exports.spojFunc = function(username1,username2 , callback) {
    console.log("Comparing "+username1 + " with " + username2);
    data = {};
    submission.submissionFunc(username1,username2 , (err,submission_data) =>{
        if(err) {
            console.log(err);
            return err;
        }
        data = {
            submission_data
        }
        return callback(null , data);
    });
}