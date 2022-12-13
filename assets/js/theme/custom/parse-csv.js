import Papa from 'papaparse';

/*
 *	Read a list of product IDs from a CSV, 
 *	filter for global add-on if necessary, return array
 *	@param {string} addOnCode - Initials of global add-on or 'product'
 *	@param {string} productID - If first argument is 'product', ID of product
 */
export default function getProductList(addOnCode, productID) {
	//	if we are fetching a list for an individual product,
	//	'product' will be passed as the first argument;
	//	otherwise, the initials of the global add-on will be passed
	return new Promise((resolveCSV, rejectCSV) => {
    const csvPath = addOnCode === 'product'
        ? `/content/upsell-suite/product/${productID}.csv`
        : `/content/upsell-suite/global/store.csv`

    Papa.parse(
    	csvPath,
    	{
    		download: true,
    		header: true,
    		complete: (results, file) => {
    			//	if its not a proper upsell suite CSV, abort
				if (!results.data[0].hasOwnProperty("product_id")) {
					rejectCSV('file not found');
					return;
				}
                //  in the case of a single product's list,
                //  we're taking all of the IDs;
                //  if it's a global add-on, only take
                //  the ones that match the add-on code
                const prodArray = results.data
                    .filter(row => row.product_id.length && (addOnCode === 'product' || row.AddOn === addOnCode));

                //  if this is a single product's CSV,
                //  save complete array of products
                //  for CPU add-on to use later
                if (addOnCode === 'product') {
                    window.upsellCSV = [...prodArray];
                }

                if (prodArray.length) {
                    resolveCSV(prodArray);
                }   else    {
                    rejectCSV('no products in file');
                }
            },
            error: (err, file) => {
                console.error(`Unable to parse ${csvPath}`);
                rejectCSV(err);
			}
    	});
    });
}
