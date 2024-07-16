const sign_preview = document.getElementById("preview-text");
const code_area = document.getElementById("text-input");

const text_input = document.getElementById("input-text");
const color_input = document.getElementById("input-color");
const color_picker = document.getElementById("input-color-picker");

const size_input = document.getElementById("input-size");
const voffset_input = document.getElementById("input-voffset");


function updateSignText() {
    sign_preview.innerHTML = text_input.value;
    updateSignCode();
}
function updateColorPicker(color) {
    color_picker.style.background = color;
    sign_preview.style.color = color;
    updateSignCode();
}
function updateSizeInput() {
    if(size_input.value && size_input.value != "0") {
        sign_preview.style.setProperty('--size', Number(size_input.value));
    }
    else {
        sign_preview.style.setProperty('--size', "calc(var(--size-default) - var(--voffset))");
    }
    updateSignCode();
}
function updateOffset() {
    if(voffset_input.value && voffset_input.value != "0") {
        sign_preview.style.setProperty('--voffset', Number(voffset_input.value));
    }
    else {
        sign_preview.style.setProperty('--voffset', 0);
    }

    updateSignCode();
}

function updateInput(el, value) {
    const target_input = el.parentElement.parentElement.querySelector('input');
    target_input.value = (Number(target_input.value) || 0) + value;
    if(target_input.value && Number(target_input.value) < 0) target_input.value = 0;
    target_input.onchange();
}

function updateSignCode() {
    let code_text = "";
    if(color_input.value && color_input.value != "#000000") code_text += `<${color_input.value}>`;
    if(size_input.value && size_input.value != "0") code_text += `<size=${size_input.value.replace(',', '.')}>`;
    if(voffset_input.value && voffset_input.value != "0") code_text += `<voffset=${voffset_input.value}>`;

    code_text += text_input.value;

    document.getElementById("text-input").value = code_text;
    document.getElementById("text-input-label").innerHTML = [...code_text].length;

    if(!size_input.value || size_input.value == "0") updateSignAutoSize(text_input.value);
}
function updateSignAutoSize(text) {
    const text_length = [...text].length;
    if(text_length >= 8) {
        let size_reduct = 8 - Math.floor((text_length - 2) / 3);
        if(text_length >= 12) {
            size_reduct = 6 - Math.floor(text_length / 12);
        }
        sign_preview.style.setProperty('--size-default', size_reduct);
    }
    else {
        sign_preview.style.setProperty('--size-default', 8);
    }
}

text_input.onkeyup = updateSignText;
text_input.onkeydown = updateSignText;

color_input.onkeyup = () => { updateColorPicker(color_input.value) };
color_input.onkeydown = () => { updateColorPicker(color_input.value) };
color_picker.oninput = () => {
    color_input.value = color_picker.value;
    updateColorPicker(color_picker.value);
}
code_area.onclick = () => {
    code_area.select();
    code_area.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(code_area.value);
}

size_input.onkeyup = updateSizeInput;
size_input.onkeydown = updateSizeInput;
size_input.onchange = updateSizeInput;

voffset_input.onkeyup = updateOffset;
voffset_input.onkeydown = updateOffset;
voffset_input.onchange = updateOffset;