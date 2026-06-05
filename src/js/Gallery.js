const ImageItem = require('./ImageItem');

class Gallery {
    constructor() {
        this.images = [];
        this.nextId = 1;
        this.container = null;
    }

    init() {
        this.container = document.getElementById('gallery');
    }

    addImage(name, url) {
        return new Promise((resolve, reject) => {
            // Проверка валидности URL через создание img
            const testImg = new Image();

            testImg.onload = () => {
                const image = new ImageItem(this.nextId++, name, url);
                this.images.push(image);
                this.render();
                resolve(image);
            };

            testImg.onerror = () => {
                reject(new Error('Неверный URL изображения'));
            };

            testImg.src = url;
        });
    }

    deleteImage(id) {
        const index = this.images.findIndex(img => img.id === id);
        if (index !== -1) {
            this.images.splice(index, 1);
            this.render();
        }
    }

    render() {
        if (!this.container) return;

        if (this.images.length === 0) {
            this.container.innerHTML = '<div class="empty-gallery">Нет изображений. Добавьте первое!</div>';
            return;
        }

        this.container.innerHTML = '';

        this.images.forEach(image => {
            const element = image.createElement();

            // Привязываем обработчик удаления
            const deleteBtn = element.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                this.deleteImage(image.id);
            });

            this.container.appendChild(element);
        });
    }

    getImagesCount() {
        return this.images.length;
    }
}

module.exports = Gallery;