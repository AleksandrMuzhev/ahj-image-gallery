class ImageItem {
    constructor(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.element = null;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'gallery-item';
        this.element.dataset.id = this.id;

        this.element.innerHTML = `
            <div class="image-container">
                <img class="gallery-img" src="${this.url}" alt="${this.name}">
            </div>
            <div class="image-info">
                <span class="image-title">${this.name}</span>
                <button class="delete-btn" data-id="${this.id}">Удалить</button>
            </div>
        `;

        return this.element;
    }

    updateElement() {
        if (this.element) {
            const img = this.element.querySelector('.gallery-img');
            const title = this.element.querySelector('.image-title');
            const deleteBtn = this.element.querySelector('.delete-btn');

            img.src = this.url;
            img.alt = this.name;
            title.textContent = this.name;
            deleteBtn.dataset.id = this.id;
        }
    }
}

module.exports = ImageItem;