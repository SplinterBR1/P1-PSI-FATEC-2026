'use strict'
const input = document.getElementById('buscar')
const cards = document.getElementById('cards')

async function showCard() {
    cards.textContent = ''

    const url = `https://swapi.dev/api/people/?search=${input.value}`
    const response = await fetch(url)
    const data = await response.json()

    const personagens = data.results
    personagens.map(personagem => {
        const card = document.createElement('div')
        card.classList.add('card')

        const title = document.createElement('h3')
        title.textContent = personagem.name
        title.classList.add('nome-personagem')

        const description = document.createElement('div')
        description.classList.add('description')
        
        const gender = document.createElement('p')
        gender.textContent = 'Gênero: ' + personagem.gender

        const height = document.createElement('p')
        height.textContent = 'Altura: ' + personagem.height + 'cm'

        const hairColor = document.createElement('p')
        hairColor.textContent = 'Cor do cabelo: ' + personagem.hair_color

        const skinColor = document.createElement('p')
        skinColor.textContent = 'Cor da pele: ' + personagem.skin_color

        const eyeColor = document.createElement('p')
        eyeColor.textContent = 'Cor dos olhos: ' + personagem.eye_color

        description.append(gender, height, hairColor, skinColor, eyeColor)
        card.append(title, description)
        cards.appendChild(card)
    })
}

// ACESSIBILIDADE
function alterarFonte(valor) {
    const pagina = document.getElementById('pagina')
    if (!pagina) return

    let tamanho = parseFloat(window.getComputedStyle(pagina).fontSize)
    let novoTamanho = tamanho + valor

    if (novoTamanho < 10) novoTamanho = 10
    if (novoTamanho > 40) novoTamanho = 40

    pagina.style.fontSize = novoTamanho + 'px';
    localStorage.setItem('tamanhoFonte', novoTamanho)
}

window.addEventListener('DOMContentLoaded', () => {
    const pagina = document.getElementById('pagina')
    const tamanhoSalvo = localStorage.getItem('tamanhoFonte')

    if (pagina && tamanhoSalvo) {
        pagina.style.fontSize = tamanhoSalvo + 'px'
    }
});

function restaurarFonte() {
    const pagina = document.getElementById('pagina')
    
    if (!pagina) return
    localStorage.removeItem('tamanhoFonte')
    pagina.style.fontSize = ''
}
