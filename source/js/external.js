function revealMenu() {
  var logotypeButton = document.querySelector(".logotype__button");
  var navigation = document.querySelector(".navigation");

  // если JS загрузился, то...
  // ...сворачиваем сектор .navigation
  navigation.classList.remove("navigation--revealed");
  navigation.classList.add("navigation--collapsed");

  // ...высвечиваем кнопку .logotype__button, потому что
  // класс .logotype__button--without-js скрывал кнопку, когда JS не загрузился
  logotypeButton.classList.remove("logotype__button--without-js");
  // ...и удаляем с кнопки .logotype__button значок крестика
  logotypeButton.classList.remove("logotype__button--cross");

  // открываем/закрываем .navigation, меняя одновременно значок креста на бургер
  logotypeButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (navigation.classList.contains("navigation--revealed")) {
      navigation.classList.remove("navigation--revealed");
      navigation.classList.add("navigation--collapsed");
      this.classList.remove("logotype__button--cross");
    } else {
      navigation.classList.add("navigation--revealed");
      navigation.classList.remove("navigation--collapsed");
      this.classList.add("logotype__button--cross");
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

  // если хотя бы этот элемент существует (один из перечисленных выше), то выполнить функцию:
  if(sliderWrap) {
    function _setImageWidth(event) {
      if (document.body.clientWidth <= 1220) {
        imgBefore.style.width = 100 - event.currentTarget.value + "%";
        imgAfter.style.width = event.currentTarget.value + "%";
      } else {
        imgBefore.style.width = 100 + 6 - event.currentTarget.value + "%";
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
}

function executeMain() {
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
