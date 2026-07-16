document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("residentForm");
  const button = document.getElementById("submitResidentApplication");
  const message = document.getElementById("formMessage");

  if (!form || !button || !message) return;

  function showMessage(text, type) {
    message.className = `form-message ${type}`;
    message.textContent = text;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      showMessage(
        "Please complete all required fields and agree to the community rules. / 请完整填写必填项目并勾选同意社区规则。",
        "error"
      );
      return;
    }

    button.disabled = true;
    button.textContent = "Submitting...";

    const application = Object.fromEntries(new FormData(form).entries());
    application.submittedAt = new Date().toISOString();

    try {
      const existing = JSON.parse(
        localStorage.getItem("echocityResidentApplications") || "[]"
      );
      existing.push(application);
      localStorage.setItem(
        "echocityResidentApplications",
        JSON.stringify(existing)
      );

      showMessage(
        "Application submitted successfully. / 申请已成功提交。",
        "success"
      );
      form.reset();
    } catch (error) {
      console.error(error);
      showMessage(
        "The application could not be saved in this browser. Please try again. / 当前浏览器无法保存申请，请重试。",
        "error"
      );
    } finally {
      button.disabled = false;
      button.textContent = "Submit Resident Application";
      message.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});
