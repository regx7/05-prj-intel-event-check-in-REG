// Select DOM elements
const checkInForm = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCountElem = document.getElementById("waterCount");
const zeroCountElem = document.getElementById("zeroCount");
const powerCountElem = document.getElementById("powerCount");
const attendeeList = document.getElementById("attendeeList");

// Count variables
let totalCount = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;
const attendanceGoal = 50;

// --- LEVELUP: LOAD FROM LOCALSTORAGE ---
// This function runs right when the page loads
(function loadCounts() {
  // Check if a totalCount value is saved in storage
  if (localStorage.getItem("totalCount")) {
    // Get the saved values. localStorage saves as text,
    // so parseInt() turns them back into numbers.
    totalCount = parseInt(localStorage.getItem("totalCount"));
    waterCount = parseInt(localStorage.getItem("waterCount"));
    zeroCount = parseInt(localStorage.getItem("zeroCount"));
    powerCount = parseInt(localStorage.getItem("powerCount"));

    // We also must update the page to show the loaded values
    attendeeCount.textContent = totalCount;
    waterCountElem.textContent = waterCount;
    zeroCountElem.textContent = zeroCount;
    powerCountElem.textContent = powerCount;

    // And update the progress bar
    const progressPercent = (totalCount / attendanceGoal) * 100;
    progressBar.style.width = `${progressPercent}%`;
     // Load the saved list
    attendeeList.innerHTML = localStorage.getItem('attendeeListHtml');
  }
})(); // These () make the function run immediately

// Add submit event listener to the form
checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get attendee name and selected team
  const attendeeNameValue = attendeeName.value;
  const selectedTeam = teamSelect.value;

  // Validate input
  if (attendeeNameValue.trim() === "" || selectedTeam === "") {
    alert("Please enter your name and select a team.");
    return;
  }

  // --- FIX 1: Moved Team Logic UP ---
  // Team logic
  let teamNameText;
  if (selectedTeam === "water") {
    waterCount += 1;
    waterCountElem.textContent = waterCount;
    teamNameText = "Team Water Wise";
  } else if (selectedTeam === "zero") {
    zeroCount += 1;
    zeroCountElem.textContent = zeroCount;
    teamNameText = "Team Net Zero";
  } else if (selectedTeam === "power") {
    powerCount += 1;
    powerCountElem.textContent = powerCount;
    teamNameText = "Team Renewables";
  }

  // Update totals
  totalCount += 1;
  attendeeCount.textContent = totalCount;
  const progressPercent = (totalCount / attendanceGoal) * 100;
  progressBar.style.width = `${progressPercent}%`;


  // --- LEVELUP: CELEBRATION FEATURE ---
  if (totalCount === attendanceGoal) {
    // If we hit the goal, find the winning team
    let winningTeam = "Team Water Wise";
    let maxCount = waterCount;

    if (zeroCount > maxCount) {
      maxCount = zeroCount;
      winningTeam = "Team Net Zero";
    }

    if (powerCount > maxCount) {
      maxCount = powerCount;
      winningTeam = "Team Renewables";
    }

    // Show a celebration alert!
    // We use \n to create a line break in the alert.
    alert(
      `🎉 GOAL REACHED! 🎉\n\nCongratulations, ${winningTeam}, you had the highest turnout with ${maxCount} members!`
    );
  }

  // --- FIX 1: Moved Welcome Message DOWN ---
  // Show welcome message
  greeting.textContent = `Welcome, ${attendeeNameValue}! You've successfully joined ${teamNameText}.`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  // --- LEVELUP: ADD TO ATTENDEE LIST ---
  const newLi = document.createElement("li");
  newLi.textContent = `${attendeeNameValue} - ${teamNameText}`;
  attendeeList.appendChild(newLi);

  // Reset the form for the next attendee
  checkInForm.reset();

  // --- LEVELUP: SAVE TO LOCALSTORAGE ---
  // Save the new counts to the browser's storage
  localStorage.setItem("totalCount", totalCount);
  localStorage.setItem("waterCount", waterCount);
  localStorage.setItem("zeroCount", zeroCount);
  localStorage.setItem("powerCount", powerCount);
  localStorage.setItem('attendeeListHtml', attendeeList.innerHTML);
});
