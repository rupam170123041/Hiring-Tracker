$(document).ready(function(){
  showLogin();
  //showTable();
  //showDetails();
  //showForm();
});
var data = [
  {
    requestId: 1,
    projectName: "Proj-1",
    projectManager: "Man-1",
    resources:4,
    Designation:"d-1",
    status:"open",
    Pointofcontact:"HR-1",
    Hiringstatus:"completed",
    HRComments:"ok",
    Actions:"done"
  },
  {
    requestId: 2,
    projectName: "Proj-1",
    projectManager: "Man-1",
    resources:4,
    Designation:"d-1",
    status:"open",
    Pointofcontact:"HR-1",
    Hiringstatus:"completed",
    HRComments:"ok",
    Actions:"done"
  },
  {
    requestId: 3,
    projectName: "Proj-1",
    projectManager: "Man-1",
    resources:4,
    Designation:"d-1",
    status:"open",
    Pointofcontact:"HR-1",
    Hiringstatus:"completed",
    HRComments:"ok",
    Actions:"done"
  }
];
function editDetails(e){
    var $req = $(e.target);
    var reqId = $req.attr("id");
    console.log("request id: " +  reqId);

    //var reqObj = data.filter(o => o.requestId == reqId);
    //console.log({ details: reqObj });

    // Add a new row (details module) below the selected row in the table.

  };
function appendrow(){
  for(let i=0;i<data.length;i++)
  {
    var txt="<tr>";
    for(let j=0;j<Object.keys(data[i]).length-1;j++)
    {
      txt=txt+"<td>"+String(data[i][Object.keys(data[i])[j]])+"</td>";
    }
    txt=txt+'<td id="'+String(data[i]["requestId"])+'" class="edit-action"><i class="fa fa-bars" aria-hidden="true"></i></td>'
      txt=txt+"</tr>";
    $(".mytable tbody").append(txt);

  }
  $(".edit-action").click(editDetails);

};
function showLogin(){
  $(".container").hide();
  $(".login-container").show();
};
//function editDetails(e){
//	var $req = $(e.target);
//	var reqId = $req.attr("id");
//	console.log("request Id: " + reqId);
//};
function showTable(){
  $(".container").hide();
  appendrow();
  $(".table-container").show();
};
function showDetails(){
  $(".container").hide();
  $(".details-container").show();
};
function showForm(){
  $(".container").hide();
  $(".form-container").show();
};
function hideAll(){
  $(".container").hide();
};
function loginSubmit(e){
	var username = $('#username').val();
	var password = $('#password').val();

	if (username == 'admin-man' && password == 'admin-man') {
    e.preventDefault();
    showTable();
		sessionStorage.setItem("isManager", "true");
		sessionStorage.setItem("username", "admin-man");
		sessionStorage.setItem("password", "admin-man");
	}
	else if(username == 'admin-hr' && password == 'admin-hr'){
    e.preventDefault();
    showTable();
		sessionStorage.setItem("isHR", "true");
		sessionStorage.setItem("username", "admin-hr");
		sessionStorage.setItem("password", "admin-hr")
	}
  else {
    showLogin();
  }
};


function isLoggedIn(){
	return (sessionStorage.getItem("username") == "admin-man" && sessionStorage.getItem("password") == "admin-man") || (sessionStorage.getItem("username") == "admin-hr" && sessionStorage.getItem("password") == "admin-hr");
};

$(document).on('click', '#login', loginSubmit);

$(function(){
	if(isLoggedIn()){
		showTable();
	}
	else{
		showLogin();
	}
});
