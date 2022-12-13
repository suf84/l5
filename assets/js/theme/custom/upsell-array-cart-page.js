import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import getProductList from './parse-csv';

const upsellCPU = {
	//  number of products to display on cart page
    numberOfProductsInCPU: 3,

    /*
     *  Fires from product page when item is added to cart:
     *  select products for CPU based on priority,
     *  AJAX product card content and save to sessionStorage
     *  @param {number} addedItemID - the item just added
     *  @param {Array} cartItems - array of product IDs of items already in cart
     *  @param {Array} customFieldProducts - array of product IDs to be added to CPU via custom fields of item just added
     */
    saveUpsellData(addedItemID, cartItems, customFieldProducts)    {
        this.currentItem = addedItemID;
        this.currentCustomFields = customFieldProducts;
        cartItems.push(addedItemID);

        //  retrieve HTML of products stored when
        //  previous products were added to cart
        const cpuHTMLtext = sessionStorage.getItem("cpuCards");
        this.cpuHTML = this.parseArrayFromString(cpuHTMLtext)

        this.cpuHTML.forEach((product, i, htmlArray) => {
            //  remove products from stored CPU if:
            //  1) product is now an item in the cart
            //  2) product was added via custom field
            //      from an item that is no longer in the cart
            if (cartItems.includes(product.product_id)
                || (product.source !== 'csv' && !cartItems.includes(parseInt(product.source)))
            ) {
                htmlArray.splice(i, 1);
            }

            //  if a product was previously added via CSV
            //  and is also in the current product's custom fields,
            //  upgrade its priority status 
            if (product.source === 'csv' && this.currentCustomFields.includes(product.product_id)) {
                product.source = this.currentItem;
            }
        });

        //  get an array of product IDs in storage
        let cpuItems = this.cpuHTML.map(item => item.product_id);
        //  create an array of products to be added,
        //  starting with IDs from the custom fields
        //  of the product just added, minus the ones already stored
        let itemsToAdd = this.currentCustomFields.filter(id => !cpuItems.includes(id));

        //  count the products in storage
        //  that were added via custom field;
        //  these are given priority over Upsell Suite CSVs
        let savedCustomFieldCount = 0;
        this.cpuHTML.forEach(product => {
            if (product.source != 'csv') savedCustomFieldCount++;
        });

        //  after the custom fields products,
        //  how many are we adding from the CSV?
        //  if all of the products in storage are
        //  from custom fields, we're done here
        const slotsAvailable = this.numberOfProductsInCPU - savedCustomFieldCount;
        if (slotsAvailable < 1) return;
        
        //  if the product just added to the cart
        //  has more custom field products than there is
        //  space left in CPU, drop the last ones
        itemsToAdd.length = Math.min(itemsToAdd.length, slotsAvailable);

        //  retrieve contents of Upsell Suite CSVs
        //  for items previously added to cart and
        //  calculate relative values of upsell products
        //  including CSV from newest cart item
        this.updateArrayOfCSVProducts();

        //  occasionally later references to this variable
        //  have resulted in fatal errors during testing;
        //  if for whatever reason the above function didn't work, just abort
        if (!this.combinedCSV) {
            console.error("Error parsing CSV data from sessionStorage");
            return;
        }

        //  now check the array of products
        //  from the combined CSV data
        //  to fill out the rest of the CPU
        let storedCSVindex = 0;
        while (itemsToAdd.length < slotsAvailable && storedCSVindex < this.combinedCSV.length) {
            while (
                //  skip products that are already in the cart...
                cartItems.includes(this.combinedCSV[storedCSVindex].product_id)
                //  ...and skip repeats that are already
                //  in the current product's custom fields
                || itemsToAdd.includes(this.combinedCSV[storedCSVindex].product_id)
                ) storedCSVindex++;
            itemsToAdd.push(this.combinedCSV[storedCSVindex++].product_id);
        }

        //  now clear out space in storage for the new CSV products
        this.cpuHTML.forEach((savedProduct, i, htmlArray) => {
            //  if a product we're about to add
            //  is already in storage, no need to AJAX it again;
            //  note that this is not checked in the previous loop
            //  because we're iterating over the stored items in this step,
            //  not the new items to add, so that we'll know which ones to remove...
            if (itemsToAdd.includes(savedProduct.product_id)) {
                itemsToAdd.splice(itemsToAdd.indexOf(savedProduct.product_id), 1);
            //  ...in other words, if a product is in storage
            //  was previously added via CSV and
            //  is no longer at the top of the priority list,
            //  it can now be removed to make room for a better one
            }   else if (savedProduct.source == 'csv') {
                htmlArray.splice(i, 1);
            } 
        })

        //  at this point the newly-truncated arrays
        //  of products stored and products to be added
        //  should add up the the size of the CPU (usually 3);
        //  so we AJAX the new products as needed 
        //  to fill the open slots, and we're out
        if (itemsToAdd.length) {
            console.log("Products being added to CPU: ", itemsToAdd);
            this.getCPUcards(itemsToAdd);
        }
    },

    /*
     *  Parse array of objects from string stored in sessionStorage
     *  or, if empty, create new array;
     *  by the way, this can't possibly be the best way
     *  to parse an array of objects stored as a string;
     *  the problem is if you just use .split(',')
     *  you'll get an array with all of the key-value pairs
     *  pulled out of each of the objects;
     *  this was the best I could do, but
     *  if you know a better way please replace this amateurish nonsense
     *  @param {string} arrayString - array of objects stored as a string
     */
    parseArrayFromString(arrayString)  {
        return arrayString
        ? arrayString.split('},{')
            .map(string => {
                if (!string.startsWith('{')) string = '{' + string;
                if (!string.endsWith('}')) string = string + '}';
                return string;
            })
            .map(item => JSON.parse(item))
        : [];
    },

    /*
     *  Get the array of CSV products for all items in cart from sessionStorage,
     *  then update with data from new CSV
     */
    updateArrayOfCSVProducts()   {
        const combinedCSVtext = sessionStorage.getItem("combinedCSV");
        this.combinedCSV = this.parseArrayFromString(combinedCSVtext);

        //  CSV for current product is downloaded and parsed
        //  on product page load, then saved as a window variable;
        //  if no CSV is available for this product,
        //  site-wide default products are not saved
        if (typeof window.upsellCSV === "undefined") return;
        window.upsellCSV.forEach((newProduct, i) => {
            //  if the product ID is already in the combined CSV,
            //  add the frequency of purchases from the new cart item...
            if (!this.combinedCSV.some(product => {
                    if (product.product_id == newProduct.product_id) {
                        product.freq = parseInt(product.freq) + parseInt(newProduct.freq);
                        return true;
                    }
            })) {
            //  ...otherwise just add the product to the array
                newProduct.freq = parseInt(newProduct.freq);
                this.combinedCSV.push(newProduct);
            }

            //  sort the array so the most-purchased products are first
            this.combinedCSV.sort((a, b) => b.freq - a.freq);
            //  don't need to save them all; even 20 may be too many
            if (this.combinedCSV.length > 20) this.combinedCSV.length = 20
            //  stick 'em in sessionStorage for the next time we do this
            sessionStorage.setItem("combinedCSV", this.combinedCSV.map(prod => JSON.stringify(prod)));
        });
    },

    /*
     *  Recursive function to AJAX HTML for product cards in CPU;
     *  recursive call is in AJAX callback
     *  @param {array} idArray - product IDs to be added
     */
    getCPUcards(idArray) {
        //  finish if the IDs have all been AJAXed
        //  or the HTML data is full up;
        //  should happen at the same time
        if (!idArray.length || this.cpuHTML.length >= this.numberOfProductsInCPU) {
            console.log("CPU will display these products: ", this.cpuHTML.map(item => item.product_id));
            return;
        }

        const nextID = idArray.shift();
        utils.api.product.getById(
            nextID,
            {
                template: 'custom/cart-page-upsell-item'
            },
            (err, response) => {
                if (err) {
                    console.error(err);
                    console.log(`Failed to load ${nextID} for CPU`);
                }

                //  create a new object to store the product card
                let newCPUItem = {};
                newCPUItem.product_id = nextID;
                //  if the ID came from a custom field,
                //  save the ID of the referring product;
                //  otherwise mark it from a CSV
                newCPUItem.source = this.currentCustomFields.includes(nextID) ? this.currentItem : 'csv';
                newCPUItem.html = response;
                this.cpuHTML.push(newCPUItem);

                //  update sessionStorage after each AJAX
                //  in case user clicks away before
                //  all products are complete
                sessionStorage.setItem("cpuCards", this.cpuHTML.map(obj => JSON.stringify(obj)));
                //  and then get the next item
                this.getCPUcards(idArray);
            }
        )
    },

    /*
     *  If there are not enough products to fill the CPU on cart page load,
     *  get CSV of a product already in CPU
     *  @param {Array} cpuProducts - product IDs already saved in CPU
     *  @param {number} arraySize - number of additional products needed to fill CPU
     */
	getAdditionalProducts(cpuProducts, arraySize = this.numberOfProductsInCPU)	{
		return new Promise (async (resolveArray, rejectArray) => {
            let csvArray = [];
			try	{
                //  parse the upsell CSV for the first item in the CSV
				csvArray = await getProductList('product', cpuProducts[0])
			}	catch(err)	{
				console.log(`Unable to retrieve CSV for ${cpuProducts[0]}`);
				// console.err(err);
                //  if there's a second item in the CPU, try that one
				if (cpuProducts.length > 1) {
					try	{
						csvArray = await getProductList('product', cpuProducts[1])
					}	catch(err)	{
						console.log(`Unable to retrieve CSV for ${cpuProducts[1]}`);
						// console.err(err);
					}
                }
			}

            //  if we still haven't found any more products...
            if (!csvArray.length) {
                //  ...fall back on site-wide upsell defaults
                try {
                    csvArray = await getProductList('def');
                }   catch(err)  {
                    console.log("No default upsell products for store");
                    //  still no dice, dip out
                    return rejectArray('No further CSVs available');
                }
            }

			let returnArray = [];
			let csvIndex = 0;
            //  find products to send back
			while (returnArray.length < arraySize && csvIndex < csvArray.length)	{
                //  skip products that are already in CPU
				while (
                    cpuProducts.includes(csvArray[csvIndex]) 
                    && csvIndex < csvArray.length
                    ) csvIndex++;
				returnArray.push(csvArray[csvIndex]);
			}
			resolveArray(returnArray);
			return;
		});
	}
}

export default upsellCPU;
