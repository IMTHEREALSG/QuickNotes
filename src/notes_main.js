import './noteinput.js';
import './notes_list.js';
import { LitElement, html, css } from 'lit';

export class QuickNotesApp extends LitElement
{
    static properties={
        notes : { type: Array},
        viewMode : {type:String}
    }

    constructor(){
        super();
        this.notes = [];
        this.viewMode = 'grid';
        this.loadNotes();
    }

    static styles = css`
    :host{
        display: block;}`;

    render(){
        return html`
        <div class="app-container">
        <div class="header">
        <h1>Quick Notes</h1>
        <div class="view-controls">
           <button class="view-btn ${this.viewMode==='grid' ? 'active' : ''}" @click=${() => this.setViewMode('grid')}>Grid View</button>
           <button class="view-btn ${this.viewMode==='list' ? 'active' : ''}" @click=${() => this.setViewMode('list')}>List View</button>
        </div>
        </div>

        <note-input @note-saved=${this.saved}
        @note-cancelled=${this.cancelled}></note-input>

        <notes-list .notes=${this.notes} .layout=${this.viewMode}
        @note-deleted=${this.deleteNotes}></notes-list>
        `;
    }

    setActiveMode(mode) {
        this.viewMode = mode;
    }


    saved(e){
        const newNote = e.detail;
        this.notes = [...this.notes, newNote];
        localStorage.setItem('qnotes', JSON.stringify(this.notes));
    }
    cancelled(){
        
    }

    loadNotes(){
        const savedNotes = localStorage.getItem('qnotes');
        if(savedNotes){
            try {
                this.notes = JSON.parse(savedNotes);
            } catch (e) {
                console.error('Failed to parse notes from localStorage', e);
                this.notes = [];
            }
        }
    }
    deleteNotes(e){
        const noteId = e.detail.id;
        this.notes = this.notes.filter(note => note.id !== noteId);
        localStorage.setItem('qnotes', JSON.stringify(this.notes));
    }
}

customElements.define('quick-notes-app', QuickNotesApp);