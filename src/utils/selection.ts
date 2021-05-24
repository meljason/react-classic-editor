import { Element } from "../types";
import { showPopup } from "./popup";

export function getSelection(element: Element, delay?: boolean, ignoreCase?: boolean) {
  let realDelay: boolean = delay ? true : false;
  let delayMs: number = 200
  function fireSelection() {
    const txt = window.getSelection();

    const newCase = ignoreCase ? true : txt && txt?.toString().trim().length > 0

    if (newCase) {
      const { popup } = showPopup(element)
      if (!popup) return

      const range = txt?.getRangeAt(0);
      const boundary = range?.getBoundingClientRect();

      const top = boundary?.top;
      const left = boundary?.left;
      const width = boundary?.width;

      if (top && left && width && popup) {
        popup.style.top = top - 44 + "px";
        popup.style.left = left + (width / 2 - (element === 'tooltip' ? 280 : 240) / 2) + "px";
      }
    }
    return
  }

  if (!realDelay) fireSelection()
  setTimeout(() => fireSelection(), delayMs)
};

export function isSelected(tag: string) {
  const selection = window.getSelection &&  window.getSelection();
  const empty = { selected: false, related: null }

  if (!selection) return empty
  if (!selection.focusNode) return empty
  if (!selection.focusNode.parentElement) return empty

  let currentNode : HTMLElement = selection.focusNode.parentElement;

  while (currentNode.id !== 'editor') {
    if (currentNode.tagName === tag) {
      const href = currentNode.getAttribute('href')
      return { selected: true, related: href }
    }
    if (!currentNode.parentElement) break
    currentNode = currentNode.parentElement
  } 
  return empty
}

export function saveSelection() {
  const win = window

  if (win.getSelection) {
    const sel = win.getSelection();
    if (!sel) return { range: null }
    if (sel.getRangeAt && sel.rangeCount) {
      return { range: sel.getRangeAt(0) };
    }
  }
  return { range: null };
}