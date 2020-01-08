function executeMain() {
  function revealMenu() {
    var logotypeButton = document.querySelector(".logotype__button");
    var navigation = document.querySelector(".navigation");

    logotypeButton.addEventListener("click", function() {
      if(navigation.classList.contains("navigation--opened") && logotypeButton.classList.contains("logotype__button--burger")) {
        navigation.classList.remove("navigation--opened");
        navigation.classList.add("navigation--closed");
        logotypeButton.classList.remove("logotype__button--burger");
        logotypeButton.classList.add("logotype__button--cross");
      } else {
        navigation.classList.add("navigation--opened");
        navigation.classList.remove("navigation--closed");
        logotypeButton.classList.add("logotype__button--burger");
        logotypeButton.classList.remove("logotype__button--cross");
      }
    });
  }

  //*****************************

  function imageComparison() {
    const sliderWrap = document.querySelector(".slider__wrapper");
    const imgBefore = sliderWrap.querySelector(".slider__picture--before");
    const imgAfter = sliderWrap.querySelector(".slider__picture--after");
    const range = sliderWrap.querySelector("#slider");
    const buttonBefore = sliderWrap.querySelector(".slider__button--before");
    const buttonAfter = sliderWrap.querySelector(".slider__button--after");
    const checkbox = sliderWrap.querySelector(".slider__checkbox");

    function _setImageWidth(event) {
      imgBefore.style.width = 100 - event.currentTarget.value + "%";
      imgAfter.style.width = event.currentTarget.value + "%";
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
