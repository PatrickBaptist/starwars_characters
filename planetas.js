let currentPageUrl = 'https://swapi.dev/api/planets/'

onload = async () => {
    try {
        await loadCharacters(currentPageUrl)
        let contador = document.getElementById('contador')
        c = 1
        contador.innerText = `${c} de 6`

    } catch (error) {
        console.log(error);
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

 };

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planets) => {
            
            const card = document.createElement("div")
            card.style.backgroundImage = `url('./planetas/${planets.name}.webp')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${planets.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('./planetas/${planets.name}.webp')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${planets.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Clima: ${(planets.climate)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Terreno: ${(planets.terrain)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Populacao: ${(planets.population)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Diametro: ${(planets.diameter)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }
            mainContent.appendChild(card)
            
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error)
        }
}

 async function loadNextPage() {

    if (!currentPageUrl) return;


    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
        next = c++
        contador.innerText = `${c} de 6`

    } catch (error) {
        console.log(error)
    }
 }

 async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
        previous = c--
        contador.innerText = `${c} de 6`

    } catch (error) {
        console.log(error)
        alert('Error ao carregar a página anterior')
    }
 }

 function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
 }

