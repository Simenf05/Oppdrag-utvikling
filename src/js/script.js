const backgroundInpEl = document.getElementById("backgroundColorInp")
const htmlTypeEl = document.getElementById("typeHtmlElement")
const innerHtmlEl = document.getElementById("innerHtmlChanger")
const positionHtmlEl = document.getElementById("htmlPosition")
const positionTextEl = document.getElementById("positionText")
const htmlSubmitEl = document.getElementById("htmlSubmit")

const htmlElementData = {
    elementType: null,
    innerText: null,
    position: [null, null]
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
    positionTextEl.innerText = "click somewhere"
    htmlElementData.position = [null, null]
    htmlSubmitEl.disabled = true

    let firstClick = true

    document.onclick = e => {

        if (firstClick) {
            firstClick = false
            return
        }

        console.log(e.target)

        const xy = htmlElementData.position

        xy[0] = e.clientX
        xy[1] = e.clientY

        positionTextEl.innerText = `(${xy.toLocaleString()})`
        console.log(htmlElementData)
        document.onclick = null
        htmlSubmitEl.disabled = false
    }
}

function submit(e) {

    const newEl = document.createElement(htmlElementData.elementType)

    newEl.innerHTML = htmlElementData.innerText

    newEl.style.position = "absolute"
    newEl.style.left = htmlElementData.position[0]
    newEl.style.top = htmlElementData.position[1]

    document.body.appendChild(newEl)
}

setUp()


