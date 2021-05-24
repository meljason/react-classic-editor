import { SetStyleParams, Style } from "../types"
import { removePopup } from "./popup";
import { getSelection, isSelected, saveSelection } from "./selection"

export function readKey(setRange: (range: Range | null) => void, active: any, setActive: (param: any) => void) {
  function updateActive(style: Style) {
    let temp = active;
    temp = { ...active, [style]: !active[style] };
    setActive(temp);
  }

  const listener: Window & typeof globalThis = window || document,
   editor = document.getElementById('editor'),
   link = document.getElementById('link-insert'),
   imageModal = document.getElementById('image-modal'),
   linkModal = document.getElementById('link-modal')
  
  const selection = listener.getSelection()
  if (!selection) return

  if (!editor) return
  editor.onkeyup = () => setRange(saveSelection().range)
  editor.onmouseup = () => setRange(saveSelection().range)

  listener.onkeydown = function(e: KeyboardEvent) {
    const keyCode = e.key,
      arrows = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"],
      editor = document.getElementById('editor')

    if (!editor) return

    removePopup('link-preview')

    if (e.ctrlKey) {
      if (
        link?.style.visibility === 'visible'
        || imageModal?.style.visibility === 'visible'
        || linkModal?.style.visibility === 'visible'
      ) return
      switch (keyCode) {
        case 'b': updateActive('bold'); break;
        case 'i': updateActive('italic'); break;
        case 'u': updateActive('underline'); break;
        case 'a': getSelection('tooltip'); break;
        default: removePopup('tooltip'); break;
      }
      if (e.shiftKey && arrows.includes(keyCode)) getSelection("tooltip");
      editor.focus(); 
    } else if (e.shiftKey) {
      if (arrows.includes(keyCode)) getSelection('tooltip')
    }
  }
} 

export function getCurrentStyle({ ac, toolbar }: SetStyleParams) {
  const { active, setActive } = ac
  let temp = active;
  temp = {
    ...active,
    bold: isSelected("B").selected,
    italic: isSelected("I").selected,
    underline: isSelected("U").selected,
    heading: isSelected("H2").selected,
    link: isSelected("A").selected,
    ul: isSelected("UL").selected,
    ol: isSelected("OL").selected,
  };
  setActive(temp);

  if (!toolbar) {
    const customTooltip = document.getElementById(
      "tooltip"
    ) as HTMLElement;
    if (customTooltip.style.visibility === "visible") {
      removePopup("tooltip");
    }

    getSelection("tooltip");
  }
}