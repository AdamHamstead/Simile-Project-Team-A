document.getElementById("CGFCA").addEventListener("click", myFunction);

const drawio = require('./drawio-desktop\src\main\electron.js');


function myFunction(){

    var path = document.getElementById("file").value //file path of selected file
    //error checking for correct file type


    drawio.myFunction();
}

