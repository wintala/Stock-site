const exampleList = [[2, 3, 1], [3, 2, 1], [4, 5, 1]]

let sumList = []

sumList = [...Array(exampleList[0].length).keys()].map(i => exampleList.map(l => l[i]).reduce((a, b) => (a + b)))




