    var control = document.getElementById("file");
    var textBox = document.getElementById("delim");
    var button = document.getElementById("CGFCA");

    var textBoxLabel = document.getElementById("delimLabel");

    document.getElementById("delim").addEventListener("change", enableButton);


    control.addEventListener("change", function(event) {
    // When the control has changed, there are new files
    var files = control.files;
    for (var i = 0; i < files.length; i++) {
        if(files[i].type == 'text/csv')
        {
            textBoxLabel.style.display = "inline";
            textBox.style.display = "inline";
            if (textBox.value == ""){
                button.disabled = true

            }        
        }
        else
        {
            textBox.style.display = "none";
            textBoxLabel.style.display = "none";
        }
    }   
    }, false);

    function enableButton(){
        if (textBox.value != ""){
            button.disabled = false
        }     
        else{
            button.disabled = true

        }   
    }