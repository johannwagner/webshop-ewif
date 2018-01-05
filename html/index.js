
function showSite(siteName) {

	const allSites = ['overview', 'shoppingcart', 'allbooks']

	allSites.forEach((site) => {
		const domElement = document.getElementById(site)
		const menuDomElement = document.getElementById(site + 'MenuItem')

		domElement.style.display = 'none';
		menuDomElement.className = '';
	})

	selectedSite = siteName;

	document.getElementById(siteName).style.display = 'block';
	document.getElementById(siteName + 'MenuItem').className = 'selectedMenuItem';
}

function renderBook(bookData, containerId, noAddToCart) {
	/*
		bookData.title
		bookData.author
		bookData.coverImage
	*/

	// Load Template


	$.ajax({
    	url : "book.html",
    	async: false,
    	success : function(htmlTemplate){
			// Set Data in Template

    		htmlTemplate = htmlTemplate.replace('{title}', bookData.title);
    		htmlTemplate = htmlTemplate.replace('{coverImage}', bookData.coverImage);
    		htmlTemplate = htmlTemplate.replace('{author}', bookData.author);
    		htmlTemplate = htmlTemplate.replace('{id}', bookData.id);
    		htmlTemplate = htmlTemplate.replace('{price}', bookData.price);

    		htmlTemplate = htmlTemplate.replace('{cardclass}', noAddToCart ? 'DisplayNone' : '')  
    		// Render Template

    		if(containerId) {
    			document.getElementById(containerId).innerHTML += htmlTemplate;
    		} else {
    			// No Container Id
    			document.write(htmlTemplate);
    		}

        } 
    });


}

function renderHighlightedBooks() {
	document.getElementById('overviewBookList').innerHTML = null;

	const randomIndex = Math.floor(Math.random() * bookList.length);
	const randomIndex2 = Math.floor(Math.random() * bookList.length);
	const randomIndex3 = Math.floor(Math.random() * bookList.length);

	const randomIndexes = [randomIndex, randomIndex2, randomIndex3];
	const highlightedBooks = randomIndexes.map(function (rIndex) {
		return bookList[rIndex];
	})

	for(index in highlightedBooks) {
		const book = highlightedBooks[index];

		renderBook(book, 'overviewBookList');
	}
}

function renderAllBooks() {
	document.getElementById('allbooksBookList').innerHTML = null;

	for (index in bookList) {
		const book = bookList[index];

		renderBook(book, 'allbooksBookList');
	}
}

function renderShoppingCart() {
	document.getElementById('shoppingcartBookList').innerHTML = null;




	const bookListForShoppingCart = shoppingCart.map((id) => {
		// We cannot access the indexes directly, because id != index.
		// Dumb Design Idea, yeah.
		return bookList.find(b => b.id === id);
	})

	console.log(shoppingCart);

	for (index in bookListForShoppingCart) {
		const book = bookListForShoppingCart[index];

		renderBook(book, 'shoppingcartBookList', true);
	}

	document.getElementById('shoppingcartTotal').innerHTML = `<h3>Total: ${bookListForShoppingCart.length <= 0 ? '0.00' : bookListForShoppingCart.map(b => b.price).reduce((sum, currentValue) => sum + currentValue)} €</h3>`


}

function renderShoppingCartBubble() {
	document.getElementById('shoppingCartBubble').innerHTML = shoppingCart.length;
}

function addBookToCart(id) {
	if(!shoppingCart.includes(id)) {
		shoppingCart.push(id);


		console.log('addedBookId: ', id);
		console.log('newShoppingCart: ', shoppingCart);


		renderShoppingCart();
		renderShoppingCartBubble();

		showSite('shoppingcart');
	}

	
}