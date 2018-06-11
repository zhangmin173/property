class Pop {
    constructor() {
        this.id = 'pop-' + -new Date();
    }
    show(type,text) {
        const html = this._tpl(type,text);
        $('body').append(html);
        return this;
    }
    hide(timeout = 800) {
        setTimeout(() => {
            $(`#${this.id}`).remove();
        },800);
        return this;
    }
    _tpl(type,text) {
        const tplHtml = `<div id="${this.id}" class="pop">
            <div class="pop-body ${type}">
                <span class="pop-text">${text}</span>  
            </div>  
        </div>`;
        return tplHtml;
    }
}
export default new Pop()