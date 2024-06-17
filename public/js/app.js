const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
message1.textContent = "loading..."
message2.textContent=''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const location = searchElement.value
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
              
                message2.textContent = data.error
            }
            message1.textContent = data.address

           
        })
    })
})