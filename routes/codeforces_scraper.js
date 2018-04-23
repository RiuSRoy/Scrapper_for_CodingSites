var submission = require('./codeforces_submission');

exports.codeforcesFunc = function(username , callback) {
    console.log("Hey "+username);
    data = {};
    submission.submissionFunc(username , (err,submission_data) =>{
        if(err) {
            console.log(err);
            return err;
        }
        data = {
            submission_data
        }
        return callback(null , data);
    })
}