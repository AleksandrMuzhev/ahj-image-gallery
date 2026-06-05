const Gallery = require('./Gallery');

class App {
    constructor() {
        this.gallery = new Gallery();
        this.init();
    }

    init() {
        this.gallery.init();
        this.bindEvents();
    }

    bindEvents() {
        const nameInput = document.getElementById('image-name');
        const urlInput = document.getElementById('image-url');
        const addBtn = document.getElementById('add-btn');
        const errorDiv = document.getElementById('error-message');

        // Функция добавления изображения
        const addImage = () => {
            const name = nameInput.value.trim();
            const url = urlInput.value.trim();

            errorDiv.textContent = '';

            if (!name) {
                errorDiv.textContent = 'Введите название изображения';
                return;
            }

            if (!url) {
                errorDiv.textContent = 'Введите URL изображения';
                return;
            }

            this.gallery.addImage(name, url)
                .then(() => {
                    nameInput.value = '';
                    urlInput.value = '';
                    errorDiv.textContent = '';
                })
                .catch((err) => {
                    errorDiv.textContent = err.message;
                });
        };

        // По кнопке
        addBtn.addEventListener('click', addImage);

        // По Enter в любом поле
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addImage();
        });

        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addImage();
        });
    }
}

module.exports = App;