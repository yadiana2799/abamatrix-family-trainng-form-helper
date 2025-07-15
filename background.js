
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateNote") {
    const { prompt } = request.data;

    // Make a request to the ChatGPT API
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices.length > 0) {
        sendResponse({ note: data.choices[0].message.content.trim() });
      } else {
        sendResponse({ note: "Error: Could not generate a note." });
      }
    })
    .catch(error => {
      console.error("Error making API request:", error);
      sendResponse({ note: "Error: Could not generate a note." });
    });

    return true;  // Indicates that the response is sent asynchronously
  }
});
