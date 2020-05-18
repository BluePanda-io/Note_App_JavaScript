'use strict'

// read existing notes from localStorage
const getSavedNotes = function(){
	const notesJSON = localStorage.getItem('notes')

	try{
		return notesJSON ? JSON.parse(notesJSON) : []
	} catch (e){
		return []
	}
	
}

// save the notes to localStorage
const saveNotes = (notes) => {
	localStorage.setItem('notes',JSON.stringify(notes))
}


// remove a note from a list
const removeNote = function(id){
	const noteIndex = notes.findIndex( (note) => note.id === id)

	if (noteIndex >-1){
		notes.splice(noteIndex,1)
	}
}
// Generate the DOM structure for a note 
const generateNoteDOM = function(note){
	const noteEl = document.createElement('a')
	const textEl = document.createElement('p')
	// const button = document.createElement('button')
	const statusEl = document.createElement('p')

	// button.textContent = 'x'
	// noteEl.appendChild(button)


	// button.addEventListener('click', () => {
	// 	removeNote(note.id)
	// 	saveNotes(notes)
	// 	renderNotes(notes,filters)
	// })

	if (note.title.length>0){
		textEl.textContent = note.title
		 
	} else {
		textEl.textContent = 'Unnamed note'
	}
	textEl.classList.add('list-item__title')
	noteEl.appendChild(textEl)



	noteEl.setAttribute('href',`./edit.html#${note.id}`)
	noteEl.classList.add('list-item')


	statusEl.textContent = generateLastEdited(note.updatedAt)
	statusEl.classList.add('list-item__subtitle')
	noteEl.appendChild(statusEl)


	return noteEl
}

// sort your ntoes by one of three ways
const sortNotes = (notes,sortBy) => {
	if (sortBy === 'byEdited'){
		return notes.sort( (a,b) => {
			if (a.updatedAt>b.updatedAt){
				return -1
			} else if (a.updatedAt>b.updatedAt){
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === 'byCreated'){
		return notes.sort((a,b) => {
			if (a.createdAt>b.createdAt){
				return -1
			} else if (a.createdAt>b.createdAt){
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === 'alphabetical'){
		return notes.sort((a,b) => {
			if (a.title.toLowerCase()<b.title.toLowerCase()){
				return -1
			} else if (a.title.toLowerCase()>b.title.toLowerCase()){
				return 1
			} else {
				return 0
			}
		})
	} else  {
		return notes
	}
}

//render application notes
const renderNotes = function (notes,filters){
	const notesEl = document.querySelector('#notes')
	notes = sortNotes(notes, filters.sortBy)
	const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()) )
	

	notesEl.innerHTML='' // basically we delete everything here

	if (filteredNotes.length>0){
		filteredNotes.forEach(function(note){
			const noteEl = generateNoteDOM(note)
			notesEl.appendChild(noteEl)
		})
	}else{
		const emptyMessage = document.createElement('p')
		emptyMessage.textContent = "No notes to Show "
		emptyMessage.classList.add("empty-message")
		notesEl.appendChild(emptyMessage)
	}
}


// Generate the last edited message
const generateLastEdited = function(timestamp){
	return `Last edited ${moment(timestamp).fromNow()}`
}