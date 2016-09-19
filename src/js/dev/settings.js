const settings = Object.assign({
    repeat: false,
    shuffle: false,
    volume: 0.2
}, JSON.parse(localStorage.getItem("settings")) || {});

function setSetting(setting, value) {
    if (settings.hasOwnProperty(setting)) {
        settings[setting] = value;
        localStorage.setItem("settings", JSON.stringify(settings));
    }
}

function getSetting(setting) {
    return settings[setting];
}

export { setSetting, getSetting };
