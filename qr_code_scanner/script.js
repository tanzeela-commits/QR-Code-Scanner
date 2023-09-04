const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInp = form.querySelector("input"),
  infoText = form.querySelector("p"),
  copyBtn = wrapper.querySelector(".copy-text"),
  closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file) {
  infoText.innerText = "scanning qr code....";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      infoText.innerText = result
        ? "Upload qr code to scan"
        : "count scan qr code;";
      result = result[0].symbol[0].data;
      console.log(result);
      if (!result) return;
      wrapper.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    });
}
fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
