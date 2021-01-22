let optionsForm = document.getElementById('options-form');
//let notificationPreference = document.querySelector('input[name="notifications"]');
let backBtn = document.getElementById('back-to-hs');
let formMsg = document.getElementById('form-message');
let toolTip = document.getElementById('tooltip');
let toolTipPop = document.getElementById('tooltip-pop');

//checks chrome storage and sets notification preference - set to on by default
chrome.storage.sync.get(['notifySetting'], function(storageObj) {
    if(storageObj.notifySetting === 'on') {
        document.querySelector('input[id="notification-on"]').checked = true;
    } else if (storageObj.notifySetting === 'off') {
        document.querySelector('input[id="notification-off"]').checked = true;
    } 
});

//on form submit, saves user preference to chrome storage
optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedVal = e.target[name="notifications"].value;

    if(selectedVal === 'on') {
        formMsg.textContent = "Always on notifications enabled. Refresh Helpscout to see changes.";
        chrome.storage.sync.set({'notifySetting': selectedVal}, function() {
          });
    } else {
        formMsg.textContent = "Dynamic notifications enabled. Refresh Helpscout to see changes.";
        chrome.storage.sync.set({'notifySwitch': true, 'notifySetting': selectedVal, 'newMsgCount': 0});
    }
});

backBtn.addEventListener('click', () => close() ); //closes options.html

toolTip.addEventListener('mouseover', () => {
    toolTipPop.style.display = "block";
});

toolTip.addEventListener('mouseout', () => {
    toolTipPop.style.display = "none";
});