document.addEventListener("DOMContentLoaded", function () {
  const newMeetingOverlay = getElementById("new-meeting-overlay");
  const newMeetingPopup = getElementById("new-meeting-pop-up");
  const closeMeetingPopup = document.getElementById("close-button");

  function newMeetingPopUp() {
    let popup = document.getElementById("new-meeting-container");
    popup.classList.toggle("show");
  }

  function openPopUp() {
    newMeetingOverlay.style.display = "block";
  }

  function closePopUp() {
    newMeetingOverlay.style.display = "none";
  }

  openPopup();
});
