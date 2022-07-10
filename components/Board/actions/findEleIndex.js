export const findEleIndex = (arr, key) => {
	const i = arr.findIndex(ele => ele.key === key)
	if (i === -1) {
		throw new Error(`Element with key ${key} not found`)
	}
	return i;
}
