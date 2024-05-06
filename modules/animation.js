import {
    hide_all, show_all, animate_all, deanimate_all, erase_all, unerase_all
} from './util.js';


export class StopAnimation extends Error {
    constructor(message) {
        super(message);
        this.name = "StopAnimation";
    }
}


export class Animation {
    static _ANIMATION_TYPES = ['show', 'animate', 'erase'];

    constructor(slide) {
        this._slide = slide;
        this._steps = this.get_steps();
        this._current = null;
        this.hide_all();
    }

    get slide() {
        return this._slide;
    }

    get_steps() {
        const merged = this._merge_class(this.constructor._ANIMATION_TYPES);
        return merged.map(item => item[1]);
    }
    
    _merge_class(classes) {
        let merged = [];
        const trios = this._get_number_class_list(classes);
        for (let [n, element, cls] of trios) {
            this._add_element(merged, n, element, cls);
        }
        return merged;
    }

    _get_number_class_list(classes) {
        let trios = this._get_classes(classes).map(
            item => [this._get_class_value(...item), ...item]
        );
        trios.sort((a, b) => a[0] - b[0]);
        return trios;
    }

    _get_classes(classes) {
        let elements = [];
        for (let cls of classes) {
            let pattern = `[class*="${cls}-"]`;
            let selected = this._slide.querySelectorAll(pattern);
            for(let element of selected) {
                elements.push([element, cls]);
            }
        }
        return elements;
    }

    _get_class_value(element, cls) {
        const text = element.attributes.class.nodeValue;
        const pattern = `${cls}-(\\d+)`;
        const regex = new RegExp(pattern);
        const matched = text.match(regex);
        return Number(matched[matched.length-1]);
    }

    _add_element(merged, n, element, cls) {
        if (merged.length > 0) {
            const last = merged.pop();
            if (last[0] == n) {
                last[1][cls].push(element);
                merged.push([n, last[1]]);
            } else {
                merged.push(last);
                merged.push([n, this._start_step(element, cls)]);
            }
        } else {
            merged.push([n, this._start_step(element, cls)]);
        }
    }

    _start_step(element, cls) {
        let initial = {};
        for (let type of this.constructor._ANIMATION_TYPES) 
            initial[type] = [];
        initial[cls].push(element);        
        return initial;
    }

    move_forward() {
        if (this._current + 1 <= this._steps.length) {
            show_all(this._steps[this._current]['show']);
            animate_all(this._steps[this._current]['animate']);
            erase_all(this._steps[this._current]['erase']);
            this._current++;
        } else {
            throw new StopAnimation();
        }
    }

    move_backwards() {
        if (this._current > 0) {
            --this._current;
            hide_all(this._steps[this._current]['show']);
            deanimate_all(this._steps[this._current]['animate']);
            unerase_all(this._steps[this._current]['erase']);
        } else {
            throw new StopAnimation();
        }
    }

    show_all() {
        for (let step of this._steps) {
            show_all(step['show']);
            animate_all(step['animate']);
            erase_all(step['erase']);
        }
        this._current = this._steps.length;
    }

    hide_all() {
        for (let step of this._steps) {
            hide_all(step['show']);
            deanimate_all(step['animate']);
            unerase_all(step['erase']);
        }
        this._current = 0;
    }

    render_canvas() {
        // Used for Three.js
        const canvases = this.slide.getElementsByTagName('canvas');
        for (let canvas of canvases) {
            try {
                canvas.force_render();
            } catch(error) {}
        }
    }
}
