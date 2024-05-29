
document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.querySelector('#quote-container')
    let enlarge = false

    function fetchQuotes() {
        fetch('http://localhost:3000/quotes')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error fetching quotes!')
                }
                return res.json()
            })
            .then(data => {
                data.forEach(quote => {
                    createQuoteCard(quote)
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

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('danger')
        deleteBtn.textContent = 'delete'
        deleteBtn.addEventListener('click', () => {
            handleDelete(quoteData.id, quoteCard)
        })



        enlargeBtn.classList.add('btn')
        enlargeBtn.addEventListener('click', () => {
            toggleQuoteSize(quoteText, enlargeBtn)
        })

        quoteCard.appendChild(quoteText)
        quoteCard.appendChild(author)
        quoteCard.appendChild(enlargeBtn)
        quoteCard.appendChild(deleteBtn)


        quoteContainer.appendChild(quoteCard)

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



    function createNewQuote() {
        const quoteForm = document.querySelector('#quote-form')
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const quoteInput = document.querySelector('#quote-input')
            const authorInput = document.querySelector('#author-input')
            const newQuote = {
                quote: quoteInput.value,
                author: authorInput.value,
                like: 0
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
                    }
                    return res.json()
                })
                .then(quote => {
                    
                    createQuoteCard(quote)
                })
                .catch(e => {
                    console.error('Error: ', e)
                })
                .finally(() => {
                    quoteForm.reset()
                })
        })
    }

    function dropDownMenu() {
        const selectAuthor = document.querySelector('#name')
        selectAuthor.addEventListener('change', () => {
            const selectedAuthorId = selectAuthor.value
            selectHandler(selectedAuthorId)
        })
    }

    function selectHandler(authorId) {
        fetch(`http://localhost:3000/quotes/${authorId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error fetching data!')
                }
                return res.json()
            })
            .then(data => {
                const textBox = document.querySelector('#quote-description')
                textBox.value = data.description

                reSelectAuthor()
            })
            .catch(e => {
                console.error('Error: ', e)
            })
    }

    function reSelectAuthor() {
        const dropdownNames = document.querySelector('#name')
        dropdownNames.selectedIndex = 0
    }

    function handleDelete(quoteId, card) {
        fetch(`http://localhost:3000/quotes/${quoteId}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error deleting quote!')
                }
                return res.json()
            })
            .then(data => {
                quoteContainer.removeChild(card)
            })
            .catch(e => {
                console.error('Error: ', e)
            })
    }

    fetchQuotes()
    createNewQuote()
    dropDownMenu()
    reSelectAuthor()
})
