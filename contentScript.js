window.addEventListener('click', (event) => {
    if(event.target.id === "sendBtn" || event.target.textContent === "Send and next active" || event.target.className === 'sender' || event.target.textContent === "Closed") {
        setTimeout(loadDetails, 1000);
    } else if (event.target.className === 'icon-caret-up' || event.target.className === 'icon-caret-down') {
        setTimeout(loadDetails, 1000);
    } else if(document.body.classList.contains('loading') && event.target.id === "sendBtn" || event.target.textContent === "Send and next active" || event.target.className === 'sender' || event.target.textContent === "Closed" || event.target.id === "navReply" || event.target.className === "icon-save" || event.target.id === "saveThreadBtn" || event.target.className === 'icon-delete') {
        return;
    } else if(document.body.classList.contains('loading') && event.path[0].className === 'preview') {
        setTimeout(loadDetails, 1000);
    }
});

window.addEventListener('keydown', (event) => {
    //console.log(event.target);
    if(
        (event.keyCode === 74 || event.keyCode === 75) && 
        event.target.className.includes("redactor_redactor") || 
        event.target.className.includes("response-input") || 
        event.target.className.includes("custom-textarea") || 
        event.target.className.includes("textboxlist") ||
        event.target.className.includes("redactor_input") ||
        event.target.id === 'tag'
    ) {
        return;
    } else if(event.keyCode === 74 && window.location.href.includes("https://secure.helpscout.net/conversation/")) {
        setTimeout(loadDetails, 1000);
    } else if(event.keyCode === 75 && window.location.href.includes("https://secure.helpscout.net/conversation/")) {
        setTimeout(loadDetails, 1000);
    }
})

function loadDetails() {
    /*********************************************
    ********* HELPSCOUT CUSTOM ELEMENTS **********
    *********************************************/

    let customFields = document.getElementById('custom-fields-container');
    let isVerified = document.getElementById('custom-verified');
    let sidebar = document.querySelector('.sidebar-left');

    /*********************************************
    ********* VERIFY DROPDOWN & VARIABLES ********
    *********************************************/

    let ddWrap = document.createElement('div');
    let ddTrigger = document.createElement('div');
    let ddTriggerText = document.createElement('p');
    let ddContent = document.createElement('div');
    let ddText = document.createElement('p');
    let ddBadge = document.createElement('p');
    let feedbackWrap = document.createElement('div');
    let feedbackLink = document.createElement('a');
    let settingsLink = document.createElement('a');
    let toolTip = document.createElement('div');
    let toolTipPop = document.createElement('div');
    let toolTipContent = document.createElement('div');
    let tooltipIndicator = document.createElement('div');
    let textArea = document.createElement('textarea');
    textArea.classList.add('custom-textarea');
    sidebar ? sidebar.appendChild(textArea) : false;
    //sidebar.appendChild(textArea);
    let toolTipData = ["If details don't appear, refresh page with CMD + R", "OPTION + E to open/close conversation details", "Details may not be shown on longer conversations (Helpscout conflict)", "Disable other unnecessary extensions to avoid conflicts and unexpected behavior", "An Admin button will appear next to the email if the email matches the Webflow account email", "Use the textarea box on the left side to gather details on longer conversations. Reloading the page will remove any notes in this area"];
    let toolTipTipsHtml = "";

    let hsPageWrap = document.getElementById('js-wrap');
    let notifyBar = document.createElement('div');
    let notifyBarWrap = document.createElement('div');
    let notifyBarClose = document.createElement('p');
    notifyBarClose.classList.add('notify-close');
    notifyBarClose.textContent = "X";
    notifyBar.append(notifyBarWrap);
    notifyBar.append(notifyBarClose);
    notifyBar.classList.add('notification-bar');
    notifyBarWrap.classList.add('notification-bar-wrap');

    /*********************************************
    **********************************************
    **********************************************
    ********* UPDATE NOTIFICATION MESSAGE ********
    **********************************************
    **********************************************
    *********************************************/

    //To update notification, increment newNotificationCount from its current value by 1... i.e., if 0.0, make it 0.1

    notifyBarWrap.innerHTML = `
    <p class="notification-text">
        <strong>This is a new update |</strong> 
        <a class="notification-link" href="https://app.clickup.com/" target = "_blank">Report instance here</a> - <em>updated on Dec/01/2020</em>
    </p>`;
    let newNotificationCount = 0.0;

    /*********************************************
    **********************************************
    **********************************************
    ********* UPDATE NOTIFICATION MESSAGE ********
    **********************************************
    **********************************************
    *********************************************/

    hsPageWrap.prepend(notifyBar);

    toolTip.textContent = "?";
    feedbackLink.href = "https://forms.gle/5EjYzGxBFsHYp7Lq9";
    feedbackLink.target = "_blank";
    feedbackLink.textContent = "Submit Feedback/Bugs";

    settingsLink.textContent = "Settings";
    settingsLink.classList.add('setting-link');

    feedbackWrap.append(feedbackLink);
    feedbackWrap.append(settingsLink);
    feedbackWrap.append(toolTip);

    //sends a message to background.js to open options.html
    settingsLink.addEventListener("click", () => {
        chrome.runtime.sendMessage("showOptions");
    });

    ddWrap.append(ddTrigger);
    ddWrap.append(ddContent);
    ddTrigger.append(ddText);
    toolTip.append(toolTipPop);
    toolTipPop.append(tooltipIndicator);
    toolTipPop.append(toolTipContent);
    ddWrap.append(feedbackWrap);

    /*********************************************
    ********* DD wrap insertion was here *********
    *********************************************/

    ddWrap.classList.add('dd-wrap');
    ddTrigger.classList.add('dd-trigger');
    ddTriggerText.classList.add('dd-trigger-heading');
    ddContent.classList.add('dd-content');
    ddText.classList.add('dd-text');
    feedbackWrap.classList.add('feedback-wrap');
    feedbackLink.classList.add('feedback-text');
    toolTip.classList.add('custom-tooltip');
    toolTipPop.classList.add('tooltip-pop');
    tooltipIndicator.classList.add('tooltip-indicator');

    ddTriggerText.textContent = "Conversation Details";
    ddText.textContent = "CLOSE";
    ddTrigger.append(ddTriggerText);

    ddBadge.textContent = "Not Verified";
    ddBadge.classList.add('dd-badge');
    ddTrigger.append(ddBadge);

    /*********************************************
    ********* NOTIFICATION BAR *******************
    *********************************************/

    chrome.storage.sync.get(['notifySetting', 'notifySwitch', 'newMsgCount'], function(storageObj) {

        if((newNotificationCount > storageObj.newMsgCount) && storageObj.notifySwitch === false) {
            storageObj.notifySwitch = true;
        }
        
        if(storageObj.notifySetting === "on"){
            notifyBarClose.style.display = "none";
            notifyBar.style.display = "block";
            hsPageWrap.classList.add('hs-page-wrap');
        } else if (storageObj.notifySetting === "off" && storageObj.notifySwitch){
            notifyBarClose.style.display = "flex";
            notifyBar.style.display = "block";
            hsPageWrap.classList.add('hs-page-wrap');
        }
    });

    /*********************************************
    ***************** GET HS DOM DATA ************
    *********************************************/

    toolTipData.forEach(val => {
        toolTipTipsHtml += `<p class="tooltip-text">• ${val}</p>`;
    });

    toolTipContent.innerHTML = toolTipTipsHtml;

    let msgBody = document.getElementsByClassName("messageBody");
    let rawMsgBody = msgBody[msgBody.length - 1].innerHTML;
    let Ada = rawMsgBody.includes("Chatter Token") && rawMsgBody.includes("Chatter Id") && rawMsgBody.includes("Transcript");
    let lastMsgBody = msgBody[msgBody.length - 1].innerHTML;
    lastMsgBody = lastMsgBody.split('<br>');

    let container = document.getElementById("container");
    let html = [];
    let customMsg = document.createElement("p");
    let filteredLastMsgBody = [];
    customMsg.classList.add('custom-message');
    let ddContentWrap = document.createElement("div");
    ddContentWrap.append(customMsg);
    ddContentWrap.classList.add("dd-content-wrap");

    if(!Ada) {

        ddContent.append(ddContentWrap);
        customMsg.textContent = "Verify customer manually.";

    } else {

        filteredLastMsgBody = [
            ...lastMsgBody.filter(val => val.includes('Last Four')),
            ...lastMsgBody.filter(val => val.includes('Expiration Date')),
            ...lastMsgBody.filter(val => val.includes('Email') && !val.includes('Email Subject') ? val : false),
            ...lastMsgBody.filter(val => val.includes('First Name')),
            ...lastMsgBody.filter(val => val.includes('Hosting Transfer')),
            ...lastMsgBody.filter(val => val.includes('Issue')),
            ...lastMsgBody.filter(val => val.includes('Website Link')),
            ...lastMsgBody.filter(val => val.includes('USER'))
        ];

        let regexSplitter = /[^:]*/;

        let labels = [];
        let values = [];
        let filteredLabels = [];
        let filteredValues = [];
        let finalCustomerValues = [];

        filteredLastMsgBody.forEach(val => {
            labels.push(val.match(regexSplitter)[0].trim());
            values.push(val.slice(val.match(regexSplitter)[0].length).trim());
        });

        filteredValues = [...new Set(values)];
        filteredLabels = labels.splice(0,filteredValues.length);

        for(var x = 0; x < filteredLabels.length; x++) {
            finalCustomerValues.push(filteredLabels[x] + filteredValues[x]);
        }

        for (const [key, value] of Object.entries(finalCustomerValues)) {
            if(
            !value.includes("Selected: None of the above") &&
            !value.includes("None of the above") &&
            !value.includes("Main Menu") && 
            !value.includes("Selected: Bug report for the Designer, Editor, or Dashboard") && 
            !value.includes("Never mind") && 
            !value.includes("Selected: Email support") && 
            !value.includes("Selected: Billing or financial help") && 
            !value.includes("Not sure") && 
            !value.includes("Selected: More than once") &&
            !value.includes("Selected: Website performance") && 
            !value.includes("Selected: Account plan") &&
            !value.includes("Bug report") &&
            !value.includes("Email Support") && 
            !value.includes("Technical issues") && 
            !value.includes("Selected: Site plan") && 
            !value.includes("Account &amp; billing issues") &&
            !value.includes("Account &amp; billing") &&
            !value.includes("Account & billing") &&
            !value.includes("Duplicate or unusual charges") &&
            !value.includes("Billing or financial help") &&
            !value.includes("Selected: Both") && 
            !value.includes("Selected: Yes") && 
            !value.includes("Custom domains &amp; DNS") && 
            !value.includes("Selected: No") && 
            !value.includes("Selected: Client billing") && 
            !value.includes("Selected: Neither") && 
            !value.includes("Basic Hosting") && 
            !value.includes("Did this help?") && 
            !value.includes("Go back to the main menu") && 
            !value.includes("Technical issue with the Webflow Designer/Editor") && 
            !value.includes("Selected: Advanced publishing options") && 
            !value.includes("Selected: Clarify question") && 
            value.slice(value.match(regexSplitter)[0].length + 1).trim() !== 'No' && 
            value.slice(value.match(regexSplitter)[0].length + 1).trim() !== 'no' &&
            value.slice(value.match(regexSplitter)[0].length + 1).trim() !== 'Yes' &&
            value.slice(value.match(regexSplitter)[0].length + 1).trim() !== 'ok'
            ) {
                html+=`
                <p class="dd-block-text">
                    <strong>${value.match(regexSplitter)[0].trim()}</strong>${value.slice(value.match(regexSplitter)[0].length).trim()}
                </p>`;
            }
        }
        
        ddContentWrap.innerHTML = html;
        ddContent.append(ddContentWrap);

        //add admin link to page if email address matches webflow user email
        setTimeout(() => {
            let findAdminLink = document.querySelectorAll('h4');
            let getAdminLink;
            let userEmail;
            
            let loadedDetails = document.querySelectorAll('.dd-block-text');
            let insertAdminLink = document.createElement('a');
            insertAdminLink.target = "_blank";
            let insertAdminLinkText = document.createTextNode('Admin ➚');
            insertAdminLink.classList.add('admin-link');
            
            insertAdminLink.appendChild(insertAdminLinkText);
    
            //checking all h4 for the email after the api call
            findAdminLink.forEach(val => {
                if(val.innerHTML.includes('https://webflow.com/admin/user')) {
                    getAdminLink = val.getElementsByTagName('a')[0].href;
                    userEmail = getAdminLink.slice(getAdminLink.match(/[^=]*/)[0].length + 1).toLowerCase();
                    
                    insertAdminLink.href = getAdminLink;

                    //selecting all inserted blocks from the dropdown
                    loadedDetails.forEach(email => {
                        //checking each inserted block to see if it contains the webflow user email
                        if(email.innerText.toLowerCase().includes(userEmail) && email.innerText.includes('Email:')) {
                            email.append(insertAdminLink);
                        }
                    });
                }
            });
        }, 1000);

    };//else of if else statement

    /*********************************************
    ***************** FUNCTIONS ******************
    *********************************************/

    notifyBarClose.addEventListener('click', () => {
        notifyBar.style.display = "none";
        hsPageWrap.classList.remove('hs-page-wrap');
        chrome.storage.sync.set({'notifySetting': 'off'});
        chrome.storage.sync.set({'notifySwitch': false});
        chrome.storage.sync.set({'newMsgCount': newNotificationCount});
    });

    toolTip.addEventListener('mouseover', () => {
        toolTipPop.style.display = "block";
    });

    toolTip.addEventListener('mouseout', () => {
        toolTipPop.style.display = "none";
    });

    document.onkeydown = function(e) {
        if(ddText.textContent === "CLOSE" && (e.altKey && e.keyCode == 69)) {
            closeDropdown();
        } else if(ddText.textContent === "OPEN" && (e.altKey && e.keyCode == 69)) {
            openDropdown();
        }
    };

    ddText.addEventListener('click', () => {
        if(ddText.textContent === "CLOSE") {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    function closeDropdown() {
        feedbackWrap.style.display = "none";
        ddContentWrap.classList.add('hide-dd-content-block');
        ddTrigger.classList.add('no-bottom-border');
        ddContent.classList.add('dd-content-close');
        ddText.textContent = "OPEN";
    }

    function openDropdown() {
        feedbackWrap.style.display = "flex";
        ddContentWrap.classList.remove('hide-dd-content-block');
        ddTrigger.classList.remove('no-bottom-border');
        ddContent.classList.remove('dd-content-close');
        ddText.textContent = "CLOSE";
    }

    function checkSelectedVal() {
        let selectedValue = isVerified.options[isVerified.selectedIndex];

        if(selectedValue.textContent === "Yes") {
            verified();
        } else if(selectedValue.textContent === "Yes" && !Ada) {
            customMsg.textContent = "The customer was verified manually!";
        } else if(selectedValue.textContent === "No") {
            notVerified();
        } else {
            ddWrap.classList.remove('verified');
            ddWrap.classList.remove('not-verified');
            ddTrigger.classList.remove('trigger-verified');
            ddWrap.classList.remove('not-verified');
            ddTrigger.classList.remove('trigger-not-verified');
            ddBadge.classList.remove('dd-badge-verified');
            ddBadge.classList.remove('dd-badge-not-verified');
            customMsg.textContent = "Please verify the customer manually or the conversation is too long to pull Ada details!";
        }
    }

    checkSelectedVal();//will check selected value on page load

    //listening for a change on the customer verified select
    isVerified.onchange = function() { checkSelectedVal()};

    function verified() {
        ddWrap.classList.remove('not-verified');
        ddBadge.classList.remove('dd-badge-not-verified');
        ddTrigger.classList.remove('trigger-not-verified');
        ddWrap.classList.add('verified');
        ddTrigger.classList.add('trigger-verified');
        ddBadge.classList.add('dd-badge-verified');
        ddBadge.textContent = "Verified";
        customMsg.textContent = !Ada ? "The customer was verified manually or the conversation is too long to pull Ada details!" : " ";
    }

    function notVerified() {
        ddWrap.classList.remove('not-verified');
        ddTrigger.classList.remove('trigger-verified');
        ddBadge.classList.remove('dd-badge-verified');
        ddWrap.classList.add('not-verified');
        ddTrigger.classList.add('trigger-not-verified');
        ddBadge.textContent = "Not Verified";
        ddBadge.classList.add('dd-badge-not-verified');

        customMsg.textContent = "The customer is not verified!";
    }

    customFields.prepend(ddWrap); // insert dropdown to page
}

loadDetails();