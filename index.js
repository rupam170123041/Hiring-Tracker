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
    HRComments:"no comments",
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

    var $td = $(e.target).closest('td');
    var reqId = $td.attr("id");
    handleIcons($td);
    var trnew="<tr ><td id='new' colspan='10'>"+$(".details-container").html()+"</td></tr>";
    $(trnew).insertAfter($td.closest('tr'));
    $td.find('i.close-action').click(function(){$("#new").closest('td').closest('tr').remove();$td.find('i.close-action').hide();$td.find('i.edit-action').show();});
    var reqObj = data.filter(o => o.requestId == reqId);
    console.log({ details: reqObj });

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
    for(let j=0;j<Object.keys(data[i]).length-1;j++)
    {
      txt=txt+"<td>"+String(data[i][Object.keys(data[i])[j]])+"</td>";
    }
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
$(document).on('click', '#new-request', showForm);
