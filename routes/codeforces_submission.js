const request = require('request');
const cheerio = require('cheerio');

var submissionFunc = function(username , callback) {
    console.log("Fetching codeforces submission details of "+username);

    var submission_data = {};
    var page_count;
    var solved = [];
    var todo = [];
    var A = [];
    var B = [];
    var C = [];
    var D = [];
    var E = [];
    var F = [];
    var G = [];
    var accepted = 0;
    var wa = 0;
    var compilation_error = 0;
    var runtime_error = 0;
    var hacked = 0;
    var tle = 0;
    var mem_lim_exceed = 0;
    var Problems_solved = 0;

    new Promise(function(resolve) {
        var url = "http://codeforces.com/submissions/"+username;

        request(url , function(err,res,body) {
            if(err) {
                callback({
                    error : err
                });
            }
            var $ = cheerio.load(body);
            page_count = $('div.pagination ul').children('li').eq(-2).text();
            if(page_count === "") {
                page_count = 1;
            }
            else {
                page_count = page_count.trim();
            }
            page_count = parseInt(page_count);
            resolve(page_count);
        });
    })
    .then(function(page_count){
        nextPage(1,page_count);
    },(err) => console.log(err))
    .catch((err) => console.log(err));

    function nextPage(page,page_limit){
        if(page > page_limit) {
            console.log("over");
            ended();
            return;
        }

        console.log("Page Number : "+page);
        var url = "http://codeforces.com/submissions/" + username + "/page/"+page;

        request(url , function(err,res,body) {
            var $ = cheerio.load(body);
            var rows = $("div.datatable").find('tr');
            for(var i = 0; i < rows.length ; ++i) {
                var current = rows[i];
                var q_name = $(current).children("td").eq(3).text().trim(); //960B Riu is cute
                var type = q_name.split(' ' , 1); 
                var verdict = $(current).children("td").eq(-3).text().trim();   //Accepted
                if(verdict.charAt(0)=='A') {
                    accepted++;
                    solved.push(q_name);
                    switch(type) {
                        case 'A' : A.push(q_name);
                        break;
                        case 'B' : B.push(q_name);
                        break;
                        case 'C' : C.push(q_name);
                        break;
                        case 'D' : D.push(q_name);
                        break;
                        case 'E' : E.push(q_name);
                        break;
                        case 'F' : F.push(q_name);
                        break;
                        default : G.push(q_name); 
                    }                    
                }
                else {
                    /*todo.push({
                        key : q_name,
                        value : question_link
                    });*/
                    if(solved.indexOf(q_name) == -1 && q_name!="") {
                        todo.push(q_name);
                    }                        
                    if(verdict.charAt(0)=='W'){
                        wa++;
                    }
                    else if(verdict.charAt(0)=='T'){
                        tle++;
                    }
                    else if(verdict.charAt(0)=='H'){
                        hacked++;
                    }
                    else if(verdict.charAt(0)=='C'){
                        compilation_error++;
                    }
                    else if(verdict.charAt(0)=='R'){
                        runtime_error++;
                    }
                    else{
                        ++mem_lim_exceed;
                    }
                }                              
            }
            nextPage(page + 1,page_limit);  
        });
    }

    function ended() {
        solved = Array.from(new Set(solved));
        todo = Array.from(new Set(todo));
        Problems_solved = solved.length;
        A_cnt = A.length;
        B_cnt = B.length;
        C_cnt = C.length;
        D_cnt = D.length;
        E_cnt = E.length;
        F_cnt = F.length;
        G_cnt = G.length;
        todo_cnt = todo.length;
        submission_data = {
            Problems_solved,            
            accepted,
            wa,
            tle,
            hacked,
            runtime_error,
            mem_lim_exceed,
            compilation_error,
            A_cnt , A,
            B_cnt , B, 
            C_cnt , C,
            D_cnt , D,
            E_cnt , E,
            F_cnt , F,
            G_cnt , G,
            todo_cnt , todo
        };
        return callback(null , submission_data);
    }
}

module.exports = {
    submissionFunc
};