function fetchQuote() {
    const div1 = document.querySelector('#json-data')
    fetch('http://localhost:3000/quotes')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error fetching quotes!')
            } return res.json()
        }).then(data => {

            data.forEach(q => {
                const div = document.createElement('div')

                div.innerHTML = `
                <h4 id="large">${q.quote}</h4>
                <p>${q.author}</p>

                `
                div1.appendChild(div)
                const h4 = div.querySelector('#large')
                let enlarge = false
                h4.addEventListener('click', () => {
                    //let enlarge = false
                    enlarge = !enlarge
                    if (enlarge) {
                        h4.style.fontSize = '30px'
                    } else {
                        h4.style.fontSize = ''
                    }

                })


            })
        }).catch(e => {
            console.log('Error: ', e)
        })


}
fetchQuote()