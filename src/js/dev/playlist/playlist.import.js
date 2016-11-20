import { removeElement, removeElementClass, getElementByAttr, scriptLoader } from "./../main.js";
import { getPlaylistById, createPlaylist } from "./playlist.js";
import { updatePlaylist } from "./playlist.manage.js";
import { showDropboxChooser } from "./../dropbox.js";
import { selectLocalFiles } from "./../local.js";
import * as yt from "./../youtube.js";
import * as sc from "./../soundcloud.js";

let option = "";

function setOption(newOption = "") {
    option = newOption;
}

function isNewOption(newOption) {
    return option !== newOption;
}

function createImportOptionMask(option) {
    const optionElements = Array.from(document.querySelectorAll(`[data-option-id*=${option}]`));

    optionElements.forEach(element => {
        element.parentElement.insertAdjacentHTML("beforeend", `
            <div class="option-mask" data-mask-id=${option}>
                <span class="icon-spin4 animate-spin"></span>
            </div>
        `);
    });
}

function removeImportOptionMask(option) {
    const maskElements = Array.from(document.querySelectorAll(`[data-mask-id*=${option}]`));

    maskElements.forEach(element => {
        removeElement(element);
    });
}

function showNotice(option, message) {
    const maskElements = Array.from(document.querySelectorAll(`[data-mask-id*=${option}]`));

    maskElements.forEach(element => {
        const spinner = element.children[0];

        removeElement(spinner);
        element.insertAdjacentHTML("beforeend", `<span>${message}</span>`);
    });

    setTimeout(() => {
        removeImportOptionMask(option);
    }, 3200);
}

function importPlaylist(url) {
    if (url.includes("youtube")) {
        yt.fetchPlaylist(url);
    }
    else if (url.includes("soundcloud")) {
        sc.fetchPlaylist(url);
    }
}

function filterDuplicateTracks(tracks, existingTracks) {
    return tracks.reduce((tracks, track) => {
        const duplicate = existingTracks.some(localTrack => localTrack.name === track.name);

        if (!duplicate) {
            tracks.push(track);
        }
        return tracks;
    }, []);
}

function replaceInvalidImages(tracks) {
    return new Promise(resolve => {
        let i = 0;

        tracks.forEach(track => {
            const image = new Image();

            image.onload = function() {
                i += 1;
                if (i === tracks.length) {
                    resolve(tracks);
                }
            };
            image.onerror = function() {
                track.thumbnail = "assets/images/album-art-placeholder.png";
                i += 1;
                if (i === tracks.length) {
                    resolve(tracks);
                }
            };
            image.src = track.thumbnail;
        });
    });
}

function addImportedPlaylist(playlist) {
    const tracks = playlist.tracks.splice(0);
    const pl = getPlaylistById(playlist.id) || createPlaylist(playlist);
    const newTracks = filterDuplicateTracks(tracks, pl.tracks);

    replaceInvalidImages(newTracks)
    .then(tracks => {
        updatePlaylist(pl, tracks, playlist.player);
    });
}

function createPlaylistImportForm(container) {
    const formId = "js-import-form";
    const form = `
        <form id=${formId} class="import-form">
            <input type="text" name="playlist-url" class="input" placeholder="Playlist url">
            <button class="btn">Import</button>
        </form>
    `;

    container.insertAdjacentHTML("beforeend", form);

    const formElement = document.getElementById(formId);

    formElement.elements["playlist-url"].focus();
    formElement.addEventListener("submit", handleImportFormSubmit);
}

function removePlaylistImportForm() {
    const form = document.getElementById("js-import-form");

    if (form) {
        form.removeEventListener("submit", handleImportFormSubmit);
        removeElement(form);
        removeElementClass("import-option-btn", "active");
    }
}

function selectOption(optionElement) {
    optionElement.classList.add("active");
    createPlaylistImportForm(optionElement);
}

function handleChangeOnFileInput({ target }) {
    selectLocalFiles([...target.files]);
    target.value = "";
    target.removeEventListener("change", handleChangeOnFileInput);
    removeElement(target);
}

function createFileInput() {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("id", "js-file-picker");
    input.classList.add("file-picker");
    input.addEventListener("change", handleChangeOnFileInput);
    document.body.appendChild(input);
    return input;
}

function showFilePicker(choice) {
    const filePicker = document.getElementById("js-file-picker") || createFileInput();
    const clickEvent = new MouseEvent("click");

    if (choice === "local-file") {
        filePicker.removeAttribute("webkitdirectory");
        filePicker.removeAttribute("directory");
        filePicker.setAttribute("multiple", true);
    }
    else if (choice === "local-folder") {
        filePicker.removeAttribute("multiple");
        filePicker.setAttribute("webkitdirectory", true);
        filePicker.setAttribute("directory", true);
    }
    filePicker.dispatchEvent(clickEvent);
}

function handleImportFormSubmit(event) {
    const url = event.target.elements["playlist-url"].value.trim();

    if (url) {
        createImportOptionMask(option);
        importPlaylist(url);
        event.target.reset();
    }
    event.preventDefault();
}

document.getElementById("js-import-options").addEventListener("click", ({ target }) => {
    const item = getElementByAttr(target, "data-option-id");

    if (!item) {
        return;
    }
    const option = item.attrValue;

    if (!isNewOption(option)) {
        return;
    }
    setOption(option);
    removePlaylistImportForm();

    if (option.includes("local")) {
        showFilePicker(option);
        setOption();
    }
    else if (option === "dropbox") {
        scriptLoader.load({
            src: "https://www.dropbox.com/static/api/2/dropins.js",
            id: "dropboxjs",
            "data-app-key": ""
        })
        .then(showDropboxChooser);
    }
    else {
        selectOption(item.elementRef);
    }
});

export {
    setOption,
    importPlaylist,
    addImportedPlaylist,
    showNotice,
    createImportOptionMask,
    removeImportOptionMask
};