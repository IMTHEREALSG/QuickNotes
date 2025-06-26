import { LitElement,html,css } from "lit";
export class NoteInput extends LitElement{
    static properties = {
        title : {
            type: String
        },
        content:{
            type: String
        },
        collapsed:{
            type: Boolean
        },
        buttonText:{
            type: String
        }
    }
    constructor(){
        super();
        this.title='';
        this.content='';
        this.collapsed=false;
        this.buttonText='Save';
    }


    render(){
        return html`
        <div class="note-input ${this.collapsed ? 'collapsed' : ''}">
            <input 
            class="title-input"
            type="text" 
            placeholder="Title"
            .value=${this.title}
            @input=${(e)=> this.title = e.target.value}
            @focus=${()=> this.collapsed = false}
            />
            <textarea
             class="content-input"
             placeholder="Take a Note..."
             .value=${this.content}
                @input=${(e)=> this.content = e.target.value}
            ></textarea>
            <div class="actions">
            <button
            class="save" 
            @click=${this.savenote}>${this.buttonText}</button>
            <button class="cancel" @click=${this.cancelnote}>Cancel</button>
            </div>
        </div>
        `;



    }


    savenote(){
        if(!this.title.trim() && !this.content.trim()){
            alert('Title and content cannot be empty');
            return;
        }

        const note = {
            id: Date.now().toString(),
            title: this.title.trim(),
            content: this.content.trim(),
            createdAt: new Date().toISOString(),
        }

        this.dispatchEvent(new CustomEvent('note-saved',{
            detail: note,
            bubbles: true,
            composed: true
        }));

        this.title = '';
        this.content = '';
        this.collapsed = true;
    }

    cancelnote(){
        this.dispatchEvent(new CustomEvent('note-cancelled', {
            bubbles: true,
            composed: true
        }));
        this.title = '';
        this.content = '';
        this.collapsed = true;
    }
}

customElements.define('note-input', NoteInput);