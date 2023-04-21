const backgroundInpEl = document.getElementById("backgroundColorInp")
const htmlTypeEl = document.getElementById("typeHtmlElement")
const innerHtmlEl = document.getElementById("innerHtmlChanger")
const positionHtmlEl = document.getElementById("htmlPosition")
const positionTextEl = document.getElementById("positionText")
const htmlSubmitEl = document.getElementById("htmlSubmit")

const htmlElementData = {
    elementType: null,
    innerText: null,
    target: null
}

function setUp() {

    backgroundInpEl.onchange = e => document.body.style.backgroundColor = e.target.value
    htmlTypeEl.onchange = htmlTypeChange
    innerHtmlEl.onchange = htmlInnerTextChanger
    positionHtmlEl.onclick = changePosition
    htmlSubmitEl.onclick = submit

}


function htmlTypeChange(e) {
    htmlElementData.elementType = e.target.value
    innerHtmlEl.disabled = false
}

function htmlInnerTextChanger(e) {
    const text = e.target.value

    if (text === "") {
        positionHtmlEl.disabled = true
        return
    }

    htmlElementData.innerText = text
    positionHtmlEl.disabled = false
}

function changePosition() {
    positionTextEl.innerHTML = "Click somewhere"
    htmlElementData.target = null
    htmlSubmitEl.disabled = true

    let firstClick = true

    document.onclick = e => {

        if (firstClick) {
            firstClick = false
            return
        }

        htmlElementData.target = e.target

        positionTextEl.innerHTML = `Element selected`
        document.onclick = null
        htmlSubmitEl.disabled = false
    }
}

function submit() {

    const newEl = document.createElement(htmlElementData.elementType)

    newEl.innerHTML = htmlElementData.innerText

    console.log(htmlElementData.target)

    htmlElementData.target.appendChild(newEl)
}

setUp()


