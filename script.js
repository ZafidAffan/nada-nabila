const scriptURL = "https://script.google.com/macros/s/AKfycbytQ0HCB8SEl8xJ-DBgPQREgW-HmSLfAi9PIkqQhJ49ihSpmKvXwYHvVw9Lv4UV4sxo/exec";
const TOTAL_QUESTIONS = 15;
let currentQuestion = 1;

document.addEventListener("DOMContentLoaded", () => {
  showQuestion(currentQuestion);
});

function showQuestion(n) {
  document.querySelectorAll(".question").forEach(q => q.style.display = "none");
  document.getElementById(`q${n}`).style.display = "block";
  document.getElementById("progress").innerText =
    `Pertanyaan ${n} dari ${TOTAL_QUESTIONS}`;
}

function saveAnswer(q, val) {
  localStorage.setItem(`q${q}`, val);
}

function nextQuestion() {
  if (!localStorage.getItem(`q${currentQuestion}`)) {
    alert("Jawab dulu ya 🙂");
    return;
  }
  currentQuestion++;
  showQuestion(currentQuestion);
}

function submitQuiz() {
  const data = {};
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    data[`q${i}`] = localStorage.getItem(`q${i}`) || "";
  }

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      localStorage.clear();
      window.location.href = "thanks.html";
    })
    .catch(() => alert("Gagal kirim 😢"));
}
