import React, { Component } from 'react';
import NoteForm from './NoteForm';
import uiud from 'uuidv4';
import NoteIcon from './../../img/note-icon.svg';

export default class Notes extends Component {

  handleAddNewNote(titleValue, noteValue){

    let note = { 
      id : uiud(),
      title : titleValue,
      note : noteValue,
      dateCreated: Date.now()
    }

    this.props.handleAddNoteToProject(note);

  }

  render() {  

    let { thisProjectNotes } = this.props;

    let DisplayProjectNotes = thisProjectNotes.map((note) => {
        return (
          <div key={note.id} className="note-block">
              <span className="note-title">{note.title}</span>
              <span className="note-text">{note.note}</span>
          </div>
        )
    })

    return (
      <div className="project-notes">
        <div className="title-block">
          <img src={NoteIcon} alt="" className="title-icon" />            
          <h3 className="title-copy">
              Notes 
          </h3>
        </div>
        {/* <NoteForm 
          handleAddNewNote = {this.handleAddNewNote.bind(this)}
        /> */}
        {DisplayProjectNotes}
      </div>
    )
  }
}
