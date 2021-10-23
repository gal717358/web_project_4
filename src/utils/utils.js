export function renderLoading(isLoading, text, button) {
  button.textContent = text;
  button.setAttribute = ("disabled", isLoading);
}
