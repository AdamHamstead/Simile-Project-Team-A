    var control = document.getElementById("file");
    var textBox = document.getElementById("delim");
    var textBoxLabel = document.getElementById("delimLabel");
    control.addEventListener("change", function(event) {
    // When the control has changed, there are new files
    var files = control.files;
    for (var i = 0; i < files.length; i++) {
        if(files[i].type == 'text/csv')
        {
            textBoxLabel.style.display = "inline";
            textBox.style.display = "inline";
        }
        else
        {
            textBox.style.display = "none";
            textBoxLabel.style.display = "none";
        }
    }   
    }, false);