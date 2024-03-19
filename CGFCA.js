document.getElementById("CGFCA").addEventListener("click", myFunction);
document.getElementById("clickMe").addEventListener("click",getMXCELL);

const drawio = require('./drawio-desktop\src\main\electron.js');


function myFunction(){

    var path = document.getElementById("file").value //file path of selected file
    //error checking for correct file type
    drawio.myFunction();
}
function getMXCELL(){
    console.log("test")
    const element = document.getElementsByName("g");
    document.getElementById("demo").innerHTML = 'The first paragraph (index 0) inside "main" is: ' + element;
    let t,e;
    console.log( document.getElementById("drawio-desktop").contentWindow.EditorUi.prototype.getFileData(true,null,null,null,true,false,null,null,null,true))
  }
