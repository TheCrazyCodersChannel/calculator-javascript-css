var keys = document.querySelectorAll("button");
var total = document.querySelector(".total");
var summary = document.querySelector(".summary");
var decimal = false;
var operators = ["+","-","×","÷"];

keys.forEach(key=> {
    key.addEventListener('click',HandleClick);
})

function HandleClick(e) {
    var keyVal = e.target.getAttribute('data-val');
    output = summary.innerHTML;
    var lastChar = output[output.length - 1];

    if(keyVal == "clear") {
        total.innerHTML = 0;
        summary.innerHTML = "";
        decimal = false;
    }else if (keyVal == "="){
        output = output.replace(/×/g,"*").replace(/÷/g,"/");
        if(operators.indexOf(lastChar) > -1 || lastChar == ".") {
            output = output.replace(/.$/,'');
        }
        if(output) {
            total.innerHTML = Math.round(eval(output)*100)/100;
        }
        summary.addClass("complete");
        decimal = false;
    }else if (e.target.parentNode.parentNode.parentNode.className == "operators") {
        if(summary.className == "complete") {
            summary.removeClass("complete");
        }
        if(output != "" && operators.indexOf(lastChar) == -1){
            summary.innerHTML +=keyVal;
        }else if(output == "" && keyVal == "-"){
            summary.innerHTML += keyVal;
        }
        
        if(operators.indexOf(lastChar) > -1 && output.length > 1){
            summary.innerHTML = summary.innerHTML.replace(/.$/,keyVal);
        }
        decimal = false;
    }else if (keyVal == ".") {
        if(summary.className == "complete"){
            summary.innerHTML = "0" + keyVal;
            summary.removeClass("complete");
        }else if (output == ""){
            summary.innerHTML = "0" + keyVal;
        }else if (operators.indexOf(lastChar) > -1) {
            summary.innerHTML += "0" + keyVal;
        }else {
            if(!decimal){
                summary.innerHTML += keyVal;
                decimal = true;
            }
        }
    }else {
        if(summary.className == "complete") {
            summary.innerHTML += keyVal;
            summary.removeClass("complete")
        }else {
            summary.innerHTML += keyVal;
        }
    }
}