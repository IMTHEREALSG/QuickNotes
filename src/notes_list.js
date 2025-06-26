import { LitElement,html,css } from "lit";
// import { customElement, property } from "lit/decorators.js";

export class NotesList extends LitElement {
    static properties ={
        notes : { type: Array },
        layout : {type: String}
    };

    constructor(){
        super();
        this.notes = [];
        this.layout = 'grid'; 
    }

    render(){
        return html`
        <div class="notes-list ${this.layout === 'list' ? '' : 'list-layout'}">
         ${this.notes.length > 0 ?
            this.notes.map(note=> this.renderNote(note)) :
            html`<div class="no-notes">No notes available</div>`
         }
        </div>
        `;
    }

    renderNote(note){
        return html`
        <div class="note-card">
         ${note.title ? html`<h3 class="note-title">${note.title}</h3>` : ''}
         <p class="note-content">${note.content}</p>
            <div class="note-footer">
             <span class="note-date">${new Date(note.createdAt).toLocaleDateString(undefined,{
                year: 'numeric',
                month: 'short',
                day: 'numeric'
             })}</span>
             <button class="delete-btn" @click=${this.deleteNote(note.id)}>Delete</button>
            </div>
        </div>
         `;
    }

    deleteNote(id) {
        this.dispatchEvent(new CustomEvent('note-deleted', {
            detail: { id },
            bubbles: true,
            composed: true
        }));
    }

}

customElements.define('notes-list', NotesList);