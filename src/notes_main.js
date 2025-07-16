import './noteinput.js';
import './notes_list.js';
import { LitElement, html, css } from 'lit';

export class QuickNotesApp extends LitElement {
    static properties = {
        notes: { type: Array },
        viewMode: { type: String }
    }

    constructor() {
        super();
        this.notes = [];
        this.viewMode = 'grid';
        this.loadNotes();
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .app-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 16px;
            padding: 24px;
            margin: 20px 0;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            padding: 20px 0;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px 24px;
            backdrop-filter: blur(10px);
        }

        .app-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2d3748;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .view-controls {
            display: flex;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .view-btn {
            padding: 8px 16px;
            border: none;
            background: transparent;
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 80px;
            position: relative;
            overflow: hidden;
        }

        .view-btn:hover {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
            transform: translateY(-1px);
        }

        .view-btn.active {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
            transform: translateY(-1px);
        }

        .view-btn.active:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .stats {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.9);
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            flex: 1;
            min-width: 120px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: #3b82f6;
            display: block;
            margin-bottom: 4px;
        }

        .stat-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .content {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 16px;
            padding: 24px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
            :host {
                padding: 0 16px;
            }

            .app-container {
                margin: 10px 0;
                padding: 16px;
                border-radius: 12px;
            }

            .header {
                flex-direction: column;
                gap: 16px;
                text-align: center;
                padding: 16px;
            }

            .app-title {
                font-size: 1.5rem;
            }

            .view-controls {
                width: 100%;
                justify-content: center;
            }

            .view-btn {
                flex: 1;
            }

            .stats {
                justify-content: center;
            }

            .stat-card {
                min-width: 100px;
            }

            .content {
                padding: 16px;
            }
        }

        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
            color: #6b7280;
        }

        .loading::before {
            content: '';
            width: 20px;
            height: 20px;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 12px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Smooth entry animation */
        .app-container {
            animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideIn {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .view-btn:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        .header, .content {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }

        /* Subtle animations */
        .stat-card {
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }
    `;

    render() {
        return html`
        <div class="app-container">
            <div class="header">
                <h1 class="app-title">✍️ QuickNotes</h1>
                <div class="view-controls">
                    <button 
                        class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" 
                        @click=${() => this.setViewMode('grid')}
                        aria-label="Grid view"
                    >
                        📋 Grid
                    </button>
                    <button 
                        class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" 
                        @click=${() => this.setViewMode('list')}
                        aria-label="List view"
                    >
                        📄 List
                    </button>
                </div>
            </div>

            <div class="stats">
                <div class="stat-card">
                    <span class="stat-number">${this.notes.length}</span>
                    <span class="stat-label">Total Notes</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${this.getNotesThisWeek()}</span>
                    <span class="stat-label">This Week</span>
                </div>
            </div>

            <div class="content">
                <note-input 
                    @note-saved=${this.saved}
                    @note-cancelled=${this.cancelled}>
                </note-input>

                <notes-list 
                    .notes=${this.notes} 
                    .layout=${this.viewMode}
                    @note-deleted=${this.deleteNotes}>
                </notes-list>
            </div>
        </div>
        `;
    }

    setViewMode(mode) {
        this.viewMode = mode;
    }

    saved(e) {
        const newNote = e.detail;
        this.notes = [...this.notes, newNote];
        this.saveNotes();
    }

    cancelled() {
        console.log('Note input cancelled');
  }

    loadNotes() {
        const savedNotes = localStorage.getItem('qnotes');
        if (savedNotes) {
            try {
                this.notes = JSON.parse(savedNotes);
            } catch (e) {
                console.error('Failed to parse notes from localStorage', e);
                this.notes = [];
            }
        }
    }

    saveNotes() {
        localStorage.setItem('qnotes', JSON.stringify(this.notes));
    }

    deleteNotes(e) {
        const noteId = e.detail.id;
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.saveNotes();
    }

    getNotesThisWeek() {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return this.notes.filter(note => 
            new Date(note.createdAt) > weekAgo
        ).length;
    }

    getTotalWords() {
        return this.notes.reduce((total, note) => {
            const titleWords = note.title ? note.title.split(/\s+/).length : 0;
            const contentWords = note.content ? note.content.split(/\s+/).length : 0;
            return total + titleWords + contentWords;
        }, 0);
    }
}

customElements.define('quick-notes-app', QuickNotesApp);