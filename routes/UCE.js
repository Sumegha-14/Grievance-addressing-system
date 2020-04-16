module.exports = {
	addProtection:(request,response) => {
		var request1 = request.body.request1;
	  var description = request.body.description;
		var remarks = request.body.remarks;
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
	   if (request1 && description && request.session.username ) {
			let query = "INSERT INTO `protection` (request, description, remark_1,date,emp_no) VALUES ('" +request1 + "', '" + description + "', '" + remarks + "', '" + today + "', '" + request.session.username + "')";
			connection.query(query, (err, result) => {
				if (err) console.log(err);
				else{
		    response.render('one.ejs',{
			  message:'Request submitted on ' + today
		    });
			}
     });
}
else{
	response.redirect('/');

}
	},
	saveProtection:(request,response) => {
		var request1 = request.body.request1;
	  var description = request.body.description;
		var remarks = request.body.remarks;
		var t_date=request.body.t_date;
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
	   if (request1 && description && request.session.username) {
			let query = "INSERT INTO `emp_save` (request, description, remarks,date,emp_no,t_date) VALUES ('" +request1 + "', '" + description + "', '" + remarks + "', '" + today + "', '" + request.session.username + "', '" + t_date + "')";
			connection.query(query, (err, result) => {
				if (err) console.log(err);
				else{	
		    response.render('one.ejs',{
			  message:'Request Saved on ' + today
		    });
			}
		 });
		}
		 /*let query1="SELECT `t_date` FROM `emp_save`";
			var today_date=new Date();
			connection.query(query1, (err, result) => {
				if (err) {
					console.log("not");
				}
			console.log(result.t_date);
			var i;
			for(i=0;i<result.length;i++){
        if((result[i].t_date)==today_date){
					console.log("verified");
				}
			}
});*/
},

getSaved: (request, response) => {
		let query = "SELECT `emp_no`,`request_id`, `request`, `description`, `remarks` FROM `emp_save` where `emp_no`=?"; // query database to get all the players
		// execute query
		let val=[request.session.username];
		connection.query(query,val, (err, result) => {
				if (err) {
						response.redirect('/');
				}
				console.log(result);
				response.render('saved.ejs', {
					data: result
				});
		});
},
getStatus: (request,response) => {
	let query = "SELECT `emp_no`,`request_id`, `request`, `description`, `remark_1`,`date`,`final_date`,`status` FROM `protection` WHERE  `status`<= ? AND emp_no=?"; // query database to get all the players
		// execute query
		let val=[5,request.session.username];
		connection.query(query,val, (err, result) => {
				if (err) {
						response.redirect('/');
				}
				response.render('status.ejs', {
					data: result
				});
		});
},
//
getStatusSce: (request,response) => {
	let query = "SELECT `emp_no`,`request_id`, `request`, `description`, `remark_1`,`date`,`final_date`,`status` FROM `protection` WHERE  `status`<= ?"; // query database to get all the players
		// execute query
		let val=[5];
		connection.query(query,val, (err, result) => {
				if (err) {
						response.redirect('/');
				}
				response.render('scestatus.ejs', {
					data: result
				});
		});
},
//
getStatusCi: (request,response) => {
	let query = "SELECT `emp_no`,`request_id`, `request`, `description`, `remark_1`,`date`,`final_date`,`status` FROM `protection` WHERE  `status`<= ?"; // query database to get all the players
		// execute query
		let val=[5];
		connection.query(query,val, (err, result) => {
				if (err) {
						response.redirect('/');
				}
				response.render('cistatus.ejs', {
					data: result
				});
		});
},
//
getStatusHodp: (request,response) => {
	let query = "SELECT `emp_no`,`request_id`, `request`, `description`, `remark_1`,`date`,`final_date`,`status` FROM `protection` WHERE  `status`<= ?"; // query database to get all the players
		// execute query
		let val=[5];
		connection.query(query,val, (err, result) => {
				if (err) {
						response.redirect('/');
				}
				response.render('hodstatus.ejs', {
					data: result
				});
		});
},
addData:(request,response) => {
	var emp_no=request.body.emp_no;
	var request1 = request.body.request1;
	var description = request.body.description;
	var remarks = request.body.remarks;
	var id=request.body.id;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); 
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
 if (request1 && description && request.session.username ) {
			let query = "INSERT INTO `protection` (request, description, remark_1,date,emp_no) VALUES ('" +request1 + "', '" + description + "', '" + remarks + "', '" + today + "', '" + emp_no+ "')";
			connection.query(query, (err, result) => {
					if (err) console.log(err);
					else{
						let query1="DELETE FROM `emp_save` WHERE request_id="+id;
						connection.query(query1, (err, result) => {
							if (err) console.log(err);
						});
					
			response.redirect('/saved');
			}
});
}
else{
response.redirect('/');
}
},
};
