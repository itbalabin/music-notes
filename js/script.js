class Piano {
    constructor() {
        this.notes = {
            'до': '01_do.wav',
            'ре': '02_re.wav',
            'ми': '03_mi.wav',
            'фа': '04_fa.wav',
            'соль': '05_sol.wav',
            'ля': '06_la.wav',
            'си': '07_si.wav',
            'до+': '08_do.wav'
        };
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioBuffers = {};
        this.isLoaded = false;
        
        this.init();
    }
    
    async init() {
        await this.loadSounds();
        this.setupEventListeners();
    }
    
    async loadSounds() {
        try {
            for (const [note, file] of Object.entries(this.notes)) {
                const response = await fetch(`src/${file}`);
                const arrayBuffer = await response.arrayBuffer();
                this.audioBuffers[note] = await this.audioContext.decodeAudioData(arrayBuffer);
            }
            this.isLoaded = true;
            console.log('Все звуки загружены!');
        } catch (error) {
            console.error('Ошибка загрузки звуков:', error);
            alert('Не удалось загрузить звуковые файлы. Проверьте папку src/');
        }
    }
    
    setupEventListeners() {
        const buttons = document.querySelectorAll('.note-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const note = button.dataset.note;
                this.playNote(note);
            });
            
            // Добавляем обработчики для клавиатуры
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-5px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(-5px)';
            });
        });
        
        // Добавляем поддержку клавиатуры
        document.addEventListener('keydown', (e) => {
            const keyMap = {
                '1': 'до', '2': 'ре', '3': 'ми', '4': 'фа',
                '5': 'соль', '6': 'ля', '7': 'си', '8': 'до+'
            };
            
            if (keyMap[e.key]) {
                this.playNote(keyMap[e.key]);
                
                // Анимация нажатия кнопки
                const button = document.querySelector(`[data-note="${keyMap[e.key]}"]`);
                if (button) {
                    button.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        button.style.transform = 'translateY(-5px)';
                    }, 100);
                }
            }
        });
    }
    
    playNote(note) {
        if (!this.isLoaded) {
            console.warn('Звуки еще не загружены');
            return;
        }
        
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffers[note];
        source.connect(this.audioContext.destination);
        source.start();
    }
}

// Инициализация пианино когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    new Piano();
});
