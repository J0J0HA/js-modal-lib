window.onload = (e) => {
    let dia = new JSModalDialog("Test Dialog");

    let testelm = document.createElement("img");
    testelm.src="https://picsum.photos/100/100"
    dia.addElement(testelm);
    dia.apply();
    dia.show();
}