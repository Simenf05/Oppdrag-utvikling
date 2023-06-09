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

/** Does the setup for the html site.*/
function setUp() {

    backgroundInpEl.onchange = e => document.body.style.backgroundColor = e.target.value

    htmlTypeEl.onchange = htmlTypeChange
    innerHtmlEl.onchange = htmlInnerTextChanger
    positionHtmlEl.onclick = changePosition
    htmlSubmitEl.onclick = submit

}

/** Changes the type of the element that will be created.*/
function htmlTypeChange(e) {
    htmlElementData.elementType = e.target.value
    innerHtmlEl.disabled = false
}

/** Changes the inner text of the element.*/
function htmlInnerTextChanger(e) {
    const text = e.target.value

    if (text === "") {
        positionHtmlEl.disabled = true
        return
    }

    htmlElementData.innerText = text
    positionHtmlEl.disabled = false
}

/** Creates onclick for the document to register the next click.
 * The firstClick makes sure that the click event currently happening will not register as click.*/
function changePosition() {
    positionTextEl.innerHTML = "click somewhere"
    htmlElementData.position = [null, null]
    htmlSubmitEl.disabled = true

    let firstClick = true

    document.onclick = e => {

        if (firstClick) {
            firstClick = false
            return
        }

        const xy = htmlElementData.position

        xy[0] = e.clientX
        xy[1] = e.clientY

        positionTextEl.innerHTML = `(${xy.toString()})`
        document.onclick = null
        htmlSubmitEl.disabled = false
    }
}

/** Adds the element and configures it.*/
function submit(e) {

    const newEl = document.createElement(htmlElementData.elementType)

    newEl.innerHTML = htmlElementData.innerText

    newEl.style.position = "absolute"
    newEl.style.left = htmlElementData.position[0]
    newEl.style.top = htmlElementData.position[1]

    document.body.appendChild(newEl)
}

setUp()


