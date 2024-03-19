document.getElementById('Iframe').addEventListener("click",Iframe)
const ipc = require('electron').ipcRenderer;


function Iframe(e)
{
    document.querySelectorAll('iframe').forEach(
        function(elem){
          elem.parentNode.removeChild(elem);
      });
     e.preventDefault();
     ipc.send('close'); 
}