
function getPrice(fSymbol,tSymbol,t){
	unixtime = new Date(t).getTime();
	api = "https://min-api.cryptocompare.com/data/pricehistorical"
	data = {"fsym":fSymbol,"tsyms":tSymbol,"ts":unixtime/1000};
	r = ""

	$.ajax({
		type:"GET",
		url:api,
		data:data,
		async:false,
		success:function(result){
			r = result;
		}
	});
	console.log(r);
	return r[fSymbol][tSymbol];
}

tmp = "";
setInterval(
		function(){
			if (tmp===$("tr.ng-scope")[0].cells[0].innerText) return;
			tmp = $("tr.ng-scope")[0].cells[0].innerText;
			$("tr.ng-scope").each(
				function(index,item){
					tradeDate = item.cells[0].innerText;
					pairCell = item.cells[1];
					priceCell = item.cells[3];
					feeCell = item.cells[5];
					totalCell = item.cells[6];
					pair = pairCell.innerText;
					price = priceCell.innerText;
					fee = feeCell.innerText;
					total = totalCell.innerText;
					pairDsymbol = pair.split("/")[1]
					priceDsymbol = getPrice(pairDsymbol,"USD",tradeDate);
					BNBPrice = getPrice("BNB","USD",tradeDate);
					if (pairDsymbol === "BTC") {
						BTCPrice = priceDsymbol;
					} else {
						BTCPrice = getPrice(priceDsymbol,"USD",tradeDate);
					}
					feePrice = BNBPrice*fee.split(" ")[0];
					p = price*priceDsymbol;
					totalPrice = BTCPrice*total.split(" ")[0];
					// priceCell.innerText = price + "*$"+priceDsymbol+"=$"+p.toFixed(2);
					// feeCell.innerText = price + "*$" + BNBPrice +"=$"+feePrice.toFixed(2);
					priceCell.innerText = "$"+p.toFixed(2);
					feeCell.innerText ="$"+feePrice.toFixed(2);
					totalCell.innerText = "$"+totalPrice.toFixed(2);

				}
			)
		},
		2000);