import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const checkoutProcess = new CheckoutProcess(
    "so-cart",
    "form[name='checkout']",
  );

  checkoutProcess.init();

  // Calculate order total after zip code input loses focus
  const zipInput = document.querySelector("input[name='zip']");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      checkoutProcess.calculateOrderTotal();
    });
  }

  // Form submit event handler
  const form = document.forms["checkout"];
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Basic form validation: check all required fields are filled
      const requiredFields = form.querySelectorAll("[required]");
      let allFilled = true;
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          allFilled = false;
          field.classList.add("input-error");
        } else {
          field.classList.remove("input-error");
        }
      });

      if (!allFilled) {
        alert("Please fill in all required fields.");
        return;
      }

      // Call checkout method to submit order
      await checkoutProcess.checkout();

      // Optionally, show success message or redirect after successful checkout
      alert("Order submitted successfully!");
      // window.location.href = "/"; // redirect to home or confirmation page
    });
  }

  // Optional: set default test values for payment fields for easier testing
  const cardNumberInput = form.querySelector("input[name='cardNumber']");
  const expirationInput = form.querySelector("input[name='expiration']");
  const codeInput = form.querySelector("input[name='code']");
  if (cardNumberInput) cardNumberInput.value = "1234123412341234";
  if (expirationInput) expirationInput.value = "12/30";
  if (codeInput) codeInput.value = "123";
});
