export const findEle = (arr, key, option) => {
	option = { returnKey: false, raiseError: true, ...option }
	const val = option.returnKey ? arr.findIndex(ele => ele.key === key) : arr.find(ele => ele.key === key);
	if (option.returnKey ? val === -1 : !val) {
		if (option.raiseError) throw new Error(`Element with key ${key} not found in array`);
		return null;
	}
	return val;
}
