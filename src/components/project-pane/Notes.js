import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';

import NoteForm from './NoteForm';
import uiud from 'uuidv4';
import NoteIcon from './../../img/note-icon.svg';
import RemoveIcon from './../../img/remove-icon.svg';
import AddIcon from './../../img/add-icon.svg';


export default class Notes extends Component {

  constructor(props){
    super(props);

    this.state = {
      showNoteForm : false,
    }
  }


  addNoteForm = () => {
    this.setState({ showNoteForm : true });
  }


  handleSaveNote(titleValue, rawContent){

    let newNote = { 
      id : uiud(),
      title : titleValue,
      note : rawContent,
      dateCreated: Date.now()
    }

    this.props.handleAddNoteToProject(newNote);
    console.log(newNote);

    this.setState({ showNoteForm : false  });

  }

  convertNote(rawNote){

    let realNote = JSON.parse(rawNote);
    let preview = realNote.blocks[0].text;

    return preview;

  }

  removeNote = (noteId) => {
    this.props.handleRemoveNote(noteId);
  }

  render() {  

    let { thisProjectNotes } = this.props;
    let { showNoteForm } = this.state;

    console.log(thisProjectNotes);

    let DisplayProjectNotes = thisProjectNotes.map((note) => {
        return (
          <div key={note.id} className="note-block">
              <span className="note-title">{note.title}</span>
              <span className="note-text">{this.convertNote(note.note)}</span>
              <button type="button" className="icon-btn" onClick={() => this.removeNote(note.id)}>
                <img src={RemoveIcon} alt="" className="remove-icon" />                          
              </button>
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


        {
          showNoteForm && 
            <NoteForm 
              handleSaveNote = {this.handleSaveNote.bind(this)}
            />
        }
        <div className="noteBlock-container">
          {DisplayProjectNotes}

          <button className="icon-btn" type="button" onClick={this.addNoteForm}>
            <img className="icon" src={AddIcon} alt="" />
            New Note
          </button>
        </div>
      </div>
    )
  }
}
