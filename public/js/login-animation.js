(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let loginWorld;
  let appWorld;
  let transition;
  let transitionPlaying = false;
  let lastAppVisible = false;
  let mouseX = 0;
  let mouseY = 0;

  function createAtom(parent, id) {
    const atom = document.createElement("div");
    atom.className = "quantum-atom";
    atom.id = id;

    const nucleus = document.createElement("div");
    nucleus.className = "quantum-nucleus";

    const types = [
      "quantum-proton",
      "quantum-neutron",
      "quantum-proton",
      "quantum-neutron"
    ];

    const positions = [
      [10, 12],
      [39, 14],
      [14, 40],
      [40, 39]
    ];

    types.forEach((type, i) => {
      const particle = document.createElement("div");
      particle.className =
        "quantum-nucleus-particle " + type;
      particle.style.left = positions[i][0] + "px";
      particle.style.top = positions[i][1] + "px";
      nucleus.appendChild(particle);
    });

    atom.appendChild(nucleus);

    for (let i = 0; i < 3; i++) {
      const orbit = document.createElement("div");
      orbit.className =
        "quantum-orbit orbit-" + (i + 1);

      const electron = document.createElement("div");
      electron.className = "quantum-electron";

      orbit.appendChild(electron);
      atom.appendChild(orbit);
    }

    parent.appendChild(atom);
    return atom;
  }

  function createParticles(parent, count) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "quantum-particle";

      if (Math.random() > 0.85) {
        particle.classList.add("large");
      }

      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDuration =
        8 + Math.random() * 12 + "s";
      particle.style.animationDelay =
        -Math.random() * 20 + "s";

      fragment.appendChild(particle);
    }

    parent.appendChild(fragment);
  }

  function createWorld(parent, id, atomId, count) {
    let world = document.getElementById(id);

    if (!world) {
      world = document.createElement("div");
      world.id = id;
      parent.insertBefore(world, parent.firstChild);
    }

    world.classList.add("quantum-scene");
    world.setAttribute("aria-hidden", "true");

    if (!world.dataset.ready) {
      const atmosphere = document.createElement("div");
      atmosphere.className = "quantum-atmosphere";
      world.appendChild(atmosphere);

      createParticles(world, count);
      createAtom(world, atomId);

      const label = document.createElement("div");
      label.className = "quantum-label";
      label.textContent = "QUANTUM WORLD";
      world.appendChild(label);

      world.dataset.ready = "true";
    }

    return world;
  }

  function animateWorld(time) {
    if (!reduceMotion) {
      const seconds = time / 1000;

      document.querySelectorAll(
        ".quantum-scene .quantum-orbit"
      ).forEach((orbit) => {
        const electron =
          orbit.querySelector(".quantum-electron");

        if (!electron) return;

        const index = Array.from(
          orbit.parentElement.querySelectorAll(
            ".quantum-orbit"
          )
        ).indexOf(orbit);

        const speed = [1.4, -1.1, 0.85][index];
        const angle = seconds * speed + index * 2.1;

        const x =
          Math.cos(angle) * orbit.clientWidth / 2;
        const y =
          Math.sin(angle) * orbit.clientHeight / 2;

        electron.style.left = "50%";
        electron.style.top = "50%";
        electron.style.transform =
          `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });

      const loginAtom =
        document.getElementById("quantifyAtom");

      if (loginAtom && !transitionPlaying) {
        loginAtom.style.transform =
          `translate(-50%, -50%)
           rotateX(${-mouseY * 12}deg)
           rotateY(${mouseX * 18}deg)`;
      }

      const dashboardAtom =
        document.getElementById("dashboardAtom");

      if (dashboardAtom) {
        dashboardAtom.style.transform =
          `translate(-50%, -50%)
           rotateX(${Math.sin(seconds * 0.35) * 12}deg)
           rotateY(${seconds * 9}deg)`;
      }
    }

    requestAnimationFrame(animateWorld);
  }

  function createTransition() {
    transition = document.createElement("div");
    transition.id = "quantumTransition";
    transition.setAttribute("aria-hidden", "true");

    transition.innerHTML =
      '<div class="quantum-energy-ring"></div>';

    document.body.appendChild(transition);
  }

  function playTransition() {
    if (reduceMotion || !transition) return;

    transitionPlaying = true;
    transition.classList.add("active");

    const ring = transition.querySelector(
      ".quantum-energy-ring"
    );

    ring.animate(
      [
        { transform: "translate(-50%, -50%) scale(0.1)",
          opacity: 1 },
        { transform: "translate(-50%, -50%) scale(12)",
          opacity: 0 }
      ],
      {
        duration: 1100,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      transition.classList.remove("active");
      transitionPlaying = false;
    }, 1100);
  }

  function setupAppObserver() {
    const app = document.getElementById("app");
    if (!app) return;

    lastAppVisible =
      getComputedStyle(app).display !== "none";

    const observer = new MutationObserver(() => {
      const visible =
        getComputedStyle(app).display !== "none";

      if (visible && !lastAppVisible) {
        playTransition();
        appWorld?.classList.add("visible");
      }

      lastAppVisible = visible;
    });

    observer.observe(app, {
      attributes: true,
      attributeFilter: ["class", "style"]
    });
  }

  function setupCardTilt() {
    if (reduceMotion) return;

    document.addEventListener("mousemove", (event) => {
      const card = event.target.closest(
        ".card, .stat, .panel"
      );

      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x =
        (event.clientX - rect.left) / rect.width - 0.5;
      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(900px)
         rotateX(${-y * 4}deg)
         rotateY(${x * 4}deg)`;
    });

    document.addEventListener("mouseout", (event) => {
      const card = event.target.closest(
        ".card, .stat, .panel"
      );

      if (
        card &&
        !card.contains(event.relatedTarget)
      ) {
        card.style.transform = "";
      }
    });
  }

  function start() {
    const login = document.getElementById("login");
    const app = document.getElementById("app");

    if (!login || !app) {
      console.error(
        "Quantum animation: login or app section missing"
      );
      return;
    }

    loginWorld = createWorld(
      login,
      "quantumLoginWorld",
      "quantifyAtom",
      75
    );

    appWorld = createWorld(
      app,
      "quantumAppWorld",
      "dashboardAtom",
      45
    );

    appWorld.classList.add("visible");

    createTransition();
    setupAppObserver();
    setupCardTilt();

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX =
          event.clientX / window.innerWidth - 0.5;
        mouseY =
          event.clientY / window.innerHeight - 0.5;
      },
      { passive: true }
    );

    requestAnimationFrame(animateWorld);

    console.log(
      "Quantum animation initialized: login and dashboard worlds ready"
    );
  }

  window.QuantifyWorld = {
    start,
    playTransition
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start,
      { once: true }
    );
  } else {
    start();
  }
})();
