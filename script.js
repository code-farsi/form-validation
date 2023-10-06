const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkRequired = (input) => {
  let isRequired = false;

  if (input.value === "") {
    showError(input, `${getFieldName(input)}  اجباری است`);
    isRequired = true;
  } else {
    showSuccess(input);
  }

  return isRequired;
};

const checkLength = (input, min, max) => {
  if (!checkRequired(input)) {
    if (input.value.length < min)
      showError(
        input,
        `${getFieldName(input)} باید دست کم ${min} کاراکتر داشته باشد`
      );
    else if (input.value.length > max)
      showError(
        input,
        `${getFieldName(input)} نباید بیشتر از ${max} کاراکتر داشته باشد`
      );
    else showSuccess(input);
  }
};

const checkEmail = (input) => {
  if (!checkRequired(input)) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, `${getFieldName(input)} معتبر نیست`);
    }
  }
};

const checkPasswordsMath = (input1, input2) => {
  if (!checkRequired(input2)) {
    if (input1.value !== input2.value) {
      showError(input2, "گذرواژه ها با هم همخوانی ندارند");
    }
  }
};

const getFieldName = (input) => input.dataset.name;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkLength(username, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 25);
  checkPasswordsMath(password, password2);
});
