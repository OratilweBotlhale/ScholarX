const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
const steps = document.querySelectorAll(".form-step");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const submitBtn = document.querySelector(".submit-btn");

let currentStep = 0;

function updateFormSteps() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  circles.forEach((circle, index) => {
    circle.classList.toggle("active", index <= currentStep);
  });

  const progressWidth = (currentStep / (circles.length - 1)) * 100;
  progress.style.width = `${progressWidth}%`;

  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
  nextBtn.style.display = currentStep === circles.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = currentStep === circles.length - 1 ? "inline-block" : "none";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) currentStep++;
  updateFormSteps();
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) currentStep--;
  updateFormSteps();
});

document.querySelector("#bursaryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(" Your bursary application has been submitted successfully!");
});

updateFormSteps();
