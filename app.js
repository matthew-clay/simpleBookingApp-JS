/* Booking App JS */
const inputTags = document.querySelectorAll(".customerInput");

const customerNameTag = document.querySelector("#customerName");
const serviceNameTag = document.querySelector("#serviceName");
const bookDateTag = document.querySelector("#bookDate");
const bookTimeTag = document.querySelector("#bookTime");
const btnSubmitTag = document.querySelector("#btnSubmit");

const bookInfoContainerTag = document.querySelector('.bookInfoContainer');

const saveCustomerBook = () => {
	if (customerNameTag.value === "") {
		alert('Name Required...');
		return alert
	}
}

window.addEventListener("load", () => {
});

btnSubmitTag.addEventListener('click', saveCustomerBook);

const createShowBookedInfo = () => {
}

