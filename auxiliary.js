


const getPromotionType = (PromotionList,barcode)=>{
	let promotionType
	if ((PromotionList[0].barcodes.filter(e=>e == barcode)).length==1){
		promotionType= PromotionList[0].type
	}else{
		promotionType= ""	
	}

	return promotionType
	
}
const getUnit = (selectedDetails,summary)=>{
	let unit
	
	if ( selectedDetails[0].unit!='kg'&& selectedDetails[0].unit!='box'&&summary['count']>1){
		unit = selectedDetails[0].unit+'s'
	}else if(summary['unit']=='box'){
		unit = selectedDetails[0].unit+'es'
	}else{
		unit = selectedDetails[0].unit
	}
	return unit
	
}
const add = (a, b) => a + b

const getSubtotal = (selectedDetails,summary)=>{
	let subtotal 
	
	if (selectedDetails[0].promotionType == "BUY_TWO_GET_ONE_FREE"){
		subtotal = (Math.floor(summary['count']/3)*2+summary['count']%3)*summary['price']
	}else{
		subtotal = summary['count']*summary['price']
	}
	
	return subtotal
	
}


module.exports = {
  getPromotionType:getPromotionType,
  getUnit: getUnit,
  add:add,
  getSubtotal:getSubtotal
}