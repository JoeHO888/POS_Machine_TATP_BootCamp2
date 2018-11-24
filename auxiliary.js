


const getPromotionType = (PromotionList,barcode)=>{
	let promotionType
	if ((PromotionList[0].barcodes.filter(e=>e == barcode)).length==1){
		promotionType= PromotionList[0].type
	}else{
		promotionType= ""	
	}

	return promotionType
	
}


module.exports = {
  getPromotionType:getPromotionType
}