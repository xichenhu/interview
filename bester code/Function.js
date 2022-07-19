const jsonToString = (json) => {
	return JSON.stringify(json)
}

const stringToJson = (keyName) => {
	return window.localStorage.getItem('keyName') ? JSON.parse(window.localStorage.getItem(keyName)) : {}
}

