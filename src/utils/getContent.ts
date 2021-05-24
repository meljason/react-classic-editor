export function getContent() {
  const editor = document.getElementById('editor')
  if (!editor) return { html: null }
  const html = editor.innerHTML
  return { html }
}
