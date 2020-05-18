'use strict'

let notes = getSavedNotes()

const filters = {
	searchText: '',
	sortBy: 'byEdited'
}




renderNotes(notes,filters)

// mdn is the document that is basically the key for the JavaScript to interact with HTML
document.querySelector('#create-note').addEventListener('click',function(e){// The first argument is when we will do somethng and the seocond one is a function that dectates what we will do 
	const id = uuidv4()
	const timestamp = moment().valueOf()
	notes.push({
		id: id,
		title: '',
		body: '',
		createdAt: timestamp,
		updatedAt: timestamp

	})
	saveNotes(notes)
	location.assign(`./edit.html#${id}`)
}) 

// debugger

document.querySelector('#search-text').addEventListener('input',(e) => { // change is when we have changes and input is in every second that we have even a different letter 
	// console.log(e.target.value) // the target is for having access to the ellement and the value is the actual characters
	filters.searchText = e.target.value
	renderNotes(notes,filters)
})

document.querySelector('#filter-by').addEventListener('change',(e) => {
	filters.sortBy = e.target.value
	renderNotes(notes,filters)
})


window.addEventListener('storage',(e) => {
	if (e.key === 'notes'){
		notes = JSON.parse(e.newValue)
		renderNotes(notes,filters)
	}


	
})

const now = moment()
console.log(now.toString())