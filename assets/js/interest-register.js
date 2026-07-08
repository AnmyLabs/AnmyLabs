import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { firebaseConfig, hasFirebaseConfig } from "./firebase-config.js";

const form = document.querySelector("#interest-register-form");
const message = document.querySelector("#register-message");
const submitButton = form?.querySelector("button[type='submit']");
const nameInput = form?.elements.namedItem("name");
const emailInput = form?.elements.namedItem("email");

const collectionName = "interest_register";
const emailPattern =
  /^[a-z0-9.!#$%&*+=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/;

let db;

function setMessage(text, type = "info") {
  if (!message) {
    return;
  }

  message.textContent = text;
  message.dataset.type = type;
}

function setSubmitting(isSubmitting) {
  if (!submitButton) {
    return;
  }

  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting
    ? "Joining..."
    : "Join the Interest List";
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function validateForm(name, email) {
  if (!name) {
    return "Please enter your full name.";
  }

  if (!email) {
    return "Please enter your email address.";
  }

  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
}

function getDatabase() {
  if (db) {
    return db;
  }

  if (!hasFirebaseConfig()) {
    throw new Error("Firebase is not configured for the interest register.");
  }

  db = getFirestore(initializeApp(firebaseConfig));
  return db;
}

async function registerInterest(name, email) {
  const database = getDatabase();
  const registrationRef = doc(database, collectionName, email);

  await setDoc(registrationRef, {
    name,
    email,
    createdAt: serverTimestamp(),
    invited: false,
    tester: false,
  });
}

function showRegistrationError(error) {
  if (error?.code === "permission-denied" || error?.code === "already-exists") {
    setMessage(
      "That email is already on the PayDay Interest Register. We'll notify you when beta access becomes available.",
      "error"
    );
    return;
  }

  setMessage(
    "We couldn't join the list just now. Please try again in a moment.",
    "error"
  );
}

if (
  form &&
  nameInput instanceof HTMLInputElement &&
  emailInput instanceof HTMLInputElement
) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = normalizeEmail(emailInput.value);
    const validationMessage = validateForm(name, email);

    if (validationMessage) {
      setMessage(validationMessage, "error");
      return;
    }

    setSubmitting(true);
    setMessage("", "info");

    try {
      await registerInterest(name, email);
      window.location.assign("./success/");
    } catch (error) {
      showRegistrationError(error);
    } finally {
      setSubmitting(false);
    }
  });
}
