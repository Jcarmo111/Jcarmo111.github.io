'''
module2file.py merges all the files in the modules folder to a single
javascript file.
Javascript modules have several advantages, but they need an html server.
The aim of the generated Javascript file is to be used without a server.
'''

from pathlib import Path
from textwrap import indent
from typing import TextIO


_ROOT_FOLDER = Path(__file__).parent.parent
_CODE_FOLDER = _ROOT_FOLDER / 'code'
_MODULES_FOLDER = _ROOT_FOLDER / 'modules'

_JS_FILE = _CODE_FOLDER / 'slides.js'
_UTIL_FILE = _MODULES_FOLDER / 'util.js'
_ANIMATION_FILE = _MODULES_FOLDER / 'animation.js'
_SLIDESHOW_FILE = _MODULES_FOLDER / 'slideshow.js'
_SLIDES_FILE = _MODULES_FOLDER / 'slides.js'

_INDENT = ' '*4


def generate_js() -> None:
    '''
    Generates the js file that is equivalent to the module.
    '''
    with open(_JS_FILE, 'w', encoding='utf-8') as js_file:
        js_file.write('"use strict";\n\n')
        js_file.write('(function() {\n')
        _insert_file(js_file, _UTIL_FILE)
        _insert_file(js_file, _ANIMATION_FILE, skip=4)
        _insert_file(js_file, _SLIDESHOW_FILE, skip=3)
        _insert_file(js_file, _SLIDES_FILE, skip=2)
        js_file.write('\n})();\n')


def _insert_file(js_file: TextIO, input_file: Path, skip: int = 0) -> None:
    with open(input_file, encoding='utf-8') as file:
        for _ in range(skip):
            next(file)
        for line in file:
            js_file.write(indent(line.removeprefix('export '), _INDENT))


if __name__ == '__main__':
    generate_js()
