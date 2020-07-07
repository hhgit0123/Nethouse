function send() {
  let form,
    formData,
    name,
    email,
    phone,
    nameValidation,
    emailValidation,
    phoneValidation;
  form = document.querySelector(".form");
  formData = new FormData(form);
  name = formData.get("name");
  email = formData.get("email");
  phone = formData.get("phone");
  nameValidation = new RegExp("([А-Яа-я]+)\\s+([А-Яа-я]+)\\s+([А-Яа-я]+)");
  emailValidation = new RegExp("[a-zA-Z0-9]+.[a-zA-Z0-9]+@gmail.com");
  phoneValidation = new RegExp("([+7|7|8|0]+[0-9]{10})$");
  if (!nameValidation.test(name)) {
    form
      .querySelector("input[name=name]")
      .setCustomValidity("Неправильное ФИО");
    form.querySelector("input[name=name]").reportValidity();
    return;
  }
  if (!emailValidation.test(email)) {
    form
      .querySelector("input[name=email]")
      .setCustomValidity("Неправильная почта.");
    form.querySelector("input[name=email]").reportValidity();
    return;
  }
  if (!phoneValidation.test(phone)) {
    form
      .querySelector("input[name=phone]")
      .setCustomValidity("Неправильный номер");
    form.querySelector("input[name=phone]").reportValidity();
    return;
  }
  //я бы предпочел через axios, но если без либ, то как-то так
  fetch("url", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    })
    .then((res) => {
      if (res.headers["content-type"] !== "application/json") {
        let error = new Error("Некорректный ответ от сервера");
        error.response = res;
        throw error;
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => console.log("+", data))
    .catch((e) => {
      console.log("Error: " + e.message);
      console.log(e.response);
    });
  alert("Отправленно");
}
