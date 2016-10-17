import { removeElement, removeElementClass, getElementByAttr, scriptLoader } from "./../main.js";
import { initializeWorker } from "./../worker.js";
import { getPlaylistById, createPlaylist } from "./playlist.js";
import { updatePlaylist } from "./playlist.manage.js";
import { showDropboxChooser } from "./../dropbox.js";
import { selectLocalFiles } from "./../local.js";
import * as yt from "./../youtube.js";
import * as sc from "./../soundcloud.js";

let option = "";

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

function importPlaylist(name, value) {
    if (name === "youtube") {
        yt.fetchPlaylist(value);
    }
    else if (name === "soundcloud") {
        sc.fetchPlaylist(value);
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

function addImportedPlaylist(importOption, newPlaylist) {
    const pl = getPlaylistById(newPlaylist.id) || createPlaylist({
        id: newPlaylist.id,
        title: newPlaylist.title,
        type: "grid"
    });
    const tracks = filterDuplicateTracks(newPlaylist.tracks, pl.tracks);

    updatePlaylist(pl, tracks, importOption);
}

function createPlaylistImportForm(container) {
    const form = `
        <form id="js-import-form" class="import-form">
            <input type="text" name="playlist-url" class="input" placeholder="Playlist url">
            <button class="btn">Import</button>
        </form>
    `;

    container.insertAdjacentHTML("beforeend", form);
    document.getElementById("js-import-form").addEventListener("submit", handleImportFormSubmit);
}

function removePlaylistImportForm() {
    const form = document.getElementById("js-import-form");

    if (form) {
        form.removeEventListener("submit", handleImportFormSubmit);
        removeElement(form);
    }
}

function selectOption(item) {
    const newOption = item.attrValue;

    if (newOption !== option) {
        option = newOption;
        removePlaylistImportForm();
        removeElementClass("import-option-btn", "active");
        item.elementRef.classList.add("active");
        createPlaylistImportForm(item.elementRef);
    }
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
        filePicker.setAttribute("multiple", true);
    }
    else if (choice === "local-folder") {
        filePicker.setAttribute("webkitdirectory", true);
        filePicker.setAttribute("directory", true);
    }
    filePicker.dispatchEvent(clickEvent);
}

function handleImportFormSubmit(event) {
    const value = event.target.elements["playlist-url"].value.trim();

    if (value) {
        createImportOptionMask(option);
        importPlaylist(option, value);
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

    if (option.includes("local")) {
        showFilePicker(option);
    }
    else if (option === "dropbox") {
        const isLoaded = scriptLoader.load({
            src: "https://www.dropbox.com/static/api/2/dropins.js",
            id: "dropboxjs",
            "data-app-key": ""
        }, showDropboxChooser);

        if (isLoaded) {
            showDropboxChooser();
        }
    }
    else {
        selectOption(item);
    }
});

window.addEventListener("load", function onLoad() {
    scriptLoader.load({ src: "js/libs/sdk.js" }, sc.init);
    scriptLoader.load({ src: "https://www.youtube.com/iframe_api" });
    scriptLoader.load({ src: "js/libs/metadata-audio-parser.js" });

    initializeWorker();
    window.removeEventListener("load", onLoad);
});

export {
    addImportedPlaylist,
    showNotice,
    createImportOptionMask,
    removeImportOptionMask
};
