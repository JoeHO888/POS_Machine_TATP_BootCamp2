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

const getSummary = (DetailsArray,barcode) =>{
	const selectedDetails = DetailsArray.filter(e=>e.barcode==barcode)
	let summary = {}
	
	summary['name'] = selectedDetails[0].name
	summary['price'] = selectedDetails[0].price
	summary['count'] = selectedDetails.map(e=>e.count).reduce(auxiliary.add,0.00)
	summary['subtotal'] = auxiliary.getSubtotal(selectedDetails,summary)
	summary['unit'] = auxiliary.getUnit(selectedDetails,summary)
	
	return summary
}



module.exports = {
  getAllDetailsOfAnItem: getAllDetailsOfAnItem,
  getSummary:getSummary
}
