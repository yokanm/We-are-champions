import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={

	databaseURL: "https://realtime-database-51605-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")


const inputFieldEl = document.getElementById("input-field")
/* For stretch Goals
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
*/
const endorsementsUl = document.getElementById("endorsements")
const publishBtn = document.getElementById("publish-btn")


publishBtn.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(endorsementsInDB, inputValue)
    clearInputField()
})


onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
    clearEndorsementsUl()
    for(let i=0; i<endorsementsArray.length; i++){
        let currentEndorMsg = endorsementsArray[i]
        let currentEndorID = currentEndorMsg[0]
        let currentEndorValue = currentEndorMsg[1]
       appendEndorsementsUl(currentEndorMsg)
         
    }
    }else{
        endorsementsUl.innerHTML = "Kindly endorse"
    }
    
})


function clearInputField(){
    inputFieldEl.value = ""
}


function clearEndorsementsUl(){
    endorsementsUl.innerHTML=""
}


function appendEndorsementsUl(endorse){
     let endorseID = endorse[0]
     let endorseValue = endorse[1]
    let endorseEl= document.createElement("li")
    
    endorseEl.textContent = endorseValue
    
    endorseEl.addEventListener("dblclick",function(){
        let locationOfEndorseMsgInDB= ref(database, `endorsements/${endorseID}`)
        remove(locationOfEndorseMsgInDB)
    })
    
   endorsementsUl.append(endorseEl)
}
