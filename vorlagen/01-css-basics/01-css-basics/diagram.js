function degreesToRadians(degrees) {
    // 360 degrees = 2*PI
    return degrees / 360 * 2 * Math.PI;
}

function radiansToDegrees(radians) {
    return radians / (2 * Math.PI) * 360;
}

function createArcPath(startAngle, endAngle, radius, circleX, circleY) {
    const startRadians = degreesToRadians(startAngle)
    const endRadians = degreesToRadians(endAngle)
    const startOffsetX = Math.cos(startRadians) * radius
    const startOffsetY = Math.sin(startRadians) * radius
    const endOffsetX = Math.cos(endRadians) * radius
    const endOffsetY = Math.sin(endRadians) * radius

    const startX = startOffsetX + circleX
    const startY = startOffsetY + circleY
    const endX = endOffsetX + circleX
    const endY = endOffsetY + circleY

    const useLongArc = (endAngle - startAngle) >= 180 ? "1" : "0"
    const drawClockwise = "1"
    let path = `M ${startX} ${startY} ` +
               `A ${radius} ${radius} 0 ${useLongArc} ${drawClockwise} ${endX} ${endY}`
    return path
}

const graphic = document.querySelector('#pie-chart')
const carbohydrates = document.createElementNS("http://www.w3.org/2000/svg", "path")
const fat = document.createElementNS("http://www.w3.org/2000/svg", "path")
const proteins = document.createElementNS("http://www.w3.org/2000/svg", "path")

carbohydrates.setAttribute("d", createArcPath(0, 100, 50, 50, 50))
carbohydrates.setAttribute("stroke", "magenta")
carbohydrates.setAttribute("stroke-width", "15")
carbohydrates.setAttribute("fill", "transparent")
fat.setAttribute("d", createArcPath(100, 250, 50, 50, 50))
fat.setAttribute("stroke", "red")
fat.setAttribute("stroke-width", "15")
fat.setAttribute("fill", "transparent")
proteins.setAttribute("d", createArcPath(250, 360, 50, 50, 50))
proteins.setAttribute("stroke", "green")
proteins.setAttribute("stroke-width", "15")
proteins.setAttribute("fill", "transparent")

graphic.append(carbohydrates, fat, proteins)

console.log(graphic);
