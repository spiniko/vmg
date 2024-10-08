javascript: (function () {
    window.generateMessage = function () {
      const userAgent = navigator.userAgent;
      const os = /Windows NT 10.0/.test(userAgent)
        ? "Windows 10"
        : /Windows NT 6.3/.test(userAgent)
        ? "Windows 8.1"
        : /Windows NT 6.2/.test(userAgent)
        ? "Windows 8"
        : /Windows NT 6.1/.test(userAgent)
        ? "Windows 7"
        : /Mac OS X/.test(userAgent)
        ? "Mac OS X"
        : /Linux/.test(userAgent)
        ? "Linux"
        : "Unknown OS";
      const { browserName, fullVersion } = /Firefox\/(\S+)/.exec(userAgent)
        ? {
            browserName: "Firefox",
            fullVersion: /Firefox\/(\S+)/.exec(userAgent)[1]
          }
        : /Chrome\/(\S+)/.exec(userAgent) && !/Edg/.exec(userAgent)
        ? {
            browserName: "Chrome",
            fullVersion: /Chrome\/(\S+)/.exec(userAgent)[1]
          }
        : /Safari\/(\S+)/.exec(userAgent) && !/Chrome/.exec(userAgent)
        ? {
            browserName: "Safari",
            fullVersion: /Version\/(\S+)/.exec(userAgent)[1]
          }
        : {
            browserName: "Unknown Browser",
            fullVersion: "X.X.X"
          };
      const envBrowserAndOS = `${os} | ${browserName} v${fullVersion}`;
      const msgBox = document.querySelector("#message");
      const issueKey = document
        .querySelector(
          "#main-content > app-route-wrapper > app-route-wrapper > app-route-wrapper > app-view-manual-audit-issue > div > div.row.col-12 > div.col-xl-8 > div > div.card-body > div:nth-child(1) > div.col-12.d-flex.flex-column > h2"
        )
        .textContent.split(" ")[1]
        .replace("–", "-");
      const testURL = document.querySelector(
        "#main-content > app-route-wrapper > app-route-wrapper > app-route-wrapper > app-view-manual-audit-issue > div > div.row.col-12 > div.col-xl-8 > div > div.card-body > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div:nth-child(2) > span:nth-child(2) > a"
      ).textContent;
      const finalStatus = document
        .querySelector("#dropdownBasic1")
        .textContent.trim();
      const status = finalStatus.toLowerCase();
      const statuses = {
        open: "open",
        toReview: "to review",
        dismissed: "dismissed",
        fixed: "fixed",
        notFixed: "not fixed",
        partiallyFixed: "partially fixed",
        cannotBeFixed: "cannot be fixed",
        notReproducible: "not reproducible"
      };
      const tools = [
        `${browserName} Browser Dev tools`,
        "NVDA screen reader",
        "Keyboard",
        "Accessible Color Picker",
        "Headings Map Extension"
      ];
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const formattedDate = mm + dd + yyyy;
      const testLocation = `Validation Test Location: ${testURL}`;
      const testEnvironment = `Environment: ${envBrowserAndOS}`;
      const testTools = `Testing Tools: ${tools.join(", ")}`;
      const testStatus = `Final Status: ${finalStatus}`;
      const screenshotName = `Screenshot (attached): ${issueKey}_${formattedDate}_${finalStatus
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("_")}_Validation.png`;
      const testNotes = `Notes: The issue initially reported is ${status}.`;
      let alertMsg,
        msgTemplate,
        isValidationCompleted,
        recommendation,
        showRecommendation;
      isValidationCompleted =
        status !== statuses.open && status !== statuses.toReview;
      showRecommendation =
        status === statuses.notFixed || status === statuses.partiallyFixed;
      recommendation = showRecommendation
        ? "Recommendation: We recommended to follow the original guidance."
        : "";
      alertMsg = isValidationCompleted
        ? `The Validation Message has been generated.\n\nPlease review the Comments and Activity section and make any necessary edits before posting.`
        : `Please complete the validation and update the issue STATUS before proceeding.`;
      msgTemplate = "";
      if (isValidationCompleted) {
        msgTemplate = `${testLocation}\n${testEnvironment}\n${testTools}\n${testStatus}\n${screenshotName}\n${testNotes}\n${recommendation}`;
        (msgBox.value = msgTemplate.trim()),
          (msgBox.style.height = "250px"),
          msgBox.focus();
      }
      alert(`The issue is ${status.toUpperCase()}.\n\n${alertMsg}`);
    };
    generateMessage();
  })();
  
