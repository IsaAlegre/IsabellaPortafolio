import { CONTACT_EMAIL } from "./config.js";

const MESSAGES = {
  success: "¡Mensaje enviado! Te respondo a la brevedad.",
  failure: "No pude enviar el mensaje desde acá. ",
  gmailLink: "Enviarlo desde Gmail",
};

function buildGmailUrl({ name, email, subject, message }) {
  const params = {
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: subject || `Contacto desde el portfolio: ${name}`,
    body: `${message}\n\n${name} (${email})`,
  };

  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `https://mail.google.com/mail/?${query}`;
}

export function initContactForm(form, status) {
  const submitButton = form.querySelector("[type=submit]");

  const showStatus = (state, ...content) => {
    status.dataset.state = state;
    status.replaceChildren(...content);
  };

  const showGmailFallback = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = MESSAGES.gmailLink;
    showStatus("error", MESSAGES.failure, link);
  };

  const send = async (data) => {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });

    if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    submitButton.disabled = true;
    showStatus("");

    try {
      await send(data);
      form.reset();
      showStatus("success", MESSAGES.success);
    } catch {
      showGmailFallback(buildGmailUrl(Object.fromEntries(data)));
    } finally {
      submitButton.disabled = false;
    }
  });
}
