/* Booking App JS */
const inputTags = document.querySelectorAll(".customerInput");

const customerNameTag = document.querySelector("#customerName");
const serviceNameTag = document.querySelector("#serviceName");
const bookDateTag = document.querySelector("#bookDate");
const bookTimeTag = document.querySelector("#bookTime");
const btnSubmitTag = document.querySelector("#btnSubmit");


const bookInfoContainerTag = document.querySelector('.bookInfoContainer');

const clearPreviousInfo = (/*callback*/) => {
	for (let i = 0; i < inputTags.length; i++) {
		inputTags[i].value = "";
	}
	// callback();
}

const saveCustomerBook = () => {
	if (customerNameTag.value === "" && serviceNameTag === "" && bookDateTag === "") {
		alert('Input Field Required...');
		return alert;
	}
	createShowBookedInfo();
}


window.addEventListener("load", () => {
	clearPreviousInfo();
});

btnSubmitTag.addEventListener('click', saveCustomerBook);

let counter = 0;
const createShowBookedInfo = () => {
	const cardTag = document.createElement('div')
	cardTag.classList.add('card', 'p-3', 'm-2');
	
	const bookTag = document.createElement('div')
	bookTag.classList.add('text-center', 'bookID');
	const newCounter = counter + 1;
	bookTag.id = newCounter.toString();
	bookTag.innerHTML = `Book ID - ${newCounter}`;
	
	const showNameTag = document.createElement('div')
	showNameTag.append(`Name - ${customerNameTag.value}`);
	
	const showServiceTypeTag = document.createElement('div')
	showServiceTypeTag.append(`Service Type - ${serviceNameTag.value}`);
	
	const showDateInfoTag = document.createElement('div')
	showDateInfoTag.append(`Book Date - ${bookDateTag.value}`)
	
	const showTimeInfoTag = document.createElement('div')
	showTimeInfoTag.append(`Time - ${bookTimeTag.value}`);
	
	const editAndDeleteBookContainerTag = document.createElement('div')
	editAndDeleteBookContainerTag.classList.add('btnContainer', 'mt-4')
	const editBtnTag = document.createElement('button')
	editBtnTag.classList.add('btn', 'btn-info')
	editBtnTag.append('Edit Book');
	
	const deleteBtnTag = document.createElement('button')
	deleteBtnTag.classList.add('btn', 'btn-danger', 'ms-2')
	deleteBtnTag.append('Delete Book');
	
	editAndDeleteBookContainerTag.append(editBtnTag, deleteBtnTag);
	cardTag.append(bookTag, showNameTag, showServiceTypeTag, showDateInfoTag, showTimeInfoTag, editAndDeleteBookContainerTag);
	bookInfoContainerTag.append(cardTag);
	
	clearPreviousInfo();
}

