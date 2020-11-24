const form = document.getElementById("form");
form.onsubmit = (event) => {
  const resObj = {};
  event.preventDefault();
  const FName = document.getElementById("FName");
  if (FName.value) resObj.FName = FName.value;
  const LName = document.getElementById("LName");
  if (LName.value) resObj.LName = LName.value;
  const Email = document.getElementById("Email");
  if (Email.value) resObj.Email = Email.value;
  const Phone = document.getElementById("Phone");
  if (Phone.value) resObj.Phone = Phone.value;

  const sexInputs = document.getElementsByName("Sex");
  const sex = Object.values(sexInputs).find(item => {
    if (item.checked) {
      return item
    }
  });
  if (sex) resObj.Sex = sex.value;

  const skillsInputs = document.getElementsByName("Skills");
  const skills = Object.values(skillsInputs).reduce((acc, item) => {
    if (item.checked) acc = [...acc, item.value];
    return acc;
  }, [])
  if (skills.length) resObj.Skills = skills;

  const select = document.getElementById("select");
  const department = [...select.options].reduce((acc, item) => {
    if (item.selected) acc = [...acc, item.value];
    return acc;
  }, []);
  if (department.length) resObj.Department = department;

  console.log(resObj);

  const getUrl = window.location.href;
  const url = new URL(getUrl);

  for (key in resObj) {
    if (Array.isArray(resObj)) {
      url.searchParams.set(key, resObj[key].join(","));
    } else if (resObj[key]) {
      url.searchParams.set(key, resObj[key]);
    }
  }

  const resUrl = decodeURIComponent(url.href).split(",").join("|");
  console.log(resUrl);
  //window.location = resUrl;
}