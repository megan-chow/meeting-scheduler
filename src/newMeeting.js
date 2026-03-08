// document.addEventListener("DOMContentLoaded", function () {
//   const newMeetingOverlay = document.getElementById("new-meeting-overlay");
//   const newMeetingPopup = document.getElementById("new-meeting-pop-up");
//   const closeMeetingPopup = document.getElementById("close-button");

//   function newMeetingPopUp() {
//     let popup = document.getElementById("new-meeting-container");
//     popup.classList.toggle("show");
//   }



//   popupOverlay.addEventListener("click", function (event) {
//     if (event.target === popupOverlay) {
//       closePopupFunc();
//     }
//   });

//   togglePopUp();
// });

const createMeetingButton = document.getElementById("create-meeting-button");

function togglePopUp() {
  let newMeetingOverlay = document.getElementById("new-meeting-overlay");
  console.log("toggling");
  newMeetingOverlay.style.display = (newMeetingOverlay.style.display === "block") ? "none" : "block";
}

createMeetingButton.addEventListener("click", togglePopUp);