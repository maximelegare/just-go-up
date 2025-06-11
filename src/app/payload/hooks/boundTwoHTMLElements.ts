export const boundModalToHTMLElement = (
  targetElementId: string,
  modalElementId: string,
  modalVisibility: boolean,
) => {
  if (modalVisibility) {
    const targetElement = document.getElementById(targetElementId)
    const modal = document.getElementById(modalElementId)

    if (targetElement && modal) {
      const rect = targetElement.getBoundingClientRect()

      modal.style.top = `${rect.top + 35}px`
      modal.style.right = `${rect.left}px`
    }
  }
}
