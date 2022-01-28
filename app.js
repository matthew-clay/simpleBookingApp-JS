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
let newBookedCustomerArray = [];

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
  newBookedCustomerArray = JSON.parse(bookedInfoFromLocalStorage);

  bookInfoContainerTag.innerHTML = ""; // to make sure no duplicate Books.
  createBookingCard(newBookedCustomerArray, clearInputs); // array as a parameter
};

btnSubmitTag.addEventListener("click", saveBookingInfo);

// reload on clear & click => submitBtn on clear
const clearInputs = () => {
  for (let i = 0; i < inputTags.length; i++) {
    inputTags[i].value = "";
  }
};

const createBookingCard = (bookingInfoArray, callback) => {
  // create cards
  bookingInfoArray.forEach((bookingInfo) => {
    const bookingCardTag = `
    <div class="card p-3 m-2" id="${bookingInfo.id}">
      <div class="text-center bookID">Book ID - ${bookingInfo.id}</div>
      <div>Name - ${bookingInfo.name}</div>
      <div>Service Type - ${bookingInfo.serviceType}</div>
      <div>Book Date - ${bookingInfo.date}</div>
      <div>Time - ${bookingInfo.dateTime}</div>
      <div class="btnContainer mt-4 d-flex">
        <button class="btn btn-info btnEdit">Edit Book</button>
        <button class="btn btn-danger btnCancel ms-2">Cancel Book</button>
      </div>
    </div>`;

    // date/Time
    const dateFromBookInfo = bookingInfo.date;
    const TimeFromBookInfo = bookingInfo.dateTime;
    const splitBookedTime = TimeFromBookInfo.split(":");
    const hours = parseInt(splitBookedTime[0]),
      minutes = parseInt(splitBookedTime[1]);

    const bookedDate = new Date(dateFromBookInfo);
    bookedDate.setHours(hours, minutes);

    bookInfoContainerTag.innerHTML += bookingCardTag;

    const cardTag = document.querySelectorAll(".card");
    const btnContainerTag = document.querySelectorAll(".btnContainer");
    const editBtnTag = document.querySelectorAll(".btnEdit");
    const cancelBtnTag = document.querySelectorAll(".btnCancel");

    clickBtnFunction(editBtnTag, bookedDate, btnContainerTag);
    clickBtnFunction(cancelBtnTag, bookedDate, cardTag);
  });
  // callback function -> to clear inputTag.values
  callback();
};

const clickBtnFunction = (btn, date, htmlTag) => {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      isAllowedToEditOrCancel(btn[i], date, htmlTag[i]);
    });
  }
};

const isAllowedToEditOrCancel = (btn, date, htmlTag) => {
  const currentDate = new Date();
  const newCurrentDateTime = currentDate.setHours(currentDate.getHours() + 24);
  const bookingDate = date.getTime();
  const cancelBtnTag = btn.classList.contains("btnCancel");
  const editBtnTag = btn.classList.contains("btnEdit");

  if (bookingDate > newCurrentDateTime) {
    if (cancelBtnTag) {
      const answer = prompt(
        "Enter Yes to cancel your Booking or No to undo Operation."
      );

      if (answer === null) {
        return console.log("answer is null");
      } // null condition

      const checkAns = answer.toLowerCase();

      // beginning condition of prompt yOrN
      if (checkAns === "yes") {
        const bookingId = htmlTag.id;
        const key = `Booking ${bookingId}`;
        htmlTag.remove();
        localStorage.removeItem(key);
        return alert("You've successfully canceled the Booking.");
      } else {
        return alert("Thank you!");
      }
      // end of condition
    } else {
      return alert("You can edit the booking");
    }
  } else if (bookingDate < newCurrentDateTime) {
    console.log(editBtnTag);
    if (editBtnTag) {
      return alert("Sorry,You cannot be able to Edit the Booking.");
    } else {
      alert(
        "Due to your Booked-Time is closer than tommorow date/time, you cannot be able to Edit or Cancel the Booking."
      );
    }
  }
};

window.addEventListener("load", () => {
  clearInputs();
  let bookedArrayAfterParse = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = `Booking ${i + 1}`;
    const bookedInfoFromLocalStorage = localStorage.getItem(key);
    bookedArrayAfterParse = JSON.parse(bookedInfoFromLocalStorage);
  }

  createBookingCard(bookedArrayAfterParse, clearInputs);
});
