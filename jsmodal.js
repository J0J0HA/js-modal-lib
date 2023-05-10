let __jsmodal = {
    _dialog_count: 0,
    _generate_id: function () {
        return this._dialog_count++;
    }
}

class JSModalConfigBuilder {
    constructor(preconfig = {}) {
        this.config = {
            implicitDismiss: true,
            explicitDismiss: true,
            form: false,
            explicitDismissText: "Cancel",
            explicitAcceptText: "OK",
            ...preconfig
        };
    }

    allowImplicitDismiss(b = true) {
        this.config.implicitDismiss = b;
        return this;
    }

    allowExplicitDismiss(b = true) {
        this.config.explicitDismiss = b;
        return this;
    }

    allowDismiss(b = true) {
        this.config.implicitDismiss = b;
        this.config.explicitDismiss = b;
        return this;
    }

    takesInputData(b = true) {
        this.config.form = b;
        return this;
    }

    setDismissButtonText(t) {
        this.config.explicitDismissText = t;
        return this;
    }

    setAcceptButtonText(t) {
        this.config.explicitAcceptText = t;
        return this;
    }

    build() {
        return this.config;
    }
}

const JSModalType = {
    Info: new JSModalConfigBuilder()
        .allowExplicitDismiss(false)
        .build(),
    Sure: new JSModalConfigBuilder()
        .build(),
    YN: new JSModalConfigBuilder()
        .allowExplicitDismiss(true)
        .allowImplicitDismiss(false)
        .setAcceptButtonText("Yes")
        .setDismissButtonText("No")
        .build()
}

class JSModalDialog {
    constructor(config, title) {
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
            "-form": 0,
        }

        this.config = config;

        this.id = __jsmodal._generate_id();
        this.dia = document.createElement("dialog");

        this.dia.id = this._idfor();
        this.dia.className = "jsmodal jsmodal-dialog";


        if (this.config.form) {
            this.elm = document.createElement("form");
            this.elm.id = this._idfor("form");
            this.elm.className = "jsmodal jsmodal-form";
            this.dia.appendChild(this.elm)
        } else {
            this.elm = this.dia;
        }

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

    show() {
        let buttons = document.createElement("div");

        this.acceptButton = document.createElement("button");
        this.acceptButton.className = "jsmodal jsmodal-button jsmodal-accept";
        this.acceptButton.innerText = this.config.explicitAcceptText;
        buttons.append(this.acceptButton);

        if (this.config.explicitDismiss) {
            this.dismissButton = document.createElement("button");
            this.dismissButton.innerText = this.config.explicitDismissText;
            this.dismissButton.className = "jsmodal jsmodal-button jsmodal-dismiss";
            buttons.append(this.dismissButton);
        }

        this.dia.appendChild(buttons);

        document.body.appendChild(this.dia);

        return this.reopen();
    }

    reopen() {
        return new Promise((resolve, reject) => {
            this.acceptButton.onclick = () => {
                resolve(this.acceptButton.innerText);
                this.dia.close();
            };
            if (this.config.explicitDismiss)
                this.dismissButton.onclick = () => {
                    reject(this.dismissButton.innerText);
                    this.dia.close();
                };

            if (this.config.implicitDismiss) {
                this.dia.onclick = (e) => {
                    if (e.target === this.dia) {
                        reject(e);
                        this.dia.close();
                    }
                }
            } else {
                console.error("TODO: BLock ESC.")
            }
            this.dia.showModal();
        })
    }
}
