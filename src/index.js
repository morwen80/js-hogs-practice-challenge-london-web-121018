const JSON_URL = "http://localhost:3000/hogs/"

const hogsContainer = document.querySelector('#hog-container')
const hogForm = document.querySelector('#hog-form')
const newHogNameInput = document.querySelector('input[name="name"]')
const newHogSpecialtyInput = document.querySelector('input[name="specialty"]')
const newHogMedalInput = document.querySelector('input[name="medal"]')
const newHogWeightInput = document.querySelector('input[name="weight"]')
const newHogImgInput = document.querySelector('input[name="img"]')
const newHogGreasedInput = document.querySelector('input[name="greased"]')

const renderHogs = () => {
  return fetch(JSON_URL)
  .then(resp => resp.json())
}

const renderSingleHog = (hog) => {
  const hogEl = document.createElement('div')
  hogEl.className = "hog-card"
    hogEl.innerHTML = `
      <h2>${hog.name}</h2>
      <img src="${hog.image}">
      <h4>Specialty: ${hog.specialty}</h4>
      Weight:
      ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}
      <br>
      Highest medal achieved: ${hog["highest medal achieved"]}
      <br>
      Greased: ${hog.greased}
      <br>
    `
    hogsContainer.append(hogEl)

    const deleteHogBtn = document.createElement('BUTTON')
      deleteHogBtn.className = "deleteHog"
      deleteHogBtn.innerText = "Delete this Hog"
      deleteHogBtn.dataset.id = hog.id
      hogEl.append(deleteHogBtn)

      deleteHogBtn.addEventListener("click", (e) => {
        hogId = e.target.dataset.id
        deleteHogFromServer(hogId)
      })
}

    const renderAllHogs = (hogs) => {
      hogs.forEach(renderSingleHog)
    }


///////////////////////// CREATE NEW HOG
  hogForm.addEventListener("submit", (e) => {
    e.preventDefault()

    newHog = {
      name: newHogNameInput.value,
      specialty: newHogSpecialtyInput.value,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": newHogWeightInput.value,
      "highest medal achieved": newHogMedalInput.value,
      image: newHogImgInput.value,
      greased: newHogGreasedInput.value
    }

    addNewHogToServer(newHog).then(renderSingleHog)
    hogForm.reset();
  })

const addNewHogToServer = (hog) => {
  return fetch(JSON_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hog)
  }).then(res => res.json())
}


////////////////////////////  DELETE HOG
const deleteHogFromServer = (hogId) => {
  return fetch(JSON_URL + `${hogId}`, {
    method: 'DELETE'
  }).then(res => res.json())
}

renderHogs().then(renderAllHogs)
