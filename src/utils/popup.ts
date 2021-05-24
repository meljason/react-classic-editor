import { Element } from "../types"

export function showPopup(element: Element): { popup: HTMLElement | null } {
  const customPopup = document.getElementById(element) as HTMLElement

  if (!customPopup) return { popup: null }

  customPopup.style.visibility = "visible"
  customPopup.style.opacity = "1"

  return { popup: customPopup }
}

export function removePopup(element: Element) {
  const customPopup = document.getElementById(element) as HTMLElement

  if (!customPopup) return
  setTimeout(() => {
    customPopup.style.visibility = 'hidden'
    customPopup.style.opacity = "0"
  }, 200)
}
