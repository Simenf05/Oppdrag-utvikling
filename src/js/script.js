const backgroundInpEl = document.getElementById("backgroundColorInp")


const htmlElementData = {
    elementType: null,
    innerText: null,
    position: [null, null]
}

function setUp() {

    backgroundInpEl.onchange = changeBGColor

}




function changeBGColor(e) {
    document.body.style.backgroundColor = e.target.value
}

setUp()


