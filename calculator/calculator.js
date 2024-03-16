let numbers = document.querySelectorAll(".numbers");
let mathFourElems = document.querySelectorAll(".mathFourElems");
let inputBoxNum = document.getElementById("numInput");
let cleanNum = document.getElementById("cleanNum");
let cleanNumAll = document.getElementById("cleannumAll");
let comma = document.getElementById("comma");
let finalResult = document.getElementById("result");
let squareRoot = document.getElementById("mathSquareRoot");
let squareRootSign = document.getElementById("topSQRTSymb");
let leftBracket = document.getElementById("leftBracket");
let rightBracket = document.getElementById("rightBracket");
let smallResult = document.getElementById("smallResult");
let wrapper = document.getElementById("wrapper");
let modeBottom = document.getElementById("modeBottom");
let exampleBf = document.getElementById("exampleBf");

let modeBox = document.getElementById("lightDarkMode");
let sunIcon = document.getElementById("sunIcon");
let moonIcon = document.getElementById("moonIcon");
let CurrentModeOrder = "dark";
let whoCreated = document.getElementById("whoCreated");

let bigboxUI = document.getElementById("bigbox");
let btns = document.querySelectorAll(".btns");

let openingBracket = 0;
let closingBracket = 0;


// this is the accumulator of written stuffes it is for backend cz for example tis × is written to UI and this * is written to backend accumulator which is realBackResult
let realBackResult = "";

//write a num
for (const aNumber of numbers) {
    let writtenNum;
        aNumber.onclick = () => {
            switch (aNumber.id) {
                case "numOne":
                    writtenNum = "1";
                    break;
                case "numTwo":
                    writtenNum = "2";
                    break;
                case "numThree":
                    writtenNum = "3";
                    break;
                case "numFour":
                    writtenNum = "4";
                    break;
                case "numFive":
                    writtenNum = "5";
                    break;
                case "numSix":
                    writtenNum = "6";
                    break;
                case "numSeven":
                    writtenNum = "7";
                    break;
                case "numEight":
                    writtenNum = "8";
                    break;
                case "numNine":
                    writtenNum = "9";
                    break;  
                case "numZero":
                    writtenNum = "0";
                    break;
                default:
                    break;
            }
            
            // this if statement checks if it is undefined or not the first time u write a number this will be undefined --> realBackResult = realBackResult + String(writtenNum);
            if (!realBackResult) {
                realBackResult = writtenNum;
                inputBoxNum.value = writtenNum;
                removeExampleBf();
                smallResultFunc();
                changeColor()
            } else{
                    if ([...realBackResult].at(-1) == ")") {
                        realBackResult = realBackResult + "*" + String(writtenNum);
                        inputBoxNum.value = String(inputBoxNum.value) + "×" + writtenNum;
                    } else{
                        realBackResult = String(realBackResult) + String(writtenNum);
                        inputBoxNum.value = String(inputBoxNum.value) + String(writtenNum);
                    }
                }
                removeExampleBf();
                smallResultFunc();
                changeColor()
        }
       

}

// remove the last numebr
cleanNum.onclick = () =>{

    if ([...realBackResult].at(-1) == "(") {
        openingBracket--;
    } else if([...realBackResult].at(-1) == ")"){
        closingBracket--;
    }

    inputBoxNum.value = inputBoxNum.value.slice(0, -1);
    if (realBackResult) { //if i hadn't write if statement here imagine there is nothing in input then if user click the remove button then how can i delete the last number, cz there isn't any number cz it is equal to undefined
        realBackResult = realBackResult.slice(0, -1);
    } else{
        console.log("there is no number to remove bro");
    }
    removeExampleBf();
    smallResultFunc();
    changeColor()
}

// remove all numbers
cleanNumAll.onclick = () =>{
    openingBracket = 0;
    closingBracket = 0;
    inputBoxNum.value = "";
    smallResult.value = "";
    if (realBackResult !== "") {
        realBackResult = "";
    }
    removeExampleBf();
    smallResultFunc();
    changeColor();
}

//write comma
comma.onclick = () => {

    if (!realBackResult) {
        realBackResult = String("0.");
        inputBoxNum.value = "0,";
    }else{
        if ([...inputBoxNum.value].includes(",") || [...realBackResult].includes(".") || [...realBackResult].at(-1) == ")" || [...realBackResult].at(-1) == "(" || [...inputBoxNum.value].at(-1) == "√" || [...realBackResult].at(-1) == "-") {
            console.log("u already wrote ,");
        } else {
            inputBoxNum.value += ",";
            realBackResult = String(realBackResult) + ".";
        }
    }
    removeExampleBf();
    smallResultFunc();
    changeColor()
}

//write left bracket
leftBracket.onclick = () =>{
    openingBracket++;
    if (realBackResult) {

        if ([...realBackResult].at(-1) == "1" || [...realBackResult].at(-1) == "2" || [...realBackResult].at(-1) == "3" || [...realBackResult].at(-1) == "4" || [...realBackResult].at(-1) == "5" || [...realBackResult].at(-1) == "6" || [...realBackResult].at(-1) == "7" || [...realBackResult].at(-1) == "8" || [...realBackResult].at(-1) == "9" || [...realBackResult].at(-1) == "0" || [...realBackResult].at(-1) == ")") {
            inputBoxNum.value = String(inputBoxNum.value) + "×(";
            realBackResult = String(realBackResult) + "*(";
        }else{
            inputBoxNum.value = String(inputBoxNum.value) + "(";
            realBackResult = String(realBackResult) + "(";
        }
        
    } else{
        inputBoxNum.value = "(";
        realBackResult = "(";   
    }
    removeExampleBf();
    smallResult.innerHTML = "";
    changeColor()
}
// write right bracket
rightBracket.onclick = () =>{
    if (realBackResult && [...realBackResult].at(-1) !== "(") {
        closingBracket++;
        if (realBackResult) {
            inputBoxNum.value = String(inputBoxNum.value) + ")";
            realBackResult = String(realBackResult) + ")";
            changeColor();

            if (openingBracket === closingBracket) {
                realBackResult = realBackResult.replaceAll("b", "Math.sqrt");
                smallResult.innerText = eval(realBackResult);
            } else {
                smallResult = "";
            }

        } else{
            closingBracket++
            smallResultFunc();
            removeExampleBf();
            changeColor();
        }
    } else{
        console.log("before closing brackets write something into it");
    }
}

//write math four elements
let clickedElem;
let clickedElemBack;
for (let oneOfFourElem of mathFourElems) {
  
    oneOfFourElem.onclick = () =>{
        switch (oneOfFourElem.id) {
            case "mathPlus":
                clickedElem = "+";
                clickedElemBack = "+";
                break;
            case "mathMinus":
                clickedElem = "−";
                clickedElemBack = "-";
                break;
            case "mathMultiply":
                clickedElem = "×";
                clickedElemBack = "*";
                break;
            case "mathDivide":
                clickedElem = "÷";
                clickedElemBack = "/";
                break;
            default:
                break;
        }
        
        if (clickedElemBack == "-") {
            if (inputBoxNum.value == "") {
                realBackResult = "-";
                inputBoxNum.value = "−";
            }
        }

        if (realBackResult && [...realBackResult].at(-1) !== "+" && [...realBackResult].at(-1) !== "-" && [...realBackResult].at(-1) !== "*" && [...realBackResult].at(-1) !== "/" && [...realBackResult].at(-1) !== "(") {
            realBackResult = String(realBackResult) + String(clickedElemBack);
            inputBoxNum.value = String(inputBoxNum.value) + clickedElem;
        }else{
            console.log("u can't write 2 math elements together or can't write an element after an open bracket or can't write + * / first");
        }
        removeExampleBf();
        smallResult.innerHTML = "";
        changeColor()
    }
    
}

//write square root
squareRoot.onclick = () =>{
    if ([...realBackResult].at(-1) !== ".") {
        if(!realBackResult){
            inputBoxNum.value = "√(";
            realBackResult = "b(";
            openingBracket++;
        }else if ([...realBackResult].at(-1) !== "+" && [...realBackResult].at(-1) !== "-" && [...realBackResult].at(-1) !== "*" && [...realBackResult].at(-1) !== "/" && [...realBackResult].at(-1) !== "(") {
            inputBoxNum.value = String(inputBoxNum.value) + "×√(";
            realBackResult = String(realBackResult) + "*b("
            openingBracket++;
        }else{
            inputBoxNum.value = String(inputBoxNum.value) + "√(";
            realBackResult = String(realBackResult) + "b(";
            openingBracket++
        }
        smallResult.innerHTML = "";
        removeExampleBf();
        changeColor();
    } else {
        console.log("u cant write square root after comma ");
    }
}

//get final result
finalResult.onclick = () => {
    if (realBackResult && [...realBackResult].at(-1) !== "+" && [...realBackResult].at(-1) !== "-" && [...realBackResult].at(-1) !== "*" && [...realBackResult].at(-1) !== "/") {
        
        for (let i = 0; i < realBackResult.length; i++) {
            if (realBackResult[i] == "(") {
                openingBracket++;
            } else if (realBackResult[i] == ")") {
                closingBracket++;
            }
        }

        if (openingBracket === closingBracket) {
            exampleBf.innerText = inputBoxNum.value;
            inputBoxNum.style.color = "rgb(43 202 45)";
            realBackResult = realBackResult.replaceAll("b", "Math.sqrt");
    
            realBackResult = eval(realBackResult);
            inputBoxNum.value = realBackResult;
            realBackResult = String(realBackResult);
        } else {
            console.log(`Opening bracket is ${openingBracket} and Closing is ${closingBracket}`);
        }

        smallResult.innerText = "";

    } else {
        console.log("there is nothing in the input");
    }
}

//small down result
function smallResultFunc() {
    if (openingBracket == closingBracket) {
        if (realBackResult && [...realBackResult].at(-1) !== "+" && [...realBackResult].at(-1) !== "-" && [...realBackResult].at(-1) !== "*" && [...realBackResult].at(-1) !== "/") {
            smallResult.innerText = String(eval(realBackResult));
        } else {
            smallResult.innerText = "";
        }
    }
}

//changing colors when a mode is clicked
function changeColor() {
    if (CurrentModeOrder == "light") {
        inputBoxNum.style.color = "#000";
        smallResult.style.color = "rgb(88 88 88)";
    } else if(CurrentModeOrder == "dark"){
        inputBoxNum.style.color = "#fff";
        if (smallResult) {
            smallResult.style.color = "rgb(193, 193, 193)";
        }
    }
}

//light mode
let withOfSpan = 0; //px
sunIcon.onclick = () =>{
    if (CurrentModeOrder == "dark") {
        CurrentModeOrder = "light";

        let makeInterval = setInterval(() => {
            withOfSpan +=2;
            modeBottom.style.right = withOfSpan + "px";
            if (withOfSpan > 52) {
                clearInterval(makeInterval)
            }
        }, 0);
        inputBoxNum.style.color = "#000";
        lightMode();
        
        document.getElementById("cleannumAll").style.color = "red";
        document.getElementById("result").style.color = "rgb(0, 216, 7)";
}}

//dark mode
moonIcon.onclick = () => {
    if (CurrentModeOrder == "light") {
        CurrentModeOrder = "dark";
        let makeInterval = setInterval(() => {
            withOfSpan -=2;
            modeBottom.style.right = withOfSpan + "px";
            if (withOfSpan <= 0) {
                clearInterval(makeInterval)
            }
        inputBoxNum.style.color = "#fff";

        
        
        }, 0);
        darkMode();
        document.getElementById("cleannumAll").style.color = "red";
        document.getElementById("result").style.color = "rgb(0, 216, 7)";
    }
}

function lightMode() {
    exampleBf.style.color = "#000"
    leftBracket.style.backgroundColor = "rgb(202 202 202)";
    rightBracket.style.backgroundColor = "rgb(202 202 202)";
    document.body.style.backgroundColor = "#6dc7f4";
    bigboxUI.style.backgroundColor = "#DEE4E7";
    bigboxUI.style.boxShadow = "0 0 5px lightgrey";
    bigboxUI.style.border = "5px solid white";
    document.getElementById("mathBrackets").style.backgroundColor = "rgb(202 202 202)";
    document.getElementById("leftBracket").style.color = "#000";
    document.getElementById("rightBracket").style.color = "#000";
    document.getElementById("hrrrr").style.border = "1px solid #c7c7c7";

    btns.forEach((btn) => {
    btn.style.backgroundColor = "rgb(202, 202, 202)";
    btn.style.color = "black";

        btn.addEventListener("mouseover", () => {
                    if (CurrentModeOrder === "light") {
                        btn.style.backgroundColor = "rgb(154 154 154)";
                    }
                }
            );
        leftBracket.addEventListener("mouseover", () =>{
            leftBracket.style.backgroundColor = "rgb(154 154 154)";
        })
        leftBracket.addEventListener("mouseout", () =>{
            leftBracket.style.backgroundColor = "rgb(202 202 202)";
        })
        rightBracket.addEventListener("mouseover", () =>{
            rightBracket.style.backgroundColor = "rgb(154 154 154)";
        })
        rightBracket.addEventListener("mouseout", () =>{
            rightBracket.style.backgroundColor = "rgb(202 202 202)";
        })
        
        btn.addEventListener("mouseout", () => {
                if (CurrentModeOrder === "light") {
                    btn.style.backgroundColor = "rgb(202 202 202)";
                    leftBracket.style.backgroundColor = "rgb(202 202 202)";
                }
            }
        )
    
    }
    );
    whoCreated.style.color = "#000";
}

function darkMode() {
    exampleBf.style.color = "rgb(215 215 215)";
    leftBracket.style.backgroundColor = "rgb(63, 63, 63)";
    rightBracket.style.backgroundColor = "rgb(63, 63, 63)";

    document.body.style.backgroundColor = "#37474F";
    bigboxUI.style.backgroundColor = "rgb(61,61,61)";
    bigboxUI.style.boxShadow = "0 0 10px rgb(50, 50, 50)";
    bigboxUI.style.border = "5px solid #646464";
    document.getElementById("mathBrackets").style.backgroundColor = "rgb(63, 63, 63)";
    document.getElementById("leftBracket").style.color = "#fff";
    document.getElementById("rightBracket").style.color = "#fff";
    document.getElementById("hrrrr").style.border = "1px solid rgb(90,90,90)"

    

    btns.forEach( (btn) => {
    btn.style.backgroundColor = "rgb(63, 63, 63)";
    btn.style.color = "#fff";

            btn.addEventListener("mouseover", () => {
                    if (CurrentModeOrder === "dark") {
                        btn.style.backgroundColor = "rgb(75, 75, 75)";
                    }
                }
            );
            btn.addEventListener("mouseout", () => {
                    if (CurrentModeOrder === "dark") {
                        btn.style.backgroundColor = "rgb(63, 63, 63)";
                    }
                }
            )
            leftBracket.addEventListener("mouseover", () =>{
                leftBracket.style.backgroundColor = "rgb(75, 75, 75)";
            })
            leftBracket.addEventListener("mouseout", () =>{
                leftBracket.style.backgroundColor = "rgb(63, 63, 63)";
            })
            rightBracket.addEventListener("mouseover", () =>{
                rightBracket.style.backgroundColor = "rgb(75, 75, 75)";
            })
            rightBracket.addEventListener("mouseout", () =>{
                rightBracket.style.backgroundColor = "rgb(63 63 63)";
            })
    }
        
    )
    whoCreated.style.color = "#fff";
}

//remove exampleBf when any button is clicked
function removeExampleBf() {
    exampleBf.innerText = "";
}

/* don't change 15th november of 2023 developed by t.me/izzatajan */
/* above was 1.0.0 version, i changed it 20th november and this is 2.0.0 */