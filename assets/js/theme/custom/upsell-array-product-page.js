import $ from 'jquery';
import getProductList from './parse-csv';

export default class UpsellArray {
	/**
	 *	Creates an array of products to display in an upsell add-on
	 *	Priority: custom fields, bestselling products in CSV, others in CSV
	 *	Disables add-on if indicated in custom fields
	 *	@constructor
	 *	@param {string} addOnCode - Name of add-on to look for in custom fields
	 *	@param {Array} cartItems - Items currently in cart, from page context
	 *	@param {number} arraySize - Limit number of product IDs returned
	 */
	constructor (addOnCode, cartItems = [], arraySize = 4)	{
		this.enabled = true;

		this.addOnCode = addOnCode;
		this.cartIDs = cartItems.map(item => item.product_id.toString());
		this.arraySize = arraySize;

		this.currentProductID = $('input[name="product_id"]').val();
		this.customFields =
			Array.from($('.productView-info-name'))
				.filter(field => field.textContent.includes(addOnCode));
		//	turn off add-on if there is
		//	a custom field with value 'disable'
		if (this.customFields.some(field => field.nextElementSibling.textContent === 'disable')) {
			console.log(`Intuitsolutions.net ${this.addOnCode.toUpperCase()} upsell add-on disabled by product custom field`);
			this.enabled = false;
		}
	}

	/*
	 *	Returns an array of product IDs to be loaded and displayed
	 *	by whichever add-on instantiated this object
	 *	@param {number} staticProducts - Number of top-selling products to include before randomising the rest
	 */
	getTargets(staticProducts = 2) {
		this.staticProducts = staticProducts;
		return new Promise ((resolveArray, rejectArray)	=> {
			//	load products from custom fields first...
			this.productSet = new Set(this.customFields.map(field => field.nextElementSibling.textContent));

			//	...take out the ones already in the cart...
			this.cartIDs.forEach(ID => this.productSet.delete(ID));

			//	...check if there's already enough to fill the add-on...
			if (this.productSet.size >= this.arraySize) {
				return resolveArray(Array.from(this.productSet));
			}

			//	...then fill out the rest with previously parsed results...
			if (window.upsellProductList) {
				this.fillProductSet(window.upsellProductList, 1);
				return resolveArray(Array.from(this.productSet));
			}

			//	...or parse the CSV if we haven't yet
			getProductList('product', this.currentProductID)
				.then(csvResults => {
					this.processCSVresults(csvResults, this.staticProducts, resolveArray);
				}, err => {
					//	if PapaParse throws an error, display it
					console.log('No CSV for this product');
					//	if there is no CSV for this product,
					//	fetch the site-wide upsell deaults
					if (err === 'file not found') {
						getProductList('def')
							.then(defaultResults => {
								this.processCSVresults(
									//	remove current product from defaults
									//	before processing
									defaultResults
										.filter(product => product.product_id != this.currentProductID), 
									0,
									resolveArray
									);
							}, err => {
								console.log("No default products in global CSV");
								if (this.productSet.size) {
									//	if there are products 
									//	in the custom fields, use those
									resolveArray(Array.from(this.productSet).sort((a, b) => 0.5 - Math.random()));
								}	else 	{
									rejectArray('csv error');
								}
								return;
							});
					}
				});
		});
	}

	/*
	 *	Receives data from parse of CSV and readies it for further use
	 *	@param {Array} csvArray - Array of objects; the raw data returned from the CSV
	 *	@param {number} staticProducts - top products to add before randomising; argument is just being passed through, really
	 *	@param {Function} resolve - the resolution to the Promise instantiated by the call to getTargets()
	 */
	processCSVresults(csvArray, staticProducts, resolve)	{
		let csvProducts = csvArray
			//	remove products already in cart
			//	and blank rows at end of CSV
			.filter(row => !(
				this.cartIDs.includes(row.product_id)
				|| row.product_id == ''
				));

		this.fillProductSet(csvProducts, staticProducts);
		//	save remaining products for next add-on that requests them
		window.upsellProductList = csvProducts;

		//	shuffle results, return array
		return resolve(Array.from(this.productSet).sort((a, b) => 0.5 - Math.random()));
	}

	/**
	 *	Select product IDs to return
	 *	@param {Array} source - List of products, either from fresh CSV parse or previous parse stored in window
	 *	@param {number} staticProducts - Number of top products to add before randomising
	 */
	fillProductSet(source, staticProducts)	{
		let csvCount = 0;
		while (this.productSet.size < this.arraySize && source.length)	{
			//	take top product(s) first...
			if (csvCount++ >= staticProducts) {
				// 	...then randomise others
				source.sort((a, b) => 0.5 - Math.random());
			}
			this.productSet.add(source.shift().product_id);
		}
		//	re-sort so that other add-ons using same data
		//	will take top remaining products first
		source.sort((a, b) => b.freq - a.freq);
	}
}
