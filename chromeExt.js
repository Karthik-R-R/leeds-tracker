myLeads = []
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById('input-btn')
const tabBtn = document.getElementById('tab-btn')
const deleteBtn = document.getElementById('delete-btn')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)


tabBtn.addEventListener('click', function(){
    // console.log(tabs[0].url)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads',JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ''
    for(let i=0;i<leads.length;i++){
    listItems += `<li>
    <a target="_blank" href="${leads[i]}" >${leads[i]}
    </a>
    </li>`

    // const li = document.createElement("li")  //Second 
    // li.textContent = myLeads[i]              //way to
    // ulEl.append(li)                          //do it
    }
ulEl.innerHTML = listItems
}

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

deleteBtn.addEventListener('dblclick', function(){
    console.log('Double Clicked!')
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click',function(){
    myLeads.push(inputEl.value)
    inputEl.value=''
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

