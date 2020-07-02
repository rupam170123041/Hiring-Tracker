$(document).ready(function(){
//  $(".container").hide();
//  $(".login-container").show();
//  $(".table-container").show();
  appendrow();
})
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
  }
];
function appendrow(){
  for(let i=0;i<data.length;i++)
  {
    var txt="<tr>";
    for(let j=0;j<Object.keys(data[i]).length;j++)
    txt=txt+"<td>"+String(data[i][Object.keys(data[i])[j]])+"</td>";
    txt=txt+"</tr>";
    $(".mytable tbody").append(txt);
  }
}
