
const request = require('request');
const cheerio = require('cheerio');

exports.submissionFunc = function(username1,username2,callback) {
    var solved1 = [];
    var solved2 = [];
    console.log("Fetching details of " + username1 +" and "+username2);
    new Promise(function(resolve) {
        var url1 = "http://www.spoj.com/users/"+username1;

        request(url1,(err ,resp,body) => {
            if(err) {
                callback({
                    error : err
                });
            }
            var $ = cheerio.load(body);
            var rows = $('table.table.table-condensed').find('tr');
            for(var i = 0; i < rows.length ; ++i) {
                var cur_row = rows[i];
                var columns = $(cur_row).find('td');
                for(var j = 0;j < columns.length ; ++j) {
                    var cur_ele = columns[j];
                    var prob = $(cur_ele).text().trim();
                    if(prob!="")
                        solved1.push(prob);
                }
            }
            resolve(solved1);
        });
    })
    .then(function(solved1){
        var url2 = "http://www.spoj.com/users/"+username2;

        request(url2,(err ,resp,body) => {
            if(err) {
                callback({
                    error : err
                });
            }
            var $ = cheerio.load(body);
            var rows = $('table.table.table-condensed').find('tr');
            for(var i = 0; i < rows.length ; ++i) {
                var cur_row = rows[i];
                var columns = $(cur_row).find('td');
                for(var j = 0;j < columns.length ; ++j) {
                    var cur_ele = columns[j];
                    var prob = $(cur_ele).text().trim();
                    if(prob!="")
                        solved2.push(prob);
                }
            }
            var User1 = username1;
            var Count_of_problems_solved_1 = solved1.length;
            var User2 = username2;
            var Count_of_problems_solved_2 = solved2.length;
            solved1.sort();
            solved2.sort();
            var unique_solved_1 = [];
            var unique_solved_2 = [];
            for(var i = 0 , j = 0;i < solved1.length && j < solved2.length;) {
                if(solved1[i] < solved2[j]) {
                    var link = "http://www.spoj.com/problems/"+solved1[i];
                    unique_solved_1.push(link);
                    ++i;
                }
                else if(solved1[i] > solved2[j]) {
                    unique_solved_2.push(solved2[j]);
                    ++j;
                }
                else {
                    ++i;
                    ++j;
                }
            }
            var Count_of_unique_problems_solved_1 = unique_solved_1.length;
            var Count_of_unique_problems_solved_2 = unique_solved_2.length;
            var spoj = {
                User1,
                Count_of_problems_solved_1,
                Count_of_unique_problems_solved_1,
                unique_solved_1,
                User2,
                Count_of_problems_solved_2,
                Count_of_unique_problems_solved_2,
                unique_solved_2
            }
            return callback(null , spoj);
        });
    },(err) => console.log(err))
    .catch((err) => console.log(err));

    
}