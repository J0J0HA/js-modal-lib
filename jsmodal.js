let __jsmodal = {
    _dialog_count: 0,
    _generate_id: function () {
        return this._dialog_count++;
    }
}

class JSModalDialog {
    constructor(title) {
        this._idcount = {
            "": 0,
            "-title-1": 0,
            "-title-2": 0,
            "-title-3": 0,
            "-title-4": 0,
            "-title-5": 0,
            "-title-6": 0,
            "-text": 0,
            "-raw_html": 0,
            "-raw_element": 0,
        }


        this.elm = document.createElement("dialog");
        this.id = __jsmodal._generate_id();
        this.elm.id = this._idfor();
        this.elm.className = "jsmodal jsmodal-dialog";
        this.addTitle(title, 1);
    }

    _idfor(name) {
        name = name ? "-" + name : "";
        console.log(name)
        return "jsmodal-dialog-" + this.id + name + "-" + this._idcount[name]++;
    }

    addTitle(title, size) {
        let new_title = document.createElement("h" + size);
        new_title.id = this._idfor("title-" + size);
        new_title.className = "jsmodal jsmodal-title";
        new_title.innerText = title;
        this.elm.appendChild(new_title);
    }

    addText(text) {
        let new_content = document.createElement("p");
        new_content.id = this._idfor("text")
        new_content.className = "jsmodal jsmodal-text";
        new_content.innerText = text;
        this.elm.appendChild(new_content);
    }

    addHTML(html) {
        let new_content = document.createElement("p");
        new_content.id = this._idfor("raw_html")
        new_content.className = "jsmodal jsmodal-raw_html";
        new_content.innerHTML = html;
        this.elm.appendChild(new_content);
    }

    addElement(new_element) {
        if (!new_element.id) {
            new_element.id = this._idfor("raw_element")
        }
        new_element.setAttribute("data-jsmodal-id", this._idfor("raw_element"));
        new_element.classList.add("jsmodal");
        new_element.classList.add("jsmodal-raw_element");
        this.elm.appendChild(new_element);
    }

    apply() {
        return document.body.appendChild(this.elm);
    }

    show() {
        return this.elm.showModal();
    }

    hide() {
        return this.elm.close();
    }
}
