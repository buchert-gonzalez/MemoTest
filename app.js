
const textRound = document.querySelector("#round")
const textStatus = document.querySelector("#status")
let round = 0
let foundPairs = 0

document.querySelector("#size").onclick = function () {
    startGame()
}

function startGame() {
    resetGame()
}

function resetGame() {
    resetRound()
    resetStatus()
    mixColors()
    handleClicks()
}

function resetRound() {
    round = 0
    textRound.innerText = `Ronda Nº ${round}`
}

function resetStatus() {
    foundPairs = 0
    textStatus.innerText = `Aún no llevas ningún par encontrado... :(`
}

function convertToArray(colors) {
    let array = []
    for (let i = 0; i < colors.length; i++) {
        array.push(colors[i])
    }
    return array
}

const board = document.querySelector("#board")
let arrayColors

function mixColors() {


    const allColors = document.querySelectorAll(".color")
    arrayColors = convertToArray(allColors)
    arrayColors.sort(() => Math.random() - 0.5);
    allColors.forEach(function (i) {
        board.removeChild(i)
    })
    arrayColors.forEach(function (i) {
        board.appendChild(i)
    })

    arrayColors.forEach(function (i) {
        i.style.background = i.id
    });
    setTimeout(function () {
        arrayColors.forEach(function (i) {
            i.style.background = "grey"
        });
    }, 1250);

}


function handleClicks() {
    let clicks = 0
    arrayColors.forEach(function (color) {

        color.onclick = function () {
            if (color.style.background !== "white") {
                if (color.className !== "color-1") {

                    clicks++

                    if (clicks === 1) {
                        color.style.background = color.id
                        color.classList = "color-1"
                    }

                    if (clicks === 2) {
                        color.style.background = color.id
                        color.classList = "color-2"

                        const color1 = document.querySelector(".color-1")
                        const color2 = document.querySelector(".color-2")

                        if (color1.id === color2.id) {
                            setTimeout(function () {
                                color1.style.background = "white"
                                color2.style.background = "white"
                                color1.className = "color col-sm-4"
                                color2.className = "color col-sm-4"
                            }, 500)

                            clicks = 0
                            round++
                            textRound.innerText = `Ronda Nº ${round}`
                            foundPairs++
                            if (foundPairs === 12) {
                                textStatus.innerText = `Felicidades! Ya has encontrado los 12 pares! Pulsa COMENZAR para jugar de nuevo`
                            }
                            else if (foundPairs === 6) {
                                textStatus.innerText = `Felicidades! Ya has econtrado la mitad de los pares, sigue así!`
                            }
                            else if (foundPairs === 1) {
                                textStatus.innerText = `Llevas encontrado ${foundPairs} par! Sigue así!`
                            } else {
                                textStatus.innerText = `Llevas encontrados ${foundPairs} pares! Sigue así!`
                            }
                        }
                        else {
                            setTimeout(function () {
                                color1.style.background = "grey"
                                color2.style.background = "grey"
                                color1.className = "color col-sm-4"
                                color2.className = "color col-sm-4"
                            }, 500)
                            clicks = 0
                            round++
                            textRound.innerText = `Ronda Nº ${round}`
                        }
                    }
                }
            }
        }
    })
}

