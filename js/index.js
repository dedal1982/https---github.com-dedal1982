document.addEventListener("DOMContentLoaded", function () {
  // 1. Меняем имя контакта при наведении на телефон
  const contactsName = document.querySelector(".header__contacts-name");
  const phoneLinks = document.querySelectorAll(".header__contacts-phones li a");
  const initialText = contactsName?.textContent || ""; // Добавлена проверка на null

  phoneLinks.forEach((link) => {
    link.addEventListener("mouseover", (event) => {
      contactsName.textContent = event.target.dataset.name || initialText; // Используем dataset и fallback
    });
    link.addEventListener("mouseout", () => {
      contactsName.textContent = initialText;
    });
  });

  // 2. Подсветка адреса, реквизитов, банков
  const lists = document.querySelectorAll(".requisites-hover");
  lists.forEach((list) => {
    list.addEventListener("mouseover", () =>
      lists.forEach((l) => l.classList.add("active"))
    );
    list.addEventListener("mouseout", () =>
      lists.forEach((l) => l.classList.remove("active"))
    );
  });

  // 3. Открытие оверлея и отрисовка темплейта
  const overlay = document.getElementById("overlay");
  const overlayClose = document.querySelector(".overlay-close");
  const overlayInner = document.querySelector(".overlay-inner");
  const body = document.body;

  if (overlay && overlayClose && overlayInner) {
    // Убрана проверка на openOverlayBtns
    const openOverlayBtns = document.querySelectorAll("[id]"); // Выбираем все элементы с id

    openOverlayBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const templateClassName = btn.id;
        const template = document.querySelector(
          `template.${templateClassName}`
        );

        if (template?.tagName === "TEMPLATE") {
          // Добавлена проверка на null и tagName
          const templateContent = template.content.cloneNode(true);

          overlayInner.innerHTML = "";
          overlayInner.appendChild(templateContent);

          setTimeout(() => {
            overlayInner.scrollTo(0, 0);
          }, 0);

          body.classList.add("lock");
          overlay.classList.add("active");
        } else {
          console.warn(
            `Template with class "${templateClassName}" not found or is not a <template> element.`
          );
        }
      });
    });

    overlayClose.addEventListener("click", () => {
      overlay.classList.remove("active");
      body.classList.remove("lock");
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.classList.remove("active");
        body.classList.remove("lock");
      }
    });
  } else {
    console.error(
      "Необходимые элементы не найдены (overlay, overlayClose, overlayInner)."
    );
  }
});
