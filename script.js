function verifyId() {
  let playerId = document.getElementById("playerId").value;
  if(playerId.trim() === "") {
    alert("Please enter a valid Player ID");
  } else {
    alert("Player ID Verified ✅");
  }
}
