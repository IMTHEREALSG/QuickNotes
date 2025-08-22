import { LitElement, html, css } from "lit";

export class NoteInput extends LitElement {
    static properties = {
        title: {
            type: String
        },
        content: {
            type: String
        },
        collapsed: {
            type: Boolean
        },
        buttonText: {
            type: String
        },
        isEditing: {
            type: Boolean
        },
        editingNote: {
            type: Object
        }
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            max-width: 600px;
            margin: 0 auto 24px auto;
        }

        .note-input {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border: 1px solid #e5e7eb;
            padding: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .note-input:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            border-color: #d1d5db;
        }

        .note-input.collapsed {
            padding: 12px 16px;
            cursor: pointer;
        }

        .note-input.collapsed:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .title-input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            background: transparent;
            padding: 8px 0;
            margin-bottom: 8px;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;
            font-family: inherit;
            resize: none;
        }

        .title-input:focus {
            border-bottom-color: #3b82f6;
        }

        .title-input::placeholder {
            color: #9ca3af;
            font-weight: 400;
            font-size: 16px;
        }

        .note-input.collapsed .title-input::placeholder {
            color: #6b7280;
            font-size: 15px;
        }

        .content-input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 14px;
            color: #374151;
            background: transparent;
            resize: vertical;
            min-height: 80px;
            max-height: 300px;
            padding: 8px 0;
            margin-bottom: 16px;
            font-family: inherit;
            line-height: 1.6;
            transition: opacity 0.3s ease, max-height 0.3s ease;
        }

        .content-input::placeholder {
            color: #9ca3af;
            font-style: italic;
        }

        .note-input.collapsed .content-input {
            opacity: 0;
            max-height: 0;
            margin: 0;
            padding: 0;
            pointer-events: none;
        }

        .actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f3f4f6;
            transition: opacity 0.3s ease, max-height 0.3s ease;
        }

        .note-input.collapsed .actions {
            opacity: 0;
            max-height: 0;
            padding: 0;
            border: none;
            pointer-events: none;
        }

        .save, .cancel {
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 70px;
            font-family: inherit;
            position: relative;
            overflow: hidden;
        }

        .save {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }

        .save:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .save:active {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .save:disabled {
            background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .cancel {
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
        }

        .cancel:hover {
            background: #f1f5f9;
            color: #475569;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .cancel:active {
            transform: translateY(0);
            background: #e2e8f0;
        }

        /* Focus states for accessibility */
        .save:focus-visible, .cancel:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
            :host {
                margin: 0 16px 20px 16px;
            }
            
            .note-input {
                border-radius: 8px;
                padding: 12px;
            }
            
            .actions {
                flex-direction: column-reverse;
                gap: 8px;
            }
            
            .save, .cancel {
                width: 100%;
                padding: 12px 16px;
                font-size: 15px;
            }

            .title-input {
                font-size: 16px; /* Prevents zoom on iOS */
            }
        }

        .note-input.collapsed .title-input {
            cursor: pointer;
            padding: 12px 0;
        }

        .note-input:not(.collapsed) {
            animation: expandIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes expandIn {
            0% {
                max-height: 60px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }
            100% {
                max-height: 400px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            }
        }
    `;

    constructor() {
        super();
        this.title = '';
        this.content = '';
        this.collapsed = true; 
        this.buttonText = 'Save';
        this.isEditing = false;
        this.editingNote = null; 
    }

    render() {
        const hasContent = this.title.trim() || this.content.trim();
        
        return html`
        <div class="note-input ${this.collapsed ? 'collapsed' : ''}">
            <input 
                class="title-input"
                type="text" 
                placeholder="${this.collapsed ? 'Take a note...' : 'Note title (optional)'}"
                .value=${this.title}
                @input=${(e) => this.title = e.target.value}
                @focus=${() => this.collapsed = false}
            />
            
            ${!this.collapsed ? html`
                <textarea
                    class="content-input"
                    placeholder="Write your thoughts here..."
                    .value=${this.content}
                    @input=${(e) => this.content = e.target.value}
                    @keydown=${this._handleKeydown}
                ></textarea>
                
                <div class="actions">
                    <button 
                        class="cancel" 
                        @click=${this.cancelnote}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button 
                        class="save" 
                        ?disabled=${!hasContent}
                        @click=${this.savenote}
                        type="button"
                    >
                        ${this.buttonText}
                    </button>
                </div>
            ` : ''}
        </div>
        `;
    }

    _handleKeydown(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (this.title.trim() || this.content.trim()) {
                this.savenote();
            }
        }
       
        if (e.key === 'Escape') {
            e.preventDefault();
            this.cancelnote();
        }
    }

    savenote() {
        if (!this.title.trim() && !this.content.trim()) {
            return;
        }

        if(this.isEditing && this.editingNote){
            const updatedNote = {
                ...this.editingNote,
                title: this.title.trim(),
                content: this.content.trim(),
                updatedAt: new Date().toISOString()
            };
            this.dispatchEvent(new CustomEvent('note-updated',{
                detail: updatedNote,
                bubbles: true,
                composed: true
            }));
        }else{
            const newNote = {
                id : Date.now().toString(),
                title: this.title.trim(),
                content: this.content.trim(),
                createdAt: new Date().toISOString(),
            };

            this.dispatchEvent(new CustomEvent('note-saved',{
                detail: newNote,
                bubbles: true,
                composed: true
            }));
        }

        this.title = '';
        this.content = '';
        this.collapsed = true;
        this.buttonText = 'Save';
        this.isEditing = false;
        this.editingNote = null;
    }

    cancelnote() {
        this.dispatchEvent(new CustomEvent('note-cancelled', {
            bubbles: true,
            composed: true
        }));

        this.title = '';
        this.content = '';
        this.collapsed = true;
    }


    startEdit(note){
        this.title = note.title || '';
        this.content = note.content || '';
        this.collapsed = false;
        this.isEditing = true;
        this.editingNote = note;
        this.buttonText = 'Update';

        this.updateComplete.then(()=>{
            const titleInput = this.shadowRoot.querySelector('.title-input');
            if (titleInput) {
                titleInput.focus();
            }
        });
    }
}

customElements.define('note-input', NoteInput); 