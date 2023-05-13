const token = "63e48bef9e6d1c102da0bae8"
const baseURL = "https://dummyapi.io/data/v1/"
document.querySelector(".create_button").addEventListener("click" , () => {
    const firstname = document.querySelector(".firstname_inp").value
    const lastName = document.querySelector(".lastname_inp").value
    const email = document.querySelector(".email_input").value
    fetch(baseURL + "user/create" , {
        method : "POST",
        body : JSON.stringify({
            firstName : firstname,
            lastName : lastName,
            email : email
        }),
        headers : {
            "app-id" : token,
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("id" , data.id)
        const id = localStorage.getItem("id")
        const text = document.querySelector("textarea").value
        fetch(baseURL + "post/create" , {
            method : "POST",
            body : JSON.stringify({
                text : text,
                owner : id
            }),
            headers : {
                "app-id" : token,
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            document.querySelector("p").innerHTML = data.text
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
    document.querySelector(".welcome").style.display = "block"
    document.querySelector(".log_out").style.display = "block"
    document.querySelector(".Create_Sign").style.display = "none"
    document.querySelector(".span_firstName").innerHTML = firstname
    document.querySelector(".profile").innerHTML = firstname
    document.querySelector(".span_lastName").innerHTML = lastName
    document.querySelector(".shape").style.display = "block"
})
document.querySelector(".remove_button").addEventListener("click" , () => {
    const id = localStorage.getItem("id")
    fetch(baseURL + "user/" + id , {
        method : "DELETE",
        headers : {
            "app-id" : token
        }
    })
    document.querySelector(".firstname_inp").value = ""
    document.querySelector(".lastname_inp").value = ""
    document.querySelector(".email_input").value = ""
    document.querySelector("textarea").value = ""
    document.querySelector("p").innerHTML = ""
    document.querySelector(".welcome").style.display = "none"
    document.querySelector(".log_out").style.display = "none"
    document.querySelector(".Create_Sign").style.display = "block"
    document.querySelector(".shape").style.display = "none"
})