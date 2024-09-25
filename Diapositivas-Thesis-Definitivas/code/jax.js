"use strict";

(function() {
    const mathjax_config = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            processEscapes: true,
            macros: {
                R: "{\\mathbb{R}}",
                C: "{\\mathbb{C}}",
                H: "{\\mathbb{H}}",
                O: "{\\mathrm{O}}",
                Id: "\\mathop{\\rm Id}",
                curv: "{\\tilde{R}}",
                tors: "{\\tilde{T}}",
                TT: "{\\tilde{\\nabla}}",
                T: "{\\nabla}",
                g: "{\\mathfrak{g}}",
                h: "{\\mathfrak{h}}",
                m: "{\\mathfrak{m}}",
                S: "{\\mathrm{S}}",
                SC: ["{\\underset{\\tiny{#1}}{\\mathfrak{S}}}",1],
                CH: "{\\mathbb{C}\\mathrm{H}}",
                SU: "{\\mathrm{SU}}",
                U: "{\\mathrm{U}}",
                a: "{\\mathfrak{a}}",
                n: "{\\mathfrak{n}}",
                s: "{\\mathfrak{s}}",
                u: "{\\mathfrak{u}}",
                su: "{\\mathfrak{su}}",
            },
            autoload: {
                color: [],
                colorV2: ['color']
            },
            packages: {
                '[+]': ['noerrors']
            }
        },
        options: {
            renderActions: {
                addMenu: [],
                checkLoading: []
            },
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
        },
        loader: {
            load: ['[tex]/noerrors']
        }
    };

    function load_mathjax(mode) {
        const online = "https://cdn.jsdelivr.net/npm/mathjax@3";              
        const folder = document.currentScript.src.split('/jax.js')[0];
        const local = `${folder}/mathjax`;
        let run = mode === "online" ? online : local;
        let script = document.createElement('script');
        script.src = `${run}/es5/tex-chtml.js`
        script.async = true;
        script.id = "MathJax-script";
        document.head.appendChild(script);
    }

    window.MathJax = mathjax_config;
    load_mathjax("online");
    
})();
