// TODO : SELECT ALL SELECTORS
// TODO : MAKE PICK COLOR BUTTON FUNCTIONAL
// TODO : MAKE COPY COLOR FUNCTIONAL
// TODO : SHOW COLOR ON THE DOM
// TODO : CLEAR BUTTON TO CLEAR ALL THE PREVIOUS COLORS

//Selectors
const colorPickerBtn = document.getElementById("color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
// const pickedColors = [];
//step 5
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// Step 01
const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    console.log(eyeDropper);
    const colorCode = await eyeDropper.open();
    console.log(colorCode.sRGBHex);
    //copy to clipboard
    navigator.clipboard.writeText(colorCode.sRGBHex);
    //sending the new color code to the array
    pickedColors.push(colorCode.sRGBHex);
    showColor();
    //step 4
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    // console.log(pickedColors);
  } catch (error) {
    alert("Failed");
  }
};

//Step 02
const showColor = () => {
  if (pickedColors.length > 0) {
    document.querySelector(".picked-colors").style.display = "block";
    colorList.innerHTML = pickedColors
      .map(
        (color) => `
        <li class ="color">
        <span class="rect" style="background-color:${color}"></span>
        <span class="value hex">${color}</span>
        </li>
        `
      )
      .join("");

    //   step 07
    let colors = document.querySelectorAll(".color");
    console.log(colors);
    colors.forEach((li) => {
      li.addEventListener("click", (e) => {
        let color = e.target.innerText;
        navigator.clipboard.writeText(color);
        e.target.innerText = "Copied";
        //set color to the initial stage
        setTimeout(() => (e.target.innerText = color), 1000);
      });
    });
  } else {
    document.querySelector(".picked-colors").style.display = "none";
    // colorList.innerHTML = "<li>No Color Found</li>";
  }
};

// Step 03
const clearListOfColors = () => {
  //   colorList.innerHTML = "";

  //Step 06
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").style.display = "none";
};

// activate colorPicker
colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearListOfColors);
//show color by default
showColor();
