(function () {
  let currentUrl = location.href;

  function checkUrlChange() {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      console.log("URL changed to:", currentUrl);
      if (currentUrl === "https://app.abamatrix.com/caregiver_competency") {
        handleTargetUrl();
      }
    }
  }

  function handleTargetUrl() {
    console.log("Target URL reached!");


    const clientName = Array.from(document.querySelectorAll('span.mat-subheading-2.secondary-text'))
      .find(span => span.textContent.trim() === 'Client:')
      ?.closest('div')
      ?.textContent.replace('Client:', '').trim();

    console.log("Client Name:", clientName);


  }

  const pushState = history.pushState;
  const replaceState = history.replaceState;

  history.pushState = function () {
    pushState.apply(history, arguments);
    checkUrlChange();
  };

  history.replaceState = function () {
    replaceState.apply(history, arguments);
    checkUrlChange();
  };

  window.addEventListener("popstate", checkUrlChange);


  const observer = new MutationObserver(checkUrlChange);
  observer.observe(document, { subtree: true, childList: true });

  checkUrlChange();
})();
