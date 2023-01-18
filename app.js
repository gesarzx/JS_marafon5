const startBtn=document.querySelector('#startlink')
const screens=document.querySelectorAll('.screen')
const timeList=document.querySelector('#timeList')
const timeEl=document.querySelector('#time')
const board=document.querySelector('#board')
const colors=['red', 'green', 'gray', 'white', 'blue']

// задаем переменную time :
let time=0
let score=0

startBtn.addEventListener('click', (event)=> {
    event.preventDefault()
    screens[0].classList.add('up')
    })

timeList.addEventListener('click', event=>{
    if (event.target.classList.contains ('time-btn')) {
        // если у элемента есть класс time-btn, то это означает, что есть кнопка
        time=parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        // получаем значения из арибута data в HTML
        startGame()        
        }
    })

board.addEventListener('click', event=>{
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

// debug
//  startGame()

function startGame(){
// board.innerHTML=''
// делаю кнопку перезапуска
    setInterval(decreaseTime,1000)
    // вызываю функцию decreaseTime каждую секунду
    timeEl.innerHTML=`00:${time}`
    setTime(time)
    createRandomCircle()
}

function decreaseTime(){
    if (time===0){
        finishGame()
        } 
    else {
        let currentTime=--time
        if (currentTime<10){
            currentTime=`0${currentTime}`
            }
        setTime(currentTime)
    }  
}

function setTime(value){
    timeEl.innerHTML=`00:${value}`
}


function finishGame(){
    board.innerHTML=`<h1>Ваш счет: <span class="primary">${score}</span></h1>`
    // timeEl.parentNode.classList.add('hide')
    // удаление родителя timeEl т.е. <h3>Осталось, или еще так: timeEl.parentNode.remove()
    // timeEl.parentNode.remove()
    timeEl.replaceWith(startBtn)
    startBtn.addEventListener('click', (event)=> {
        event.preventDefault()
        screens[1].classList.remove('up')     
    })
}

function createRandomCircle() {
    const circle=document.createElement('div')
    const color = getRandomColor()
    circle.style.backgroundColor = color
    const shadow=getRandomShadow()
    circle.style.boxShadow=`0 0 2px ${shadow}, 0 0 30px ${shadow}`   
   
    const size=getRandomNumber(10, 60)
    const {width, height}=board.getBoundingClientRect()
    const x=getRandomNumber(0, width-size)
    const y=getRandomNumber(0, height-size)

    circle.classList.add('circle')
    circle.style.width=`${size}px`
    circle.style.height=`${size}px`

    circle.style.top=`${x}px`
    circle.style.left=`${y}px`

    board.append(circle)
}


function getRandomNumber(min,max){
    return Math.round(Math.random()*(max-min)+min)
}

function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)]
}

function getRandomShadow(){
    return colors[Math.floor(Math.random()*colors.length)]
}

