$(document).ready(function() {
    let editingNoteId = null;
    let localImgBase64 = '';
    const defaultImg = 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=500';
    let titleClickCount = 0;

    function loadNotes() {
        $('#notes-grid').empty();
        let notes = [];
        try {
            notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
        } catch (e) {
            notes = [];
        }
        notes.forEach(function(note) {
            renderNote(note);
        });
    }

    function saveNote(note) {
        let notes = [];
        try {
            notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
        } catch (e) {
            notes = [];
        }
        notes.push(note);
        try {
            localStorage.setItem('awesome_notes', JSON.stringify(notes));
        } catch (e) {
            alertify.error('Помилка: жди докс!');
        }
    }

    function updateExistingNote(id, updatedData) {
        let notes = [];
        try {
            notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
        } catch (e) {
            notes = [];
        }
        notes = notes.map(note => note.id == id ? { ...note, ...updatedData } : note);
        try {
            localStorage.setItem('awesome_notes', JSON.stringify(notes));
        } catch (e) {
            alertify.error('Габелла, 40к за оперативку!');
        }
    }

    function deleteNoteFromStorage(id) {
        let notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
        notes = notes.filter(note => note.id != id);
        localStorage.setItem('awesome_notes', JSON.stringify(notes));
    }

    function renderNote(note) {
        const noteHtml = `
            <div class="col-12 col-md-4 mb-3" id="note-${note.id}">
                <div class="note-card">
                    <div class="note-img-wrapper">
                        <img src="${note.img}" class="note-img-top preview-trigger" alt="Note Image" onerror="this.onerror=null; this.src='${defaultImg}';">
                    </div>
                    <div class="note-body">
                        <div class="note-date">${note.date}</div>
                        <div class="note-title">${note.title}</div>
                        <div class="note-text">${note.text}</div>
                        <div class="mt-3 text-end">
                            <button class="btn-edit-note" data-id="${note.id}">
                                <i class="fas fa-edit"></i> Рєдактіровать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#notes-grid').append(noteHtml);
    }

    function getFormHtml(title = '', text = '', img = '', isEdit = false) {
        const isUrl = !img.startsWith('data:image');
        return `
            <div class="p-2 custom-modal-form">
                <div class="mb-2">
                    <label class="form-label text-dark fw-bold m-0">Заголовок</label>
                    <input type="text" id="modal-note-title" class="form-control" value="${title}" placeholder="Введи заголовок...">
                </div>
                <div class="mb-2">
                    <label class="form-label text-dark fw-bold m-0">Описание</label>
                    <textarea id="modal-note-text" class="form-control" rows="3" placeholder="Текст введи...">${text}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label text-dark fw-bold mb-1 d-block">Картінка</label>
                    <div class="btn-group w-100 mb-2" role="group">
                        <input type="radio" class="btn-check" name="img-type" id="type-url" autocomplete="off" ${isUrl ? 'checked' : ''}>
                        <label class="btn btn-outline-primary btn-sm" for="type-url">Посилання (URL)</label>
                        <input type="radio" class="btn-check" name="img-type" id="type-file" autocomplete="off" ${!isUrl ? 'checked' : ''}>
                        <label class="btn btn-outline-primary btn-sm" for="type-file">Файл з компутера</label>
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
                        ${isEdit ? '<button type="button" class="btn btn-danger btn-sm" id="custom-modal-delete">Удалить нотатку</button>' : ''}
                    </div>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-secondary" id="custom-modal-cancel">Отмєна</button>
                        <button type="button" class="btn btn-primary" id="custom-modal-save">Засейвить</button>
                    </div>
                </div>
            </div>
        `;
    }

    function getConfirmDeleteHtml() {
        return `
            <div class="p-3 text-center custom-modal-form">
                <p class="text-dark fs-5 fw-bold mb-3">Точно хочешь видалить мене?</p>
                <p class="text-muted small mb-4">Це в 1 конец поізд, отмінить нізя.</p>
                <div class="d-flex gap-3 justify-content-center">
                    <button type="button" class="btn btn-secondary px-4" id="confirm-delete-cancel">Ну думаю не надо</button>
                    <button type="button" class="btn btn-danger px-4" id="confirm-delete-yes">Удаліть добрий сайт</button>
                </div>
            </div>
        `;
    }

    loadNotes();

    $('#secret-reset-title').on('click', function() {
        titleClickCount++;
        if (titleClickCount === 3) {
            titleClickCount = 0;
            localStorage.removeItem('awesome_notes');
            loadNotes();
            alertify.success('Ти все удалив, молодец, легенда!');
        }
        setTimeout(() => { titleClickCount = 0; }, 2000);
    });

    $('#record-btn').on('click', function(e) {
        e.preventDefault();
        editingNoteId = null; 
        localImgBase64 = '';
        alertify.dialog('alert').set({
            title: 'Созідать нову нотатку',
            message: getFormHtml('', '', '', false)
        }).show();
    });

    $(document).on('click', '.btn-edit-note', function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        let notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
        const currentNote = notes.find(n => n.id == id);

        if (currentNote) {
            editingNoteId = id;
            localImgBase64 = currentNote.img.startsWith('data:image') ? currentNote.img : '';
            alertify.dialog('alert').set({
                title: 'Редактировать заметку',
                message: getFormHtml(currentNote.title, currentNote.text, currentNote.img === defaultImg ? '' : currentNote.img, true)
            }).show();
        }
    });

    $(document).on('change', 'input[name="img-type"]', function() {
        if ($('#type-url').is(':checked')) {
            $('#url-input-wrapper').removeClass('d-none');
            $('#file-input-wrapper').addClass('d-none');
        } else {
            $('#url-input-wrapper').addClass('d-none');
            $('#file-input-wrapper').removeClass('d-none');
        }
    });

    function resizeAndConvertImage(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500; 
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                callback(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    $(document).on('change', '#modal-note-img-file', function(e) {
        const file = e.target.files[0];
        if (file) {
            resizeAndConvertImage(file, function(compressedBase64) {
                localImgBase64 = compressedBase64;
            });
        }
    });

    $(document).on('click', '#custom-modal-delete', function() {
        if (editingNoteId !== null) {
            alertify.dialog('alert').set({
                title: 'Ти точно хочєшь мене удаліть?',
                message: getConfirmDeleteHtml()
            });
        }
    });

    $(document).on('click', '#confirm-delete-yes', function() {
        if (editingNoteId !== null) {
            deleteNoteFromStorage(editingNoteId);
            loadNotes();
            alertify.dialog('alert').close();
            alertify.success('Ті удалив її!');
        }
    });

    $(document).on('click', '#confirm-delete-cancel', function() {
        if (editingNoteId !== null) {
            let notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
            const currentNote = notes.find(n => n.id == editingNoteId);
            if (currentNote) {
                alertify.dialog('alert').set({
                    title: 'Редактіровать нотатку',
                    message: getFormHtml(currentNote.title, currentNote.text, currentNote.img === defaultImg ? '' : currentNote.img, true)
                });
            }
        }
    });

    $(document).on('click', '#custom-modal-save', function() {
        const $modal = $('.ajs-dialog');
        const title = $modal.find('#modal-note-title').val().trim();
        const text = $modal.find('#modal-note-text').val().trim();
        
        let imgUrl = defaultImg;
        if ($('#type-url').is(':checked')) {
            const typedUrl = $modal.find('#modal-note-img-url').val().trim();
            if (typedUrl) imgUrl = typedUrl;
        } else if (localImgBase64) {
            imgUrl = localImgBase64;
        } else if (editingNoteId !== null) {
            let notes = JSON.parse(localStorage.getItem('awesome_notes')) || [];
            const currentNote = notes.find(n => n.id == editingNoteId);
            if (currentNote) imgUrl = currentNote.img;
        }

        if (!title || !text) {
            alertify.error('Заголовок і текст в опісанії треба(фото в лс мені Mastic_00)!');
            return;
        }

        const now = new Date();
        const fullDateString = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} в ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;

        if (editingNoteId !== null) {
            updateExistingNote(editingNoteId, { title: title, text: text, img: imgUrl, date: fullDateString + ' (изм.)' });
            loadNotes();
            alertify.success('Обновив!');
        } else {
            saveNote({ id: Date.now(), title: title, text: text, img: imgUrl, date: fullDateString });
            loadNotes();
            alertify.success('Я создав!');
        }
        alertify.dialog('alert').close();
    });

    $(document).on('click', '#custom-modal-cancel', function() {
        alertify.dialog('alert').close();
    });

    $(document).on('click', '.preview-trigger', function() {
        const src = $(this).attr('src');
        $('body').append(`
            <div class="fullscreen-img-overlay">
                <img src="${src}" alt="Fullscreen View">
            </div>
        `);
        $('.fullscreen-img-overlay').fadeIn(300);
    });

    $(document).on('click', '.fullscreen-img-overlay', function() {
        $(this).fadeOut(200, function() {
            $(this).remove();
        });
    });
});