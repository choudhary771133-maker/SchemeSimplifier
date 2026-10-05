const schemes = [
  {
    name: "Rajasthan Post-Matric Scholarship – Prototype",
    type: "Scholarship",
    states: ["Rajasthan"],
    education: ["undergraduate", "postgraduate"],
    minAge: 16,
    documents: ["Aadhaar/ID", "Previous marksheet", "Income/certificate documents as applicable"],
    deadline: "Check current official notification",
    steps: ["Review eligibility", "Prepare required documents", "Open the official portal", "Submit the application before the official deadline"],
    url: "https://sje.rajasthan.gov.in/"
  },
  {
    name: "National Scholarship Opportunities – Prototype",
    type: "Scholarship",
    states: ["Rajasthan", "Other"],
    education: ["12th", "undergraduate", "postgraduate"],
    minAge: 16,
    documents: ["Aadhaar/ID", "Educational records", "Bank details", "Other documents as required by the specific scheme"],
    deadline: "Check current official notification",
    steps: ["Search the relevant scholarship", "Check eligibility", "Prepare documents", "Apply through the official portal"],
    url: "https://scholarships.gov.in/"
  },
  {
    name: "Student Opportunity Guide – Prototype",
    type: "Educational Opportunity",
    states: ["Rajasthan", "Other"],
    education: ["12th", "undergraduate", "postgraduate"],
    minAge: 16,
    documents: ["Basic identity and education details"],
    deadline: "Varies by opportunity",
    steps: ["Read the opportunity details", "Check requirements", "Follow the official application instructions"],
    url: "https://www.education.gov.in/"
  }
];

document.getElementById("profileForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = Number(document.getElementById("age").value);
  const education = document.getElementById("education").value;
  const state = document.getElementById("state").value;

  const matches = schemes.filter(s =>
    age >= s.minAge &&
    s.education.includes(education) &&
    s.states.includes(state)
  );

  const list = document.getElementById("schemeList");
  list.innerHTML = "";

  if (!matches.length) {
    list.innerHTML = '<div class="card"><p>No sample opportunity matched these details. Try another profile.</p></div>';
  } else {
    matches.forEach(s => {
      const card = document.createElement("article");
      card.className = "scheme";
      card.innerHTML = `
        <span class="badge">${s.type}</span>
        <h3>${s.name}</h3>
        <p><b>Possible eligibility:</b> Based on the details entered, this sample opportunity matches the prototype rules.</p>
        <p><b>Documents:</b></p>
        <ul>${s.documents.map(d => `<li>${d}</li>`).join("")}</ul>
        <p><b>Deadline:</b> ${s.deadline}</p>
        <p><b>Application steps:</b></p>
        <ol>${s.steps.map(x => `<li>${x}</li>`).join("")}</ol>
        <a class="apply" href="${s.url}" target="_blank" rel="noopener">Open Official Source ↗</a>
      `;
      list.appendChild(card);
    });
  }

  document.getElementById("resultCount").textContent = `${matches.length} match${matches.length === 1 ? "" : "es"}`;
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
});
