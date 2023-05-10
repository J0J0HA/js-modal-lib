window.onload = (e) => {
    let dia = new JSModalDialog(JSModalType.YN, "Test Dialog");
    dia.addText("Should we do this?");
    dia.show()
        .then(alert)
        .catch(console.error);
    dia = new JSModalDialog(JSModalType.Sure, "Test Dialog");
    dia.addText("We will do this.");
    dia.show()
        .then(alert)
        .catch(console.error);
    dia = new JSModalDialog(JSModalType.Info, "Test Dialog");
    dia.addText("It was done.");
    dia.show()
        .then(alert)
        .catch(console.error);
}