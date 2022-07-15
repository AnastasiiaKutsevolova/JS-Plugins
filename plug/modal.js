function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }
  const wrap = document.createElement("div");
  wrap.classList.add("modal-footer");

  return wrap;
}

function _createModal(options) {
  const DEFAULT_WIDTH = "600px";
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width}">
          <div class="modal-header">
            <span class="modal-title">${options.title || "Window"}</span>
            ${
              options.closable
                ? `<span class="modal-close" data-close="true">&times;</span> `
                : ""
            }
          </div>
          <div class="modal-body" data-content>
            ${options.content || ""}
          </div>
        </div>
    </div>`
  );
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let desrtoyed = false;

  const modal = {
    open() {
      if (desrtoyed) {
        return console.log("Modal is destroyed");
      }
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hiden");
      setTimeout(() => {
        $modal.classList.remove("hiden");
        closing = false;
      }, ANIMATION_SPEED);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modal, {
    desrtoy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      desrtoyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};
