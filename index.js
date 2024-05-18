// function fetchQuote() {
//     const div1 = document.querySelector('#json-data')
//     let enlarge = true
//     const select = document.querySelector('#description')
//     fetch('http://localhost:3000/quotes')
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('Error fetching quotes!')
//             } return res.json()
//         }).then(data => {

//             data.forEach(q => {
//                 const div = document.createElement('div')
//                 div.id = 'quote-card'

//                 div.innerHTML = `
//                 <h4 id='quote-text'>${q.quote}</h4>
//                 <p>${q.author}</p>
//                 <button id="large">on</button>

//                 `
//                 div1.appendChild(div)
//                 const btn = div.querySelector('#large')
//                 const h4 = div.querySelector('#quote-text')
//                 // let enlarge = false
//                 btn.addEventListener('click', () => {

//                     enlarge = !enlarge
//                     if (!enlarge) {
//                         h4.style.fontSize = '30px'
//                         h4.style.color = 'lightcoral'
//                         btn.textContent = 'off'
//                     } else {
//                         h4.style.fontSize = ''
//                         h4.style.color = 'black'
//                         btn.textContent = 'on'
//                     }

//                 })


//             })
//         }).catch(e => {
//             console.log('Error: ', e)
//         })
// }





// fetchQuote()
document.addEventListener('DOMContentLoaded', () => {
    let enlarge = false
    function fetchQuote() {
        const quoteContainer = document.querySelector('#quote-container')

        fetch('http://localhost:3000/quotes')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error fetching quotes!')
                } return res.json()
            })
            .then(data => {
                data.forEach(quote => {
                    const quoteCard = createQuoteCard(quote)
                    quoteContainer.appendChild(quoteCard)
                })
            })
            .catch(e => {
                console.error('Error: ', e)
            })
    }

    function createQuoteCard(quoteData) {
        const quoteCard = document.createElement('div')
        quoteCard.classList.add('quote-card')

        const quoteText = document.createElement('h4')
        quoteText.textContent = quoteData.quote

        const author = document.createElement('p')
        author.textContent = quoteData.author

        const enlargeBtn = document.createElement('button')
        enlargeBtn.textContent = 'Enlarge'
        enlargeBtn.classList.add('large')
        enlargeBtn.addEventListener('click', () => {
            toggleQuoteSize(quoteText, enlargeBtn)
        })
        quoteCard.appendChild(quoteText)
        quoteCard.appendChild(author)
        quoteCard.appendChild(enlargeBtn)

        return quoteCard
    }

    function toggleQuoteSize(quoteElement, btn) {

        enlarge = !enlarge
        if (enlarge) {
            quoteElement.style.fontSize = '30px'
            btn.textContent = 'Shrink'
        } else {
            quoteElement.style.fontSize = ''
            btn.textContent = 'Enlarge'
        }

    }



    const quoteForm = document.querySelector('#quote-form')
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const quoteInput = document.querySelector('#quote-input')
        const authorInput = document.querySelector('#author-input')
        const newQuote = {
            quote: quoteInput.value,
            author: authorInput.value
        }

        fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newQuote)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error fetching data!')
                } return res.json()
            })
            .then(quote => {
                console.log(quote)
                const quoteInput = document.querySelector('#quote-input')
                const authorInput = document.querySelector('#author-input')
                quoteInput.textContent = quoteInput
                authorInput.textContent = authorInput

                // const newQuoteCard = createQuoteCard(newQuote)
                // const quoteContainer = document.querySelector('#quote-container')
                // quoteContainer.appendChild(newQuoteCard)


            })



        // const quoteInput = document.querySelector('#quote-input')
        // const authorInput = document.getElementById('author-input')
        // const newQuote = {
        //     quote: quoteInput.value,
        //     author: authorInput.value
        // }
        // const newQuoteCard = createQuoteCard(newQuote)
        // const quoteContainer = document.querySelector('#quote-container')
        // quoteContainer.appendChild(newQuoteCard)


        quoteForm.reset()

    })



    fetchQuote()



})
