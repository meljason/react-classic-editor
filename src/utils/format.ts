import { Style } from "../types";
import { defaults, lists } from "./constants";
import { removePopup } from "./popup";
import { validURL } from "./validators";

const execute = (aCommandName: string, aValueArgument?: string) => {
  document.execCommand(aCommandName, false, aValueArgument)
}

export function insertLink(range: Range | undefined | null, value: string, text?: string) {
  const content = text ? text : range ? range.toString() : text ? text : ''
  const editor = document.getElementById('editor')
  if (!editor) return

  if (!value || value.trim().length < 1) return

  const link = document.createElement("a");
  link.href = validURL(value) ? value : `https://${value}`;
  link.style.cursor = 'pointer';
  link.setAttribute('title', value)

  if (!range) {
    link.innerHTML = content
    editor.append(link)
    removePopup("link-insert");
    return
  }

  range.deleteContents()
  range.insertNode(document.createTextNode(content))

  removePopup("link-insert");
  return range.surroundContents(link);
}

export function format(id: Style) {
  let range;
  const selection = window.getSelection && window.getSelection();
  if (!selection) return;
  if (selection && selection.rangeCount > 0) range = selection.getRangeAt(0);
  if (!range) return;

  const anchorNode = selection?.anchorNode;
  if (!anchorNode) return;

  if (defaults.includes(id)) {
    execute(id)
  } else if (id === 'heading') {
    if (selection && selection.toString().length > 1) {
      const anchorNode = selection.anchorNode;
      if (!anchorNode) return
      const parent = anchorNode.parentElement

      if (parent?.tagName === 'H2') {
        const previousSelection = parent.innerHTML
        parent.remove()
        execute('insertHTML', `<span>${previousSelection}</span>`)
        return
      }

      execute('insertHTML', `<h2>${selection}</h2>`)
      return
    }
    execute('formatBlock', `<h2>`)
  } else if (lists.includes(id)) {
    execute(id === 'ul' ? 'insertUnorderedList' : 'insertOrderedList')
  }
}