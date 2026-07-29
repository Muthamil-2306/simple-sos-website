// Initialize EmailJS
emailjs.init("iuH96hXPUpHwRMHn4"); // ✅ Your Public Key

document.getElementById("sosBtn").addEventListener("click", () => {
  document.getElementById("status").innerText = "Fetching location...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendSOS, showError);
  } else {
    document.getElementById("status").innerText = "Geolocation not supported.";
  }
});

function sendSOS(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const message = `🚨 SOS Alert! Location: https://maps.google.com/?q=${latitude},${longitude}`;

  // Send email using EmailJS
  emailjs.send("service_8uqhym6", "template_6pi5a3t", {
    to_name: "Mom",
    to_email: "mom@gmail.com", // must match {{to_email}} in template
    message: message
  }).then(() => {
    document.getElementById("status").innerText = "✅ SOS alert sent successfully!";
    playSiren();
  }).catch((err) => {
    document.getElementById("status").innerText = "❌ Error sending alert.";
    console.error("EmailJS Error:", err);
  });
}

function showError(error) {
  document.getElementById("status").innerText = "Unable to get location.";
  console.error("Geolocation Error:", error);
}

/* Optional: Play siren sound when SOS is sent */
function playSiren() {
  const audio = new Audio("siren1.mp3"); // add siren.mp3 file in project folder
  audio.play();
}
