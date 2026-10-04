/* ========================================
   MOBILE MENU
======================================== */

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });


  links.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (!clickedLink) {
      return;
    }

    links.classList.remove("open");

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );
  });
}


/* ========================================
   SMOOTH NAVIGATION
======================================== */

const navAnchors = Array.from(
  document.querySelectorAll(".nav-links a")
);


navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId =
      anchor.getAttribute("href");

    if (
      !targetId ||
      !targetId.startsWith("#")
    ) {
      return;
    }

    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    /*
      Scroll directly to the beginning
      of the selected section.

      No navigation-height subtraction
      is used, so there is no extra gap.
    */

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    history.pushState(
      null,
      "",
      targetId
    );
  });
});


/* ========================================
   ACTIVE NAVIGATION ON SCROLL
======================================== */

const sections = navAnchors
  .map((anchor) => {
    const id =
      anchor.getAttribute("href");

    if (
      !id ||
      !id.startsWith("#")
    ) {
      return null;
    }

    return document.querySelector(id);
  })
  .filter(Boolean);


if ("IntersectionObserver" in window) {
  const navObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          navAnchors.forEach((anchor) => {

            const isActive =
              anchor.getAttribute("href") ===
              `#${entry.target.id}`;

            anchor.classList.toggle(
              "active",
              isActive
            );

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );


  sections.forEach((section) => {
    navObserver.observe(section);
  });
}


/* ========================================
   REVEAL ON SCROLL
======================================== */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("in");

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  /*
    Fallback for older browsers.
  */

  revealElements.forEach((element) => {
    element.classList.add("in");
  });

}


/* ========================================
   CONTACT FORM
   FRONT-END VALIDATION ONLY
======================================== */

const form =
  document.getElementById("contact-form");


if (form) {

  const status =
    form.querySelector(".form-status");


  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      let validForm = true;

      const fields =
        form.querySelectorAll(
          "input[required], textarea[required]"
        );


      fields.forEach((field) => {

        const value =
          field.value.trim();

        let isValid =
          value.length > 0;


        if (
          field.type === "email" &&
          value.length > 0
        ) {

          isValid =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              .test(value);

        }


        field.classList.toggle(
          "invalid",
          !isValid
        );


        if (!isValid) {
          validForm = false;
        }

      });


      /* -------------------------------
         INVALID FORM
      ------------------------------- */

      if (!validForm) {

        status.classList.add(
          "error"
        );

        status.textContent =
          "Please fill in all fields with a valid email address.";

        return;
      }


      /* -------------------------------
         VALID FORM
         FRONT-END ONLY
      ------------------------------- */

      status.classList.remove(
        "error"
      );

      status.textContent =
        "Thank you! Your message is ready to be sent.";

      form.reset();


      fields.forEach((field) => {
        field.classList.remove(
          "invalid"
        );
      });

    }
  );


  /* -------------------------------
     CLEAR ERROR WHEN TYPING
  ------------------------------- */

  form.addEventListener(
    "input",
    (event) => {

      const field =
        event.target;


      if (
        !field.matches(
          "input, textarea"
        )
      ) {
        return;
      }


      field.classList.remove(
        "invalid"
      );


      if (status) {

        status.textContent = "";

        status.classList.remove(
          "error"
        );

      }

    }
  );

}


/* ========================================
   CLOSE MOBILE MENU WITH ESCAPE
======================================== */

if (toggle && links) {

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      links.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.focus();

    }
  );

}
