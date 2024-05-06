import {SlideShow} from './slideshow.js';


export function start_page() {
    const mode = get_mode();
    console.log(`${mode} mode`)
    if (mode === "Slideshow") {
        window.addEventListener("load", on_load);
    } else if (mode === "Print") {
        window.addEventListener("load", on_print_load);
    };
}


function on_load() {
    const slide_show = new SlideShow(document);
    slide_show.start();
}

function on_print_load() {
    const slide_show = new SlideShow(document);
    slide_show.print_mode();
    const canvases = document.querySelectorAll('canvas');
    for (let i = 0; i < canvases.length; i++) {
        canvases[i].force_render();
    }
}

function get_mode() {
    // Decide if slideshow mode is on, based on whether "code/print.css" 
    // is loaded or not
    let parts, mode = "Slideshow";
    for (let sheet of document.styleSheets) {
        if (sheet.href !== null) {
            parts = sheet.href.split("code/");
            if (parts.length > 1) {
                if (parts[1] === "print.css") {
                    mode = "Print";
                    break;
                } else if (parts[1] === "notransitions.css") {
                    mode ="No transitions";
                    break;
                }
            }
        }
    }
    return mode;
}

start_page();
