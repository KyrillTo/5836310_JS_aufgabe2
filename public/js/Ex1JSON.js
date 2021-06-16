"use strict";   


document.getElementsByTagName("BODY")[0].onload = Init;



function Init ()
{

var jsonstring = ' { "Menschen" : [' +
  ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  },'+
  ' { "Vorname" : "Kyrill", "Nachname" :"Toporkov", "Gender": "male", "Rolle" : "Student"  }' +
  ' ] }';

window.Menschen = JSON.parse(jsonstring);

document.getElementById('PullupServices').addEventListener("click", dothisnow);


 }



function dothisnow()
  {
    console.log("Pull up"); 
    var pull = document.getElementById('PullupOptions'); 

    pull.style.top = document.getElementById('scrollpart').offsetTop + "px";
    pull.style.display = "block";

    document.getElementById('PullupOptionsBtn').addEventListener("click", () => {
      pull.style.display = "none";
    })

    document.getElementById('popupli1').addEventListener("click", ()=>{
      document.getElementById('showwindow').style.display = "block";
      showMenschen();
    })

    document.getElementById('showwindowbtn').addEventListener("click", ()=>{
      document.getElementById('showwindow').style.display = "none";
    })

    document.getElementById('seachButton').addEventListener("click", ()=>{
      let searchInput = document.getElementById('wikiSearchInput').value;

      console.log(searchInput);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
          // console.log(this.responseText);
          showData(this.responseText);
        }
      };
      xhttp.open("GET", "http://localhost:6001/proxy/?https://de.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpslimit=4&format=json&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&gpssearch=" + searchInput, true);
      xhttp.send();

      showData();
    })
  }


  function showData(data){


    console.log(JSON.parse(data).response.query.pages);

    var dataPages = JSON.parse(data).response.query.pages;

    var tableheader = "<table> <tr>"; // this is the table header .. just take it
    tableheader += "<th>Search Argument</th><th>Description</th><th>Extract</th><th>Link</th></tr>";


    var tabletext = "";

    for (var key in dataPages){
      if (dataPages.hasOwnProperty(key)){

        console.log(dataPages[key]);

        var link = "https://de.wikipedia.org/?curid=" + dataPages[key].pageid;

        tabletext += "<tr><td>" + dataPages[key].title + "</td><td>" + dataPages[key].description  + "</td><td>" + dataPages[key].extract  + "</td><td>" + "<a href=" + link + ">" + link +  "</a>"  + "</td></tr>";
      
      }
    }


    var tableclosing = "</table>"; // the table end just take it
    var fulltext = tableheader + tabletext + tableclosing;
    

    // save the full text as innerHTML of the popup element named showwindowData
    document.getElementById('showwindowData').innerHTML = fulltext;
    // show the curently invisible showwindow item
    document.getElementById('showwindow').style.display = "block";
    // somewhere in the middle of the page
    document.getElementById('showwindow').style.top = "50%";
  }

  //
  // This function is a code skeleton of getting the above defined JSON and
  // to build an HTML string implementing a table with the JSON data
  //
function showMenschen()  {
  //
  //  Show Menschen Object as dynamic table
  //
  console.log("showMenschen ");
  //
  // We could use JavaScript and the HTML object methods and properties to build a table or we just
  // construct a string with the HTML data
  //
  var tableheader = "<table> <tr>"; // this is the table header .. just take it
  tableheader += "<th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
  //
  // now we build each row
  //
  var tabletext = "";
  var alle = window.Menschen;
  // var alle is now the reference to the Object
  // alle.Menschen is the array of people
  for (var i = 0; i < alle.Menschen.length; i++) {
    var person = alle.Menschen[i];
    tabletext += "<tr><td>" + person.Vorname + "</td><td>" + person.Nachname  + "</td><td>" + person.Gender  + "</td><td>" + person.Rolle  + "</td></tr>";
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = tableheader + tabletext + tableclosing;
  //
  // save the full text as innerHTML of the popup element named showwindowData
  document.getElementById('showwindowData').innerHTML = fulltext;
  // show the curently invisible showwindow item
  document.getElementById('showwindow').style.display = "block";
  // somewhere in the middle of the page
  document.getElementById('showwindow').style.top = "50%";
 }
//
//  Done !!!!    try it out.....
//
