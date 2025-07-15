
document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("api-key");
  const saveButton = document.querySelector("button[type='submit']");

  // Load the saved API key from storage
  chrome.storage.sync.get("apiKey", (data) => {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
  });

  // Save the API key to storage when the save button is clicked
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    const apiKey = apiKeyInput.value;
    chrome.storage.sync.set({ apiKey }, () => {
      console.log("API key saved.");
    });
  });
});
