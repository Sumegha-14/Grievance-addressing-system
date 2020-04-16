module.exports = {
getSce:(request,response) => {
	let query = "SELECT `emp_no` ,`request_id`, `request`, `description`, `remark_1` FROM `protection`WHERE `status`="+0; // query database to get all the players
		// execute query
		connection.query(query, (err, result) => {
				if (err) {
						response.redirect('/');
				}
                //console.log(result);
                
				response.render('two.ejs', {
					data: result
				});
        });
        },
accept:(request,response) => {
    console.log(request.session.username);
    var id=request.body.id;
    var date1=request.body.date1;
    let query="UPDATE `protection` SET `status`=?  WHERE `request_id`= ?";
    let val=[1,id];
    connection.query(query, val,(err, result) => {
        if (err) {
                response.redirect('/');
        }
        else{
            var today = new Date(date1);
		        var dd = today.getDate();
		        var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
        if(dd<10) 
            {
        dd='0'+dd;
            } 
        if(mm<10) 
        {
        mm='0'+mm;
        } 
     today1 = yyyy+'-'+mm+'-'+dd;
                    let query1="UPDATE `protection` SET `final_date`=? WHERE `request_id`= ?";
                    val1 = [today1,id];
                    connection.query(query1,val1, (err, result) => {
                        if (err) console.log(err);
                        console.log(today);
                    });
                response.redirect('/two');
    }
});
},
getbypass:(request,response) => {
    let query = "SELECT `emp_no` ,`request_id`, `request`, `description`, `remark_1` FROM `protection` WHERE `status`="+1; // query database to get all the players
        // execute query
        connection.query(query, (err, result) => {
                if (err) {
                        response.redirect('/');
                }
                else{
                response.render('three.ejs', {
                    data: result

                });
            }
        });
        },
        bypass:(request,response) => {
            var id=request.body.id;
            let query="UPDATE `protection` SET `status`=? WHERE `request_id`= ?";
            let val=[2,id];
            connection.query(query, val,(err, result) => {
                if (err) {
                        response.redirect('/');
                }
                else{
                    var today = new Date();
		        var dd = today.getDate();
		        var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
        if(dd<10) 
            {
        dd='0'+dd;
            } 
        if(mm<10) 
        {
        mm='0'+mm;
        } 
     today = yyyy+'-'+mm+'-'+dd;
                    let query1="UPDATE `protection` SET `Bypassdate`=? WHERE `request_id`= ?";
                    val1 = [today,id];
                    connection.query(query1,val1, (err, result) => {
                        if (err) console.log(err);
                        console.log(today);
                    });
                response.redirect('/normalize');
            }
        });
        },
        getnormalize:(request,response) => {
            let query = "SELECT `emp_no` ,`request_id`, `request`, `description`, `remark_1` FROM `protection` WHERE `status`="+2; // query database to get all the players
                // execute query
                connection.query(query, (err, result) => {
                        if (err) {
                                response.redirect('/');
                        }
                        else{
                        response.render('normalize.ejs', {
                            data: result
        
                        });
                    }
                });
                },
        
        normalize:(request,response) => {
            var id=request.body.id;
            let query="UPDATE `protection` SET `status`=? WHERE `request_id`= ? ";
            let val=[3,id];
            connection.query(query, val,(err, result) => {
                if (err) {
                        response.redirect('/');
                }
                else{
                response.redirect('/normalize');
            }
        });
        },
        getverify:(request,response) => {
            let query = "SELECT `emp_no` ,`request_id`, `request`, `description`, `remark_1` FROM `protection` WHERE `status`="+3; // query database to get all the players
                // execute query
                connection.query(query, (err, result) => {
                        if (err) {
                                response.redirect('/');
                        }
                        else{
                        response.render('verify.ejs', {
                            data: result
        
                        });
                    }
                });
                },
        
        verify:(request,response) => {
            var id=request.body.id;
            let query="UPDATE `protection` SET `status`=? WHERE `request_id`= ? ";
            let val=[4,id];
            connection.query(query, val,(err, result) => {
                if (err) {
                        response.redirect('/');
                }
                else{
                response.redirect('/verify');
            }
        });
        },
        
        getHod:(request,response) => {
            let query = "SELECT `emp_no` ,`request_id`, `request`, `description`, `Bypassdate`,`remark_1`,`date` FROM `protection` WHERE `status`="+4; // query database to get all the players
                // execute query
                connection.query(query, (err, result) => {
                        if (err) {
                                response.redirect('/');
                        }
                        response.render('four.ejs', {
                            data: result
                        });
                });
                },
                yes:(request,response) => {
                    var id=request.body.id;
                    var id=request.body.id;
                    let query="UPDATE `protection` SET `status`=? WHERE `request_id`= ?";
                    let val=[5,id];
                    connection.query(query, val,(err, result) => {
                        if (err) {
                                response.redirect('/');
                        }
                        else{
                        response.redirect('/four');
                    }
                });
                },
                resolve:(request,response) => {
                    
                    let query="UPDATE `protection` SET `status`=? WHERE `request_id`= ?";
                    let val=[6,id];
                    connection.query(query, val,(err, result) => {
                        if (err) {
                                response.redirect('/');
                        }
                        else{
                        response.redirect('/');
                    }
                });
                },                
            };