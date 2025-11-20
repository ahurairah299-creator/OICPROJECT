document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const question = document.getElementById("question");
    const successMessage = document.createElement("p");
    successMessage.id = "success-message";
    form.appendChild(successMessage);

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        validateForm();
    });

    function validateForm() {
        let isValid = true;

        
        successMessage.textContent = "";

        const nameValue = fullName.value.trim();
        const emailValue = email.value.trim();
        const questionValue = question.value.trim();

        
        if (nameValue === "") {
            setError(fullName, "Full name is required");
            isValid = false;
        } else {
            setSuccess(fullName);
        }

        
        if (emailValue === "") {
            setError(email, "Email is required");
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, "Enter a valid email");
            isValid = false;
        } else {
            setSuccess(email);
        }

        
        if (questionValue === "") {
            setError(question, "Your question is required");
            isValid = false;
        } else if (questionValue.length < 5) {
            setError(question, "Question must be at least 5 characters");
            isValid = false;
        } else {
            setSuccess(question);
        }

        
        if (isValid) {
            successMessage.textContent = "🎉 Signup successful!";
            form.reset();
            clearValidation(fullName, email, question);
        }
    }

    function setError(input, message) {
        const parent = input.parentElement;
        parent.classList.add("error");
        parent.classList.remove("success");

        
        let errorDisplay = parent.querySelector(".error-message");
        if (!errorDisplay) {
            errorDisplay = document.createElement("div");
            errorDisplay.className = "error-message";
            parent.appendChild(errorDisplay);
        }
        errorDisplay.textContent = message;
    }

    function setSuccess(input) {
        const parent = input.parentElement;
        parent.classList.add("success");
        parent.classList.remove("error");

        
        const errorDisplay = parent.querySelector(".error-message");
        if (errorDisplay) {
            errorDisplay.remove();
        }
    }

    function clearValidation(...inputs) {
        inputs.forEach(input => {
            const parent = input.parentElement;
            parent.classList.remove("success", "error");
            const errorDisplay = parent.querySelector(".error-message");
            if (errorDisplay) errorDisplay.remove();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});


