const db = require('./db.js');
const auxiliary = require('./auxiliary.js');

const getAllDetailsOfAnItem = barcode=> {
	let detailsOfAnItem
	let needToBeWeighted = false
	let count = 1
	let AllItems = db.loadAllItems()
	let PromotionList = db.loadPromotions()
	
	if (barcode.includes('-')){
		count = parseFloat(barcode.substring(barcode.indexOf("-")+1,barcode.length))
		barcode = barcode.substring(0,barcode.indexOf("-"))
		needToBeWeighted = true
	}

	detailsOfAnItem= AllItems.filter(e=>e.barcode == barcode)[0]
	detailsOfAnItem['promotionType'] = auxiliary.getPromotionType(PromotionList,barcode)
	detailsOfAnItem['needToBeWeighted']= needToBeWeighted
	detailsOfAnItem['count']= count
	
	return detailsOfAnItem
}



module.exports = {
  getAllDetailsOfAnItem: getAllDetailsOfAnItem,
}
