let currentPageUrl = 'https://swapi.dev/api/starships/'

onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
        let contador = document.getElementById('contador')
        c = 1
        contador.innerText = `${c} de 4`

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
    mainContent.innerHTML = ''; //Limpa os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starships) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('./starships/${starships.name}.webp')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${starships.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('./starships/${starships.name}.webp')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${starships.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Modelo: ${(starships.model)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Passageiros: ${(starships.passengers)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cap. de carga: ${(starships.cargo_capacity)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Velocidade: ${(starships.max_atmosphering_speed)}`

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
        contador.innerText = `${c} de 4`

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

 function convertEyeColor(eyeColor) {
    const cores = {
        white: "Branco",
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] ||eyeColor;
 }

 function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }
    return (height / 100).toFixed(2);
 }

 function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }
    return `${mass} kg`
 }
 function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }
    return birthYear
 }