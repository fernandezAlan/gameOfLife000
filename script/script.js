const buttonPlay = document.getElementById('button_play')
const buttonPause = document.getElementById('button_pause')
const gameBoard = document.getElementById('game_board')
const generationSpan = document.getElementById('generation')
const poblationSpan = document.getElementById('poblation')

let generationCount = 0
let poblationCount = 0
generationSpan.textContent= generationCount
poblationSpan.textContent = poblationCount


const makeGameBoard =(width,heigth)=>{

    for (let i = 0; i < heigth; i++) {
        const row = document.createElement('div')
        row.id= 'row-'+i
        row.classList.add('row')
        gameBoard.append(row)
        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div')
            
            cell.id= i +'-'+ j
            cell.classList.add('cell_dead', 'cell')
            cell.addEventListener('click',changeStateOfCell)
            row.appendChild(cell)
        }
    }
}

const changeStateOfCell= (event)=>{
    const classList =Array.from(event.target.classList) 
    const checkIsAlive = classList.includes('cell_alive')
    if(checkIsAlive){
        event.target.classList.remove('cell_alive')
        event.target.classList.add('cell_dead')
        poblationCount--
        poblationSpan.textContent = poblationCount
    }
    else{
        event.target.classList.remove('cell_dead')
        event.target.classList.add('cell_alive')
        poblationCount++
        poblationSpan.textContent = poblationCount
    }

 }


 const checkCellsStatus =(id)=>{

     let aliveCells = 0
     let deathCells = 0

     const allclasses= []
     const selectedCell = document.getElementById(id)
     const split = id.split('-')
     const rowId =parseInt(split[0]) 
     const column=parseInt(split[1]) 
   
     const selectedRow = document.getElementById('row-'+rowId)
     const bottomRow = document.getElementById('row-'+ (rowId+1))
     const topRow = document.getElementById('row-'+ (rowId-1))

     const arraySelectedRow =   Array.from(selectedRow.childNodes)
     const arrayBottomRow   =   bottomRow ? Array.from(bottomRow.childNodes) : null
     const arrayTopRow      =   topRow ? Array.from(topRow.childNodes) : null

     let topLeft  =   arrayTopRow ? arrayTopRow[column-1]: null
     let topMid   =   arrayTopRow ? arrayTopRow[column]: null
     let topRigth =   arrayTopRow ? arrayTopRow[column+1]: null

     let midleft  =   arraySelectedRow[column-1]
     let midRigth =   arraySelectedRow[column+1]

     let bottomLeft = arrayBottomRow ? arrayBottomRow[column-1] : null
     let bottomMid  = arrayBottomRow ? arrayBottomRow[column] : null 
     let bottomRigth  = arrayBottomRow ? arrayBottomRow[column+1] : null 

     topLeft  ? allclasses.push(Array.from(topLeft.classList))  : null
     topMid   ? allclasses.push(Array.from(topMid.classList)) : null
     topRigth ? allclasses.push(Array.from(topRigth.classList)) : null

     midleft  ? allclasses.push(Array.from(midleft.classList)) : null
     midRigth ? allclasses.push(Array.from(midRigth.classList)) : null

     bottomLeft ? allclasses.push(Array.from(bottomLeft.classList)) : null
     bottomMid  ? allclasses.push(Array.from(bottomMid.classList)) : null
     bottomRigth ? allclasses.push(Array.from(bottomRigth.classList)) : null

     allclasses.forEach((classes)=>{
        classes.includes('cell_alive') ? aliveCells++ : deathCells++
     })
     if(Array.from(selectedCell.classList).includes('cell_alive')){
        if(aliveCells===2 || aliveCells===3)return true
        if(aliveCells < 2 || aliveCells > 3)return false
     }else{
        if(aliveCells===3)return true
     }
 }
const nextGeneration =()=>{
    generationCount++
    generationSpan.textContent= generationCount
}

const render = ()=>{
    poblationCount=0
    const cells = Array.from(document.getElementsByClassName('cell'))
    const nextCellAliveInTheNextRender = cells.filter((cell)=>checkCellsStatus(cell.id))
    const nextCellDeathInTheNextRender = cells.filter((cell)=>!checkCellsStatus(cell.id))

    nextCellAliveInTheNextRender.forEach(cell=>{
        cell.classList.remove('cell_dead')
        cell.classList.add('cell_alive')
        poblationCount++
    })

    nextCellDeathInTheNextRender.forEach(cell=>{
        cell.classList.remove('cell_alive')
        cell.classList.add('cell_dead')
    })
    poblationSpan.textContent = poblationCount
}
let intervalId;
const play = ()=>{
    intervalId = setInterval(()=>{
        render()
        nextGeneration()
    },500)
    buttonPlay.removeEventListener('click',play)
}

const pause =()=>{
    console.log('pausa')
    clearInterval(intervalId)
    buttonPlay.addEventListener('click',play)
}

buttonPlay.addEventListener('click',play)
buttonPause.addEventListener('click',pause)
makeGameBoard(35,35)