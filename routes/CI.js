/*module.exports = {
    getPass:(request,response) => {
        let query = "SELECT `emp_no` ,`request_id`, `request`, `description`, `remark_1` FROM `protection`"; // query database to get all the players
            // execute query
            console.log("hellooooo");
            connection.query(query, (err, result) => {
                    if (err) {
                            response.redirect('/');
                    }
                    //console.log(result);
                    else{
                    response.render('three.ejs', {
                        data: result

                    });
                }
            });
            },
    byPass:(request,response) => {
        var id=request.body.id;
        let query="UPDATE `protection` SET `status`=? WHERE `request_id`= ?";
        let val=[2,id];
        connection.query(query, val,(err, result) => {
            if (err) {
                    response.redirect('/');
            }
            else{
            response.redirect('/');
        }
    });
    }
    };*/