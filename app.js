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

const saveBookingInfo = () => {
  const customerName = customerNameTag.value,
    serviceName = serviceNameTag.value,
    bookDate = bookDateTag.value,
    bookDateTime = bookDateTimeTag.value;

  // condition for inputTags != empty strings
  if (
    customerName === "" ||
    serviceName === "" ||
    bookDate === "" ||
    bookDateTime === ""
  ) {
    return alert("Input Fields Required...");
  }

  // assign to created Object{} and push them to created Array[]
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
  const bookedCustomerArray = JSON.parse(bookedInfoFromLocalStorage);

  bookInfoContainerTag.innerHTML = ""; // to make sure no duplicate Books.
  createBookingCard(bookedCustomerArray, clearPreviousInfo); // array as a parameter
};

btnSubmitTag.addEventListener("click", saveBookingInfo);

// reload on clear & click => submitBtn on clear
const clearPreviousInfo = () => {
  for (let i = 0; i < inputTags.length; i++) {
    inputTags[i].value = "";
  }
};

const createBookingCard = (bookingInfoArray, callback) => {
  for (let i = 0; i < bookingInfoArray.length; i++) {
    const cardTag = document.createElement("div");
    cardTag.classList.add("card", "p-3", "m-2");

    const bookTag = document.createElement("div");
    bookTag.classList.add("text-center", "bookID");
    const idForBooking = bookingInfoArray[i].id;
    bookTag.id = idForBooking;
    bookTag.innerHTML = `Book ID - ${idForBooking}`;

    const showNameTag = document.createElement("div");
    showNameTag.append(`Name - ${bookingInfoArray[i].name}`);

    const showServiceTypeTag = document.createElement("div");
    showServiceTypeTag.append(
      `Service Type - ${bookingInfoArray[i].serviceType}`
    );

    const date = bookingInfoArray[i].date;
    const dateTime = bookingInfoArray[i].dateTime;

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

    editBtnTag.addEventListener("click", () => {
      isAllowedToEditOrCancel(bookedDate, editAndCancelBookContainerTag);
    });

    cancelBtnTag.addEventListener("click", () => {
      isAllowedToEditOrCancel(bookedDate, cardTag);
    });
  }
  callback();
};

const isAllowedToEditOrCancel = (date, param) => {
  const currentDate = new Date();
  const newCurrentDateTime = currentDate.setHours(currentDate.getHours() + 24);
  const bookingDate = date.getTime();

  if (bookingDate > newCurrentDateTime) {
    if (param.classList[0] === "card") {
      const answer = prompt(
        "Enter Yes to cancel your Booking or No to undo Operation."
      ).toLowerCase();

      if (answer === null) {
        return answer;
      } else if (answer === "yes") {
        // const key = `Booking ${counter}`;
        // localStorage.removeItem(key);
        param.remove();
        return alert("You've successfully canceled the Booking.");
      } else {
        return console.log(answer);
      }
    } else {
      return alert("You can edit the booking");
    }
    // end of condition
  } else if (bookingDate < newCurrentDateTime) {
    const editBtnTag = param.firstChild;
    const cancelBtnTag = param.lastChild;

    if (param.classList[0] === "btnContainer") {
      editBtnTag.disabled = true;
      cancelBtnTag.disabled = true;

      return alert("Sorry,You cannot be able to Edit the Booking.");
    } else {
      alert(
        "Due to your Booked-Time is closer than tommorow date/time, you cannot be able to Edit or Cancel the Booking."
      );
    }
  }
};

window.addEventListener("load", () => {
  clearPreviousInfo();
  let bookedArray = [];
  if (localStorage.length >= 0) {
    for (let i = 1; i <= localStorage.length; i++) {
      const key = `Booking ${i}`;
      const valueFromLocalStorage = localStorage.getItem(key);
      bookedArray = JSON.parse(valueFromLocalStorage);
    }
    bookInfoContainerTag.innerHTML = ""; // to make sure no duplicate Books.
    createBookingCard(bookedArray, clearPreviousInfo);
  }
});
