const NotesTemplates = {
    defaultImg: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=500',

    getNoteCard: function (note) {
        const archiveBtnHtml = note.isArchived
            ? `<button class="btn-archive-note btn-unarchive w-100" data-id="${note.id}"><i class="fas fa-box-open"></i> Распаковать.</button>`
            : `<button class="btn-archive-note w-100" data-id="${note.id}"><i class="fas fa-archive"></i> До архіва</button>`;

        return `
            <div class="col-12 col-md-4 mb-3" id="note-${note.id}">
                <div class="note-card">
                    <div class="note-img-wrapper">
                        <img src="${note.img}" class="note-img-top preview-trigger" alt="Note Image" onerror="this.onerror=null; this.src='${this.defaultImg}';">
                    </div>
                    <div class="note-body">
                        <div class="note-date">${note.date}</div>
                        <div class="note-title">${note.title}</div>
                        
                        <div class="note-text-container">
                            <div class="note-text">${note.text}</div>
                        </div>
                        
                        <div class="note-buttons-wrapper">
                            <div class="row g-2">
                                <div class="col-6">
                                    ${archiveBtnHtml}
                                </div>
                                <div class="col-6">
                                    <button class="btn-edit-note w-100 text-center" data-id="${note.id}">
                                        <i class="fas fa-edit"></i> Рєдактіровать
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    },


    getRulesModal: function () {
        return `
            <div class="custom-modal-form p-2">
                <p class="mb-3 fs-5 text-center" style="color: #4fc3f7; font-weight: bold;">📜 Правила</p>
                
                <ul style="text-align: left; line-height: 1.6; color: #413e37; list-style-type: square;">
                    <li>Кожна нотатка <b>ПОВИННА</b> мати заголовок та опис.</li>
                    <li>Можно загрузити з пристрою або за посіланням картинки</li>
                    <li>Не потрібні нотатки можно закинути до <b>Архіву</b>, щоб осбободити місце.</li>
                    <li>Дуже секрітний сброс бази даних сайту робитця по жмаканью підряд 3 рази по назві додатку <b>Super Awesome Notes</b> </li>
                </ul>
                <hr style="border-color: rgba(255,255,255,0.15);">
                
                <div class="mt-3 text-center">
                    <p class="text-danger small mb-2">Краще не жми кнопку знизу:</p>
                    <button type="button" id="start-chaos-btn" class="btn btn-danger btn-sm px-4">
                        Щяс буде капець
                    </button>
                </div>
            </div>
        `;
    },

    getAtmosphereModal: function () {
        return `
            <div class="custom-modal-form text-white p-2" style="text-align: left;">
                <p class="mb-3 fs-5 text-center" style="color: #4fc3f7; font-weight: bold;">Настройка атмосфери</p>
                
                <div class="mb-3">
                    <label class="form-label text-white-50 small d-block mb-2">Колір підсвітки інтерфейса:</label>
                    <div class="d-flex gap-2">
                        <button class="btn-color-pick" data-color="#00ffff" style="background: #00ffff; width:30px; height:30px; border-radius:50%; border:2px solid #fff;"></button>
                        <button class="btn-color-pick" data-color="#ff1744" style="background: #ff1744; width:30px; height:30px; border-radius:50%; border:none;"></button>
                        <button class="btn-color-pick" data-color="#00e676" style="background: #00e676; width:30px; height:30px; border-radius:50%; border:none;"></button>
                        <button class="btn-color-pick" data-color="#ffb300" style="background: #ffb300; width:30px; height:30px; border-radius:50%; border:none;"></button>
                        <button class="btn-color-pick" data-color="#d500f9" style="background: #d500f9; width:30px; height:30px; border-radius:50%; border:none;"></button>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label text-white-50 small mb-1">🖼️ Вибрать Обоі:</label>
                    <select id="select-bg-video" class="form-select bg-dark text-white border-secondary text-sm">
                        <option value="images/270983.mp4">Стокові обоі</option>
                        <option value="images/bg2.mp4">Обоі #2</option>
                        <option value="images/bg3.mp4">Обоі #3</option>
                        <option value="images/bg4.mp4">Обоі #4</option>
                    </select>
                </div>

                <div class="mb-2">
                    <label class="form-label text-white-50 small mb-1">🎵 Пісні для лютого вайбкодингу:</label>
                    <select id="select-bg-music" class="form-select bg-dark text-white border-secondary text-sm">
                        <option value="">Без пісні🔇</option>
                        <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">Lo-Fi (Трек 1)</option>
                        <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3">Ембіент (Трек 2)</option>
                        <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3">Фокус (Трек 3)</option>
                        <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3">Ретро (Трек 4)</option>
                        <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3">Косміческий кодінг (Трек 5)</option>
                    </select>
                </div>
            </div>
        `;
    },

    getForm: function (title = '', text = '', img = '', isEdit = false) {
        const isUrl = !img.startsWith('data:image');
        return `
            <div class="p-2 custom-modal-form">
                <div class="mb-2">
                    <label class="form-label text-dark fw-bold m-0">Заголовок</label>
                    <input type="text" id="modal-note-title" class="form-control" value="${title}" placeholder="Заголовок треба...">
                </div>
                <div class="mb-2">
                    <label class="form-label text-dark fw-bold m-0">Опісаніє</label>
                    <textarea id="modal-note-text" class="form-control" rows="3" placeholder="Напіші шось тут...">${text}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label text-dark fw-bold mb-1 d-block">Фотачка</label>
                    <div class="btn-group w-100 mb-2" role="group">
                        <input type="radio" class="btn-check" name="img-type" id="type-url" autocomplete="off" ${isUrl ? 'checked' : ''}>
                        <label class="btn btn-outline-primary btn-sm" for="type-url">Посилка (URL)</label>
                        <input type="radio" class="btn-check" name="img-type" id="type-file" autocomplete="off" ${!isUrl ? 'checked' : ''}>
                        <label class="btn btn-outline-primary btn-sm" for="type-file">Файл з ПуКа</label>
                    </div>
                    <div id="url-input-wrapper" class="${isUrl ? '' : 'd-none'}">
                        <input type="text" id="modal-note-img-url" class="form-control" value="${isUrl ? img : ''}" placeholder="https://example.com/image.jpg">
                    </div>
                    <div id="file-input-wrapper" class="${!isUrl ? '' : 'd-none'}">
                        <input type="file" id="modal-note-img-file" class="form-control" accept="image/*">
                    </div>
                </div>
                <div class="d-flex gap-2 justify-content-between align-items-center">
                    <div>
                        ${isEdit ? '<button type="button" class="btn btn-danger btn-sm" id="custom-modal-delete">Удаліть</button>' : ''}
                    </div>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-secondary" id="custom-modal-cancel">Отмєна</button>
                        <button type="button" class="btn btn-primary" id="custom-modal-save">Сохроніть</button>
                    </div>
                </div>
            </div>
        `;
    },

    getConfirmDelete: function () {
        return `
            <div class="p-3 text-center custom-modal-form">
                <p class="text-dark fs-5 fw-bold mb-3">Ті хочешь удаліть меня?</p>
                <div class="d-flex gap-3 justify-content-center">
                    <button type="button" class="btn btn-secondary px-4" id="confirm-delete-cancel">Нет(ті легенда)</button>
                    <button type="button" class="btn btn-danger px-4" id="confirm-delete-yes">Да, ну тобі мене не жалко?</button>
                </div>
            </div>
        `;
    }
};

const NotesStorage = {
    getAll: function () {
        try {
            return JSON.parse(localStorage.getItem('awesome_notes')) || [];
        } catch (e) {
            return [];
        }
    },

    save: function (note) {
        const notes = this.getAll();
        note.isArchived = false;
        notes.push(note);
        try {
            localStorage.setItem('awesome_notes', JSON.stringify(notes));
            return true;
        } catch (e) {
            return false;
        }
    },

    update: function (id, updatedData) {
        let notes = this.getAll();
        notes = notes.map(note => note.id == id ? { ...note, ...updatedData } : note);
        localStorage.setItem('awesome_notes', JSON.stringify(notes));
    },

    toggleArchive: function (id) {
        let status = false;
        let notes = this.getAll();
        notes = notes.map(note => {
            if (note.id == id) {
                note.isArchived = !note.isArchived;
                status = note.isArchived;
            }
            return note;
        });
        localStorage.setItem('awesome_notes', JSON.stringify(notes));
        return status;
    },

    delete: function (id) {
        let notes = this.getAll();
        notes = notes.filter(note => note.id != id);
        localStorage.setItem('awesome_notes', JSON.stringify(notes));
    },

    clearAll: function () {
        localStorage.removeItem('awesome_notes');
    }
};

(function () {
    const textElements = document.querySelectorAll(".js-text-animation-color-1");
    const animatedElements = new Map();

    const colors = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A8",
        "#33FFF5",
        "#F5FF33",
        "#FF8C00",
        "#8A2BE2"
    ];


    const colorChangeInterval = 300;

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.get(entry.target)) {

                (function (element) {
                    const originalContent = element.cloneNode(true);
                    element.innerHTML = "";

                    const childClassName = "js-text-animation-color-1-child";
                    const appearanceDelay = 0.05;
                    let delay = 0;

                    const charSpans = [];

                    const walker = document.createTreeWalker(originalContent, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false);
                    let node;

                    while (node = walker.nextNode()) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            let textContent = node.textContent;

                            if (charSpans.length === 0) textContent = textContent.trimStart();

                            textContent.split("").forEach(char => {
                                const charSpan = document.createElement("span");
                                charSpan.className = childClassName;
                                if (char === " ") charSpan.classList.add("space-char");
                                charSpan.textContent = char;

                                charSpan.style.color = getRandomElement(colors);

                                charSpan.style.animation = `fadeInChar 0.5s forwards ${delay}s`;

                                delay += appearanceDelay;
                                element.appendChild(charSpan);
                                charSpans.push(charSpan);
                            });
                        } else if (node.tagName === "BR") {
                            element.appendChild(document.createElement("br"));
                        }
                    }

                    requestAnimationFrame(() => {
                        element.style.visibility = "visible";
                    });


                    setTimeout(() => {
                        setInterval(() => {

                            const randomSpan = getRandomElement(charSpans);

                            if (randomSpan.classList.contains('space-char')) return;

                            const currentColor = randomSpan.style.color;
                            let newColor;
                            do {
                                newColor = getRandomElement(colors);
                            } while (newColor === currentColor);

                            randomSpan.style.color = newColor;

                        }, colorChangeInterval);
                    }, delay * 100);

                })(entry.target);

                animatedElements.set(entry.target, true);
            }
        });
    }, { threshold: 0.25 });

    textElements.forEach(element => {
        observer.observe(element);
    });
})();