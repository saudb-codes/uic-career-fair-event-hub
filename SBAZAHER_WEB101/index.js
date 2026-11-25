
/***
 * PART 5: DARK MODE
 ***/

const themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {

    const isDark = document.body.classList.toggle("dark-mode");

    themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";

    themeButton.setAttribute("aria-pressed", String(isDark));
};

themeButton.addEventListener("click", toggleDarkMode);


/***
 * PART 6: RSVP FORM
 ***/

const form = document.getElementById("myform");

const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phonenumber");

const rsvpList = document.getElementById("rsvp-list");
const rsvpCount = document.getElementById("rsvp-count");

const formMessage = document.getElementById("form-message");

const inputs = [nameInput, emailInput, phoneInput];


/***
 * PART 7: FORM VALIDATION
 ***/

// Remove red highlighting when the user types
inputs.forEach((input) => {

    input.addEventListener("input", () => {

        input.classList.remove("invalid-input");

        input.removeAttribute("aria-invalid");
    });
});


// Highlight invalid input
const highlightInvalid = (input) => {

    input.classList.add("invalid-input");

    input.setAttribute("aria-invalid", "true");
};


/***
 * PART 9: SUCCESS MODAL
 ***/

const modal = document.getElementById("success-modal");

const modalMessage = document.getElementById("modal-message");

const closeModalButton = document.getElementById("close-modal");

const modalImage = document.getElementById("modal-image");

let modalTimeout = null;

let previousFocus = null;


// Hide the modal
const hideModal = () => {

    if (modalTimeout !== null) {

        clearTimeout(modalTimeout);

        modalTimeout = null;
    }

    modal.hidden = true;

    if (previousFocus) {

        previousFocus.focus();
    }

    previousFocus = null;
};


// Show modal after valid RSVP
const showModal = (name, email) => {

    // Personalized message
    modalMessage.textContent =
        `Thank you, ${name}! Your RSVP has been confirmed. ` +
        `A registration for ${email} has been recorded.`;

    previousFocus = document.activeElement;

    // Restart image animation for every RSVP
    modalImage.style.animation = "none";

    void modalImage.offsetWidth;

    modalImage.style.animation = "";

    // Clear previous timer
    if (modalTimeout !== null) {

        clearTimeout(modalTimeout);
    }

    // Display modal
    modal.hidden = false;

    closeModalButton.focus();

    // Automatically close after 5 seconds
    modalTimeout = setTimeout(hideModal, 5000);
};


// BONUS: Close button
closeModalButton.addEventListener("click", hideModal);


// Allow Escape key to close modal
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && !modal.hidden) {

        hideModal();
    }
});


/***
 * PART 7 & 9: HANDLE RSVP SUBMISSIONS
 ***/

const addParticipant = (event) => {

    // Prevent page reload
    event.preventDefault();

    // Get form values
    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const phone = phoneInput.value.trim();

    let isValid = true;


    // Clear previous validation errors
    inputs.forEach((input) => {

        input.classList.remove("invalid-input");

        input.removeAttribute("aria-invalid");
    });


    // VALIDATE NAME
    if (name.length < 2) {

        highlightInvalid(nameInput);

        isValid = false;
    }


    // VALIDATE EMAIL
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        highlightInvalid(emailInput);

        isValid = false;
    }


    // VALIDATE PHONE
    const phoneDigits = phone.replace(/\D/g, "");

    const phonePattern = /^[0-9()+.\s-]+$/;

    if (
        phoneDigits.length !== 10 ||
        !phonePattern.test(phone)
    ) {

        highlightInvalid(phoneInput);

        isValid = false;
    }


    // INVALID RSVP
    if (!isValid) {

        formMessage.textContent =
            "Please correct the highlighted fields.";

        formMessage.className = "error";

        // No modal for invalid RSVP
        return;
    }


    // VALID RSVP

    // Create participant
    const newParticipant = document.createElement("li");

    newParticipant.textContent = name;

    rsvpList.appendChild(newParticipant);


    // Update RSVP counter
    const totalRSVPs = rsvpList.children.length;

    rsvpCount.textContent = totalRSVPs;


    // Success message
    formMessage.textContent =
        "Thank you! Your RSVP has been submitted successfully.";

    formMessage.className = "success";


    // PART 9: Show personalized modal
    showModal(name, email);


    // Reset form
    form.reset();
};


// Form event listener
form.addEventListener("submit", addParticipant);


/***
 * PART 8: SCROLL ANIMATIONS
 ***/

// Select sections to animate
const sections = document.querySelectorAll(
    ".hero, .content-section"
);


// Add animation class
sections.forEach((section) => {

    section.classList.add("reveal-section");
});


// Observe when sections enter or leave the screen
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Fade in and move upward
                    entry.target.classList.add("is-visible");

                } else {

                    // Hide when leaving screen
                    // Allows animation to repeat
                    entry.target.classList.remove("is-visible");
                }
            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -5% 0px"
        }
    );


    // Observe every section
    sections.forEach((section) => {

        revealObserver.observe(section);
    });

} else {

    // Fallback for older browsers
    sections.forEach((section) => {

        section.classList.add("is-visible");
    });
}


/***
 * PART 8 & 9 BONUS: REDUCE MOTION
 ***/

const motionButton = document.getElementById("motion-button");

const toggleMotion = () => {

    // Toggle reduced motion
    const motionReduced =
        document.body.classList.toggle("motion-reduced");


    // Update button text
    if (motionReduced) {

        motionButton.textContent = "Enable Motion";

    } else {

        motionButton.textContent = "Reduce Motion";
    }


    motionButton.setAttribute(
        "aria-pressed",
        String(motionReduced)
    );
};


// Register button
motionButton.addEventListener("click", toggleMotion);
