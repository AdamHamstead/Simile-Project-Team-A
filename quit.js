document.getElementById('Iframe').addEventListener("click",Iframe)
document.getElementById('min').addEventListener("click",min)
document.getElementById('small').addEventListener("click",small)

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

function min(){
ipc.send('minimize');

}

function small(){
    ipc.send('reSize');
    }