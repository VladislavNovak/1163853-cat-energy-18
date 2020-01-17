function executeMain() {
  function revealMenu() {
    var logotypeButton = document.querySelector(".logotype__button");
    var navigation = document.querySelector(".navigation");

    logotypeButton.addEventListener("click", function(e) {
      e.preventDefault();
      // (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
      if (navigation.classList.contains("navigation--opened")) {
        navigation.classList.remove("navigation--opened");
        navigation.classList.add("navigation--closed");
        this.classList.add("is-active");
      } else {
        navigation.classList.add("navigation--opened");
        navigation.classList.remove("navigation--closed");
        this.classList.remove("is-active");
      }
    });
  }

  //*****************************

  function imageComparison() {
    const sliderWrap = document.querySelector(".slider__wrapper");
    const imgBefore = document.querySelector(".slider__picture--before");
    const imgAfter = document.querySelector(".slider__picture--after");
    const range = document.querySelector("#slider");
    const buttonBefore = document.querySelector(".slider__button--before");
    const buttonAfter = document.querySelector(".slider__button--after");
    const checkbox = document.querySelector(".slider__checkbox");

    function _setImageWidth(event) {
      if (document.body.clientWidth <= 1220) {
        imgBefore.style.width = 100 - event.currentTarget.value + "%";
        imgAfter.style.width = event.currentTarget.value + "%";
      } else {
        imgBefore.style.width = 100 + 9 - event.currentTarget.value + "%";
        imgAfter.style.width = event.currentTarget.value + "%";
      }
    }

    function setImageClassHidden(event) {
      if (event.currentTarget === buttonBefore || !event.currentTarget.checked) {
        imgAfter.classList.add("slider__picture--disabled");
        imgBefore.classList.remove("slider__picture--disabled");
        imgAfter.style.width = 0 + "%";
        imgBefore.style.width = 100 + "%";
        checkbox.checked = false;
      }
      if (event.currentTarget === buttonAfter || event.currentTarget.checked) {
        imgBefore.classList.add("slider__picture--disabled");
        imgAfter.classList.remove("slider__picture--disabled");
        imgBefore.style.width = 0 + "%";
        imgAfter.style.width = 100 + "%";
        checkbox.checked = true;
      }
    }

    range.addEventListener("input", _setImageWidth);
    range.addEventListener("change", _setImageWidth);
    checkbox.addEventListener("change", setImageClassHidden);
    buttonBefore.addEventListener("click", setImageClassHidden);
    buttonAfter.addEventListener("click", setImageClassHidden);
  }

  revealMenu();
  imageComparison();
}


// readyState показывает текущее состояние загрузки:
if(document.readyState === "loading") {
  // если документ загружается, ждём события
  document.addEventListener("DOMContentLoaded", executeMain);
} else {
  // DOM готов
  executeMain();
}
