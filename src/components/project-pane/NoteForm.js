import React, { Component } from 'react'

export default class NoteForm extends Component {

    addNewNote(e) {
        e.preventDefault();

        let titleValue = this.refs.titleRef.value;
        let noteValue = this.refs.noteRef.value;

        this.props.handleAddNewNote(titleValue, noteValue);

    }

    render() {
        return (
            <form className="note-form" onSubmit={(e) => this.addNewNote(e)}>
                <input type="text" ref="titleRef" placeholder="title" />
                <textarea ref="noteRef" placeholder="write your note here"></textarea>
                <button type="submit">Save Note</button>
            </form>
        )
    }
}
