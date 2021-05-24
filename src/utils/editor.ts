import { ActiveParams } from "../types";
import { getCurrentStyle } from "./keymappings";
import { getSelection, isSelected } from "./selection";

export function onInput(ac: ActiveParams, toolbar: boolean, setCounter: (param: number) => void) {
  getCurrentStyle({ ac, toolbar })
  const editor = document.getElementById("editor");
  if (!editor) return
  const words = editor?.innerText
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");
  if (words) {
    if (words[0] === '') editor.innerHTML = ''

    words.length === 1 && words[0] === ""
      ? setCounter(0)
      : setCounter(words.length);
  }
  if (editor.innerHTML.trim() === "<br>") editor.innerHTML = "";
}

export function mouseCapture(ac: ActiveParams, toolbar: boolean, setLink: (param: string | null) => void) {
  const { selected, related } = isSelected('A')

  if (selected) {
    setLink(related)
    getSelection('link-preview', false, true)
  }

  getCurrentStyle({ ac, toolbar })
}
