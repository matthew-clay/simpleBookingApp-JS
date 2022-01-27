/* Booking App JS */
const inputTags = document.querySelectorAll(".customerInput"),
  customerNameTag = document.querySelector("#customerName"),
  serviceNameTag = document.querySelector("#serviceName"),
  bookDateTag = document.querySelector("#bookDate"),
  bookDateTimeTag = document.querySelector("#bookDateTime"),
  btnSubmitTag = document.querySelector("#btnSubmit"),
  bookInfoContainerTag = document.querySelector(".bookInfoContainer");

const customerBookInfo = [];
let bookInfoObj = {};
let counter = 1;

const saveCustomerBook = () => {
  const customerName = customerNameTag.value,
    serviceName = serviceNameTag.value,
    bookDate = bookDateTag.value,
    bookDateTime = bookDateTimeTag.value;

  if (
    customerName === "" ||
    serviceName === "" ||
    bookDate === "" ||
    bookDateTime === ""
  ) {
    alert("Input Fields Required...");
    return;
  }

  bookInfoObj = {
    name: customerName,
    serviceType: serviceName,
    date: bookDate,
    dateTime: bookDateTime,
    id: counter,
  };
  customerBookInfo.push(bookInfoObj);
  const key = `Booking ${counter}`;
  const value = JSON.stringify(customerBookInfo);
  localStorage.setItem(key, value);
  counter += 1;

  const bookedInfoFromLocalStorage = localStorage.getItem(key);
  const bookedCustomerObj = JSON.parse(bookedInfoFromLocalStorage);

  bookInfoContainerTag.innerHTML = "";
  createShowBookedInfo(bookedCustomerObj);
};

const clearPreviousInfo = () => {
  for (let i = 0; i < inputTags.length; i++) {
    inputTags[i].value = "";
  }
};

const createShowBookedInfo = (bookedCustomerObj) => {
  for (let i = 0; i < bookedCustomerObj.length; i++) {
    const cardTag = document.createElement("div");
    cardTag.classList.add("card", "p-3", "m-2");

    const bookTag = document.createElement("div");
    bookTag.classList.add("text-center", "bookID");
    const idForBooking = bookedCustomerObj[i].id;
    bookTag.id = idForBooking;
    bookTag.innerHTML = `Book ID - ${idForBooking}`;

    const showNameTag = document.createElement("div");
    showNameTag.append(`Name - ${bookedCustomerObj[i].name}`);

    const showServiceTypeTag = document.createElement("div");
    showServiceTypeTag.append(
      `Service Type - ${bookedCustomerObj[i].serviceType}`
    );

    const date = bookedCustomerObj[i].date;
    const dateTime = bookedCustomerObj[i].dateTime;

    const showDateInfoTag = document.createElement("div");
    showDateInfoTag.append(`Book Date - ${date}`);

    const showTimeInfoTag = document.createElement("div");
    showTimeInfoTag.append(`Time - ${dateTime}`);

    const splitBookedTime = dateTime.split(":");
    const hours = parseInt(splitBookedTime[0]),
      minutes = parseInt(splitBookedTime[1]);

    const bookedDate = new Date(date);
    bookedDate.setHours(hours, minutes);

    const editAndCancelBookContainerTag = document.createElement("div");
    editAndCancelBookContainerTag.classList.add("btnContainer", "mt-4");
    const editBtnTag = document.createElement("button");
    editBtnTag.classList.add("btn", "btn-info", "btnEdit");
    editBtnTag.append("Edit Book");

    const cancelBtnTag = document.createElement("button");
    cancelBtnTag.classList.add("btn", "btn-danger", "btnCancel", "ms-2");
    cancelBtnTag.append("Cancel Book");

    editAndCancelBookContainerTag.append(editBtnTag, cancelBtnTag);
    cardTag.append(
      bookTag,
      showNameTag,
      showServiceTypeTag,
      showDateInfoTag,
      showTimeInfoTag,
      editAndCancelBookContainerTag
    );
    bookInfoContainerTag.append(cardTag);

    const btnEditTag = document.querySelector(".btnEdit");
    const btnCancelTag = document.querySelector(".btnCancel");

    btnEditTag.addEventListener("click", () => {
      isAllowedToEditOrCancel(bookedDate, editAndCancelBookContainerTag);
    });

    btnCancelTag.addEventListener("click", () => {
      isAllowedToEditOrCancel(bookedDate, editAndCancelBookContainerTag);
    });
  }
  clearPreviousInfo();
};

const isAllowedToEditOrCancel = (date, btnContainer) => {
  const currentDate = new Date();
  const newCurrentDateTime = currentDate.setHours(currentDate.getHours() + 24);

  if (date.getTime() > newCurrentDateTime) {
    const answer = prompt(
      "Type Yes or No to make sure for canceling the Booking"
    ).toLowerCase();
    if (answer === null) {
    } else if (answer === "yes") {
      alert("You've successfully canceled the Booking.");
    } else {
      console.log(answer);
    }
  } else if (date.getTime() < newCurrentDateTime) {
    btnContainer.firstChild.disabled = true;
    btnContainer.lastChild.disabled = true;
    return alert(
      "Due to your Booked-Time is closer than tommorow date/time, you cannot be able to Edit or Cancel the Booking."
    );
  } else return console.log(error);
};

btnSubmitTag.addEventListener("click", saveCustomerBook);

window.addEventListener("load", () => {
  clearPreviousInfo();
});
