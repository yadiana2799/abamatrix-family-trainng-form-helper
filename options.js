
document.addEventListener("DOMContentLoaded", () => {
  const promptTemplateTextarea = document.getElementById("prompt-template");
  const saveButton = document.querySelector("button[type='submit']");

  // Load the saved prompt template from storage
  chrome.storage.sync.get("promptTemplate", (data) => {
    if (data.promptTemplate) {
      promptTemplateTextarea.value = data.promptTemplate;
    }
  });

  // Save the prompt template to storage when the save button is clicked
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    const promptTemplate = promptTemplateTextarea.value;
    chrome.storage.sync.set({ promptTemplate }, () => {
      console.log("Prompt template saved.");
    });
  });
});
