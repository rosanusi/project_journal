import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import React, { Component } from 'react';
import closeIcon from './../../img/close-btn.svg';

export default class NoteForm extends Component {

    constructor(){
        super();

        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount() {
        this.noteEditor && this.noteEditor.focus(); // or however you want
    }


    closeNoteForm = () => {
        this.props.handleCloseForm();
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
      
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
      
        return 'not-handled';
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    
    onToggleCode = () => {
        this.onChange(RichUtils.toggleCode(this.state.editorState));
    }

      
    onChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        // this.saveContent(contentState);
        
        this.setState({
          editorState,
        });

        console.log(convertToRaw(contentState));
        // console.log(convertToRaw(this.state.editorState));
    }

    onSave(e) {

        e.preventDefault();
        let titleValue = this.refs.titleRef.value;

        let editorState = this.state.editorState;
        let contentState = editorState.getCurrentContent();
        let rawStringContent = JSON.stringify(convertToRaw(contentState));
        
        console.log(titleValue);
        console.log(rawStringContent);

        this.props.handleSaveNote(titleValue, rawStringContent);

    }



    render() {
        return (
            <div className="note-form-container">
                <button 
                    className="close-btn"
                    type="submit" 
                    onClick={this.closeNoteForm}
                >
                    <img className="remove-icon" src={closeIcon} alt="" />
                </button>
                <form className="note-form" onSubmit={this.onSave.bind(this)}>
                    {/* <button className="close-btn" type="button">Close</button> */}
                    <input type="text" className="note-form-title" ref="titleRef" placeholder="Title of the note you are writing"/>
                    {!this.state.editorState &&
                        <h3 className="loading">Loading...</h3>
                    }
                    {this.state.editorState &&                        
                        <Editor 
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            ref={noteEditor => this.noteEditor = noteEditor}
                            className="note-editor"
                        />
                    }
                    {/* <span onClick={this.onUnderlineClick}>Underline</span>
                    <span onClick={this.onToggleCode}>Code Block</span> */}
                    <button 
                        className="note-form-btn"
                        type="submit" 
                    >
                        Save Note
                    </button>
                </form>
            </div>
        )
    }
    
}
