window.addEventListener("DOMContentLoaded", (event) => {
    console.log("%cHOP", "color: orange; font-size: xxx-large"); // for fun

    const nav = document.querySelector('nav')
    const menuBurger = document.querySelector('.menu-burger')
    const navLi = document.querySelectorAll('nav li')
    const projects = document.querySelectorAll('.project > div')

    navLi.forEach((li) => {
        li.addEventListener('click', function () {
            nav.classList.remove('nav-active')
            menuBurger.classList.remove('nav-active')
        })
    })

    projects.forEach((project) => {
        project.addEventListener('click', () => {
            let modal = document.createElement('div')
            let background = document.createElement('div')
            background.style.backgroundColor = '#000000'
            background.style.opacity = '.8'

            background.classList.add('bg-modal')

            modal.classList.add('modal')

            modal.appendChild(project.cloneNode(true))

            setTimeout(() => {
                if (document.querySelector('.modal') == null) {
                    document.body.appendChild(background)
                    document.body.appendChild(modal)
                }
            }, 1)

        })
    })

    document.body.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && nav.classList.contains('nav-active') && !menuBurger.contains(event.target)) {
            nav.classList.remove('nav-active')
            menuBurger.classList.remove('nav-active')
        }

        let modal = document.querySelector('.modal')
        if (modal != null && !modal.contains(event.target)) {
            document.body.removeChild(modal)
            document.body.removeChild(document.querySelector('.bg-modal'))
        }
        //if(this.contains(event.target))
    })

    menuBurger.addEventListener('click', () => {
        nav.classList.toggle('nav-active')
        menuBurger.classList.toggle('nav-active')
    })

    let i = 2
    let bgHeader = document.querySelector('div.bg')

    setInterval(() => {
        bgHeader.style.backgroundImage = `url('img/moutain${i}.jpg')`;
        i++
        if (i > 3)
            i = 1
    }, 5000)

    setInterval(() => {
        new Timer()
    }, 1000);



    new Animation()
})

class Timer {

    constructor() {
        let life = document.querySelector('#life')
        let p = ''
        let intervalLife = this.dateInterval()
        for (let timeUnity in intervalLife) {
            p += intervalLife[timeUnity] + ' ' + (intervalLife[timeUnity] > 1 ? timeUnity : timeUnity.substr(0, timeUnity.length - 1)) + ' '
        }
        life.innerText = p
    }

    dateInterval() {

        const SECOND = 1000
        const MINUTE = SECOND * 60
        const HOUR = MINUTE * 60
        const DAY = HOUR * 24
        const MONTH = DAY * 30.4375 // (365.25/12)
        const YEAR = MONTH * 12

        let times = {
            years: YEAR,
            months: MONTH,
            days: DAY,
            hours: HOUR,
            minutes: MINUTE,
            seconds: SECOND
        }

        let obj = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }

        let now = new Date()
        let birthday = new Date(2000, 5, 12, 21, 30, 0)
        let ms = (now.getTime() - birthday.getTime()) - (now.getTimezoneOffset() * 60 * 1000)

        Object.keys(times).forEach(k => {
            obj[k] = Math.floor(ms / times[k])
            ms -= obj[k] * times[k]
        })

        return obj
    }
}

class Skills {
    constructor(canvas) {

        let id = canvas.getAttribute('id')
        let ratioSkill = canvas.getAttribute('data-ratio')
        let ctx = canvas.getContext('2d')

        let ration = 0
        let interval = 10

        let myFunction = function () {
            clearInterval(idInterval)

            if (ration < ratioSkill) {
                ration += 0.01

                ration = Math.round(ration * 100) / 100
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.beginPath()
                ctx.arc(canvas.width / 2, canvas.height / 2, 75, -.5 * Math.PI, Math.PI * 3 / 2 - (Math.PI * 3 / 2 - -.5 * Math.PI) * (1 - ration))
                ctx.lineWidth = 15
                ctx.strokeStyle = '#d48800'
                ctx.stroke()
                ctx.font = "30px sans-serif"
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(Math.round(ration * 100) + '%', canvas.width / 2, canvas.height / 2)

                idInterval = setTimeout(myFunction, interval)
            }

        }
        let idInterval = setTimeout(myFunction, interval)

    }
}

class Animation {
    constructor() {

        let observer = new IntersectionObserver((entries => {
            entries.forEach((entrie) => {
                if (entrie.intersectionRatio > 0.7) {
                    entrie.target.classList.remove('not-visible')
                    if (Array.from(entrie.target.classList).includes('animation-skills'))
                        new Skills(entrie.target.querySelector('canvas'))
                    else if (Array.from(entrie.target.classList).includes('animation-fadeInLeft'))
                        entrie.target.classList.add('fadeInLeft')
                    else if (Array.from(entrie.target.classList).includes('animation-fadeInRight'))
                        entrie.target.classList.add('fadeInRight')
                    else if (Array.from(entrie.target.classList).includes('animation-fadeInUp')) {
                        entrie.target.classList.add('fadeInUp')
                    }

                    observer.unobserve(entrie.target)
                }
            })
        }), {
            threshold: [0.7]
        })

        let items = document.querySelectorAll('.animation, .animation-skills')
        items.forEach((item) => {
            item.classList.add('not-visible')
            observer.observe(item)
        })
    }
}