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
