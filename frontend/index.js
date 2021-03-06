$(document).ready(function(){
  showLogin();
  //showTable();
  //showDetails();
  //showForm();
});
var reqObj;
var data=[];
//= [
//  {
//    requestId: 1,
//    projectName: "Project-1",
//    projectManager: "Man-1",
//    resources:4,
//    Designation:"d-1",
//    status:"open",
//    Pointofcontact:"HR-1",
//    Hiringstatus:"completed",
//    HRComments:"ok",
//    Actions:"done"
//  },
//  {
//    requestId: 2,
//    projectName: "Project-2",
//    projectManager: "Man-2",
//    resources:6,
//    Designation:"d-2",
//    status:"open",
//    Pointofcontact:"HR-1",
//    Hiringstatus:"completed",
//    HRComments:"no comments",
//    Actions:"done"
//  },
//  {
//    requestId: 3,
//    projectName: "Project-3",
//    projectManager: "Man-3",
//    resources:13,
//    Designation:"d-3",
//    status:"open",
//    Pointofcontact:"HR-1",
//    Hiringstatus:"completed",
//    HRComments:"ok",
//    Actions:"done"
//  }
//];

function showFormprefill(){
  $(".module").hide();
  $(".form-container").show();
  $("#inputProject").val(reqObj[0].projectName);
  $("#inputManager").val(reqObj[0].projectManager);
}
function editDetails(e){

    var $td = $(e.target).closest('td');
    var reqId = $td.attr("id");
    handleIcons($td);
    var trnew="<tr ><td id='new' colspan='10'>"+$(".details-container").html()+"</td></tr>";
    $(trnew).insertAfter($td.closest('tr'));
    $td.find('i.close-action').click(function(){$("#new").closest('td').closest('tr').remove();$td.find('i.close-action').hide();$td.find('i.edit-action').show();});
     reqObj = data.filter(o => o.requestId == reqId);
    $("#Projectname").html(reqObj[0].projectName);
    $("#Manager").html(reqObj[0].projectManager);
    $("#Resources").html(reqObj[0].resources);
    $("#Designation").html(reqObj[0].Designation);
    $("#edit").click(showFormprefill);
    // Add a new row (details module) below the selected row in the table.

  };
function handleIcons($td) {
  if($("#" + "new").length != 0) {
  $("#new").closest('td').closest('tr').remove();
};
    var $table = $td.closest('table')
    $table.find('i.edit-action').show();
    $table.find('i.close-action').hide();

    $td.find('i.close-action').show();
    $td.find('i.edit-action').hide();
  }
function appendrow(){
  for(let i=0;i<data.length;i++)
  {
    var txt="<tr>";
    txt=txt+"<td>"+String(data[i]['requestId'])+"</td>";
    txt=txt+"<td>"+String(data[i]['projectname'])+"</td>";
    txt=txt+"<td>"+String(data[i]['projectmanager'])+"</td>";
    txt=txt+"<td>"+String(data[i]['resources'])+"</td>";
    txt=txt+"<td>"+String(data[i]['designation'])+"</td>";
    txt=txt+"<td>"+String(data[i]['status'])+"</td>";
    txt=txt+"<td>"+String(data[i]['poc'])+"</td>";
    txt=txt+"<td>"+String(data[i]['hiring_status'])+"</td>";
    txt=txt+"<td>"+String(data[i]['hr_comments'])+"</td>";
    txt=txt+'<td id="'+String(data[i]["requestId"])+'"><i class="fa fa-bars edit-action" aria-hidden="true"></i><i class="fa fa-times close-action" aria-hidden="true"></i></td>'
      txt=txt+"</tr>";
    $(".mytable tbody").append(txt);
  }
  $(".mytable tbody").find('td i.close-action').hide();
  $(".mytable tbody").find('td i.edit-action').click(editDetails);
};
function showLogin(){
  $(".module").hide();
  $(".login-container").show();
};

function showTable(){
  $(".module").hide();
  appendrow();
  $(".table-container").show();
};
function showDetails(){
  $(".module").hide();
  $(".details-container").show();
};
function showForm(){
  $(".module").hide();
  $(".form-container").show();
};
function hideAll(){
  $(".module").hide();
};
function loginSubmit(e){
	var username = $('#username').val();
	var password = $('#password').val();
  var validated = authenticate({"username": username,"password":password});

	if (validated) {
    e.preventDefault();
    showTable();
		sessionStorage.setItem("isManager", "true");
		sessionStorage.setItem("username", "admin-man");
		sessionStorage.setItem("password", "admin-man");
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
$(document).on('click', '#new-request', showForm);
function authenticate(data){
   var result;
  $.ajax({
      "url": "http://localhost:3000/api/authenticate",
      "method": "POST",
      "timeout": 0,
      "async":false,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    })
    .done(function (response) {
      console.log(response);
      result=response.status=='success';
    });
    return result;
};
authenticate({"username":"admin-man","password":"admin-man"});
//function addRequest(data){
//  $.ajax({
//      "url": "http://localhost:3000/api/addRequest",
//      "method": "POST",
//      "timeout": 0,
//      "headers": {
//        "Content-Type": "application/json"
//      },
//      "data": JSON.stringify(data),
//    })
//    .done(function (response) {
//      console.log(response);
//    });
//}
//addRequest({"projectname":"Proj-1","projectmanager":"Man-2232"});

function getRequests(){
  $.ajax({
      "url": "http://localhost:3000/api/getRequestDetails",
      "method": "GET",
      "async":false,
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
    })
    .done(function (response) {
      data = response.result;
      console.log(data);
    });
}
getRequests();

//function updateRequests(data){
//  $.ajax({
//      "url": "http://localhost:3000/api/updateRequest",
//      "method": "PUT",
//      "timeout": 0,
//      "headers": {
//        "Content-Type": "application/json"
//      },
//      "data": JSON.stringify(data),
//    })
//    .done(function (response) {
//      console.log(response);
//    });
//}
//updateRequests({"requestId": "3", "projectname": "Proj-1" ,"projectmanager": "Man-333"});
