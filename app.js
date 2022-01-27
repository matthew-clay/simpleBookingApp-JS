/* Booking App JS */
const inputTags = document.querySelectorAll(".customerInput"),
	customerNameTag = document.querySelector("#customerName"),
	serviceNameTag = document.querySelector("#serviceName"),
	bookDateTag = document.querySelector("#bookDate"),
	bookDateTimeTag = document.querySelector("#bookDateTime"),
	btnSubmitTag = document.querySelector("#btnSubmit"),
	bookInfoContainerTag = document.querySelector('.bookInfoContainer');

const customerBookInfo = [];
let bookInfoObj = {};
let counter = 1;
const saveCustomerBook = () => {
	const customerName = customerNameTag.value,
		serviceName = serviceNameTag.value,
		bookDate = bookDateTag.value,
		bookDateTime = bookDateTimeTag.value;
	
	if (customerName === "" || serviceName === "" || bookDate === "" || bookDateTime === "") {
		alert('Input Fields Required...');
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
	
	/*
	const key = `Booking ${counter}`;
	const value = JSON.stringify(bookInfoObj);
	localStorage.setItem(key, value);
	*/
	counter += 1;
	
	bookInfoContainerTag.innerHTML = "";
	createShowBookedInfo(customerBookInfo);
}

const clearPreviousInfo = () => {
	for (let i = 0; i < inputTags.length; i++) {
		inputTags[i].value = "";
	}
}

const createShowBookedInfo = (createShowBookedInfo) => {
	for (let i = 0; i < createShowBookedInfo.length; i++) {
		const cardTag = document.createElement('div')
		cardTag.classList.add('card', 'p-3', 'm-2');
		
		const bookTag = document.createElement('div')
		bookTag.classList.add('text-center', 'bookID');
		const idForBooking = customerBookInfo[i].id.toString();
		bookTag.id = idForBooking;
		bookTag.innerHTML = `Book ID - ${idForBooking}`;
		
		const showNameTag = document.createElement('div')
		showNameTag.append(`Name - ${customerBookInfo[i].name}`)
		
		const showServiceTypeTag = document.createElement('div')
		showServiceTypeTag.append(`Service Type - ${customerBookInfo[i].serviceType}`)
		
		const showDateInfoTag = document.createElement('div')
		showDateInfoTag.append(`Book Date - ${customerBookInfo[i].date}`)
		
		const showTimeInfoTag = document.createElement('div')
		showTimeInfoTag.append(`Time - ${customerBookInfo[i].dateTime}`);
		
		const editAndCancelBookContainerTag = document.createElement('div')
		editAndCancelBookContainerTag.classList.add('btnContainer', 'mt-4')
		const editBtnTag = document.createElement('button')
		editBtnTag.classList.add('btn', 'btn-info', 'btnEdit')
		editBtnTag.append('Edit Book');
		
		const cancelBtnTag = document.createElement('button')
		cancelBtnTag.classList.add('btn', 'btn-danger', 'btnCancel', 'ms-2')
		cancelBtnTag.append('Cancel Book');
		
		editAndCancelBookContainerTag.append(editBtnTag, cancelBtnTag);
		cardTag.append(bookTag, showNameTag, showServiceTypeTag, showDateInfoTag, showTimeInfoTag, editAndCancelBookContainerTag);
		bookInfoContainerTag.append(cardTag);
	}
	clearPreviousInfo();
}

const isAllowedToEditOrCancel = (date) => {
	const currentDate = new Date();
	console.log("todayDate:", todayDate);
	const newCurrentDate = currentDate.setHours(currentDate.getHours() + 24);
	console.log("todayDate After + 24:", newCurrentDate);
}

btnSubmitTag.addEventListener('click', saveCustomerBook);

const btnEditTag = document.querySelector('.btnEdit')
const btnCancelTag = document.querySelector('.btnCancel')

btnEditTag.addEventListener('click', () => {
	isAllowedToEditOrCancel();
});

btnCancelTag.addEventListener('click', () => {
	isAllowedToEditOrCancel();
})


window.addEventListener("load", () => {
	clearPreviousInfo();
});


