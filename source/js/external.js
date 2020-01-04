function imangeComparison() {
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

window.onload = imangeComparison;
