$(document).ready(function () {
    let editingNoteId = null;
    let localImgBase64 = '';
    let titleClickCount = 0;
    let currentTab = 'active';

    function renderApp() {
        $('#notes-grid').empty();
        const allNotes = NotesStorage.getAll();

        const filteredNotes = allNotes.filter(note => {
            return currentTab === 'archived' ? note.isArchived === true : !note.isArchived;
        });

        if (filteredNotes.length === 0) {
            const msg = currentTab === 'archived' ? 'Архів пустой' : 'Замєток небуде';
            $('#notes-grid').append(`<div class="col-12 text-center text-white-50 my-5 fs-5">${msg}</div>`);
            return;
        }

        filteredNotes.forEach(note => {
            $('#notes-grid').append(NotesTemplates.getNoteCard(note));
        });
    }

    function resizeAndConvertImage(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500;
                let width = img.width, height = img.height;

                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
                canvas.width = width; canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                callback(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    renderApp();

    $('#archive-tabs button').on('click', function (e) {
        e.preventDefault();

        $('#archive-tabs button').removeClass('active');
        $(this).addClass('active');

        currentTab = $(this).attr('data-tab') || $(this).data('tab');

        renderApp();
    });

    $(document).on('click', '.btn-archive-note', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        const isArchivedNow = NotesStorage.toggleArchive(id);

        if (isArchivedNow) {
            alertify.success('Вона запечатана в архіві!');
        } else {
            alertify.success('Повернув обратно!');
        }
        renderApp();
    });

    $('#record-btn').on('click', function (e) {
        e.preventDefault();
        editingNoteId = null;
        localImgBase64 = '';
        alertify.dialog('alert').set({
            title: 'Созідать нову нотатку',
            message: NotesTemplates.getForm('', '', '', false)
        }).show();
    });

    $(document).on('click', '.btn-edit-note', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        const currentNote = NotesStorage.getAll().find(n => n.id == id);

        if (currentNote) {
            editingNoteId = id;
            localImgBase64 = currentNote.img.startsWith('data:image') ? currentNote.img : '';
            alertify.dialog('alert').set({
                title: 'Рєдактіровать',
                message: NotesTemplates.getForm(currentNote.title, currentNote.text, currentNote.img === NotesTemplates.defaultImg ? '' : currentNote.img, true)
            }).show();
        }
    });

    $(document).on('change', 'input[name="img-type"]', function () {
        if ($('#type-url').is(':checked')) {
            $('#url-input-wrapper').removeClass('d-none');
            $('#file-input-wrapper').addClass('d-none');
        } else {
            $('#url-input-wrapper').addClass('d-none');
            $('#file-input-wrapper').removeClass('d-none');
        }
    });

    $(document).on('change', '#modal-note-img-file', function (e) {
        const file = e.target.files[0];
        if (file) {
            resizeAndConvertImage(file, base64 => { localImgBase64 = base64; });
        }
    });

    $(document).on('click', '#custom-modal-delete', function () {
        if (editingNoteId !== null) {
            alertify.dialog('alert').set({
                title: 'Подтвіржденіє шо хочешь мене удаліть',
                message: NotesTemplates.getConfirmDelete()
            });
        }
    });

    $(document).on('click', '#confirm-delete-yes', function () {
        if (editingNoteId !== null) {
            NotesStorage.delete(editingNoteId);
            renderApp();
            alertify.dialog('alert').close();
            alertify.success('Ну всьо молодец,😓😰 ті мене удалив!');
        }
    });

    $(document).on('click', '#confirm-delete-cancel', function () {
        if (editingNoteId !== null) {
            const currentNote = NotesStorage.getAll().find(n => n.id == editingNoteId);
            if (currentNote) {
                alertify.dialog('alert').set({
                    title: 'Рєдактіровать',
                    message: NotesTemplates.getForm(currentNote.title, currentNote.text, currentNote.img === NotesTemplates.defaultImg ? '' : currentNote.img, true)
                });
            }
        }
    });

    $(document).on('click', '#custom-modal-save', function () {
        const $modal = $('.ajs-dialog');
        const title = $modal.find('#modal-note-title').val().trim();
        const text = $modal.find('#modal-note-text').val().trim();

        let imgUrl = NotesTemplates.defaultImg;
        if ($('#type-url').is(':checked')) {
            const typedUrl = $modal.find('#modal-note-img-url').val().trim();
            if (typedUrl) imgUrl = typedUrl;
        } else if (localImgBase64) {
            imgUrl = localImgBase64;
        } else if (editingNoteId !== null) {
            const currentNote = NotesStorage.getAll().find(n => n.id == editingNoteId);
            if (currentNote) imgUrl = currentNote.img;
        }

        if (!title || !text) {
            alertify.error('Заголовок і текст снізу треба(фоточку в лс Mastic_00)!');
            return;
        }

        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} в ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        if (editingNoteId !== null) {
            NotesStorage.update(editingNoteId, { title, text, img: imgUrl, date: dateStr + ' (изм.)' });
            alertify.success('Обновив!');
        } else {
            NotesStorage.save({ id: Date.now(), title, text, img: imgUrl, date: dateStr });
            alertify.success('Созідав!');
        }

        renderApp();
        alertify.dialog('alert').close();
    });

    $(document).on('click', '#custom-modal-cancel', function () {
        alertify.dialog('alert').close();
    });

    $('#secret-reset-title').on('click', function () {
        titleClickCount++;
        if (titleClickCount === 3) {
            titleClickCount = 0;
            NotesStorage.clearAll();
            renderApp();
            alertify.success('Очістив!');
        }
        setTimeout(() => { titleClickCount = 0; }, 2000);
    });

    $(document).on('click', '.preview-trigger', function () {
        const src = $(this).attr('src');
        $('body').append(`<div class="fullscreen-img-overlay"><img src="${src}" alt="Fullscreen"></div>`);
        $('.fullscreen-img-overlay').fadeIn(300);
    });

    $(document).on('click', '.fullscreen-img-overlay', function () {
        $(this).fadeOut(200, function () { $(this).remove(); });
    });

    $('#test').on('click', function (e) {
        e.preventDefault();

        alertify.dialog('alert').set({
            title: 'Правила цього мега додатка-нотатка',
            message: NotesTemplates.getRulesModal()
        }).show();
    });

    let chaosInterval = null;
    let escapeCount = 0;

    $(document).on('click', '#start-chaos-btn', function () {
        alertify.dialog('alert').close();
        alertify.warning('Шо ти наробив....😱');

        if (chaosInterval) return;

        const allButtons = $('button, .tab-btn, h1');
        allButtons.css({
            'position': 'relative',
            'transition': 'all 0.4s linear',
            'z-index': '9999'
        });

        chaosInterval = setInterval(() => {
            allButtons.each(function () {
                const randomX = Math.floor(Math.random() * 40) - 20;
                const randomY = Math.floor(Math.random() * 40) - 20;
                const randomRot = Math.floor(Math.random() * 90) - 45;
                $(this).css('transform', `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg)`);
            });
        }, 400);

        if ($('#stop-chaos-btn').length === 0) {
            $('body').append(`
                <button id="stop-chaos-btn" style="
                    position: fixed; top: 50%; left: 50%; 
                    transform: translate(-50%, -50%); z-index: 100000;
                    background: #00e676; color: #000; font-weight: bold;
                    border: 2px solid #fff; padding: 15px 30px; border-radius: 50px;
                    box-shadow: 0 0 30px #00e676; cursor: pointer; transition: all 0.2s ease;
                ">🛑 ГТА6 🛑</button>
            `);
            escapeCount = 0;
        }
    });

    $(document).on('mouseenter', '#stop-chaos-btn', function () {
        const $btn = $(this);

        if (escapeCount < 7) {
            const maxX = $(window).width() - $btn.outerWidth() - 50;
            const maxY = $(window).height() - $btn.outerHeight() - 50;

            const randomLeft = Math.max(50, Math.floor(Math.random() * maxX));
            const randomTop = Math.max(50, Math.floor(Math.random() * maxY));

            $btn.css({
                'transform': 'none',
                'left': randomLeft + 'px',
                'top': randomTop + 'px'
            });

            const insults = [
                "Не попав", "Хо Хо ХО🏃‍♂️", "Ну шо таке",
                "Ну почті моймав", "Дуже повільно ті шось", "Ну давай скоріше", "Пака, я ухожу"
            ];
            $btn.text(insults[escapeCount]);
            escapeCount++;
        } else if (escapeCount === 7) {
            $btn.css({
                'background': '#ff1744',
                'color': '#fff',
                'box-shadow': '0 0 30px #ff1744'
            }).text('Ладно, ладно, я здаюся жми ту кнопку😭');
            escapeCount++;
        }
    });

    $(document).on('click', '#stop-chaos-btn', function () {
        if (escapeCount >= 8) {
            clearInterval(chaosInterval);
            chaosInterval = null;
            escapeCount = 0;

            $('button, .tab-btn, h1').css({
                'transform': 'none',
                'transition': 'none'
            });

            $(this).remove();
            alertify.success('Ти мене ВРЯТУВАВ😁');
        }
    });

    if ($('#bg-audio-player').length === 0) {
        $('body').append('<audio id="bg-audio-player" loop></audio>');
    }
    if ($('#dynamic-theme').length === 0) {
        $('head').append('<style id="dynamic-theme"></style>');
    }

    $('#start-game-btn').on('click', function (e) {
        e.preventDefault();

        alertify.dialog('alert').set({
            title: 'Кастомізація сторінки',
            message: NotesTemplates.getAtmosphereModal()
        }).show();

        const currentVideo = $('.video_back video').attr('src');
        $('#select-bg-video').val(currentVideo);

        const currentMusic = $('#bg-audio-player').attr('src') || "";
        $('#select-bg-music').val(currentMusic);

        if (window.customThemeColor) {
            $(`.btn-color-pick[data-color="${window.customThemeColor}"]`).css('border', '2px solid #fff');
        }
    });

    $(document).on('click', '.btn-color-pick', function () {
        const pickedColor = $(this).data('color');
        window.customThemeColor = pickedColor;

        $('.btn-color-pick').css('border', 'none');
        $(this).css('border', '2px solid #fff');

        $('#dynamic-theme').html(`
            .js-text-animation-color-1 { color: ${pickedColor} !important; }
            #archive-tabs .tab-btn.active { color: ${pickedColor} !important; }
        `);
    });

    $(document).on('change', '#select-bg-video', function () {
        const videoSrc = $(this).val();
        const videoEl = document.querySelector('.video_back video');

        if (videoEl) {
            videoEl.src = videoSrc;
            videoEl.load();
            videoEl.play().catch(e => console.log("Ошибка:", e));
        }
    });

    $(document).on('change', '#select-bg-music', function () {
        const musicSrc = $(this).val();
        const player = document.getElementById('bg-audio-player');

        if (!player) return;

        if (!musicSrc) {
            player.pause();
            player.src = "";
        } else {
            player.src = musicSrc;
            player.load();
            player.play().catch(err => {
                alertify.message('Музика пішла.');
            });
        }
    });
});