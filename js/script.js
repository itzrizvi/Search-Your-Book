// Spinner Function
const loadSpinner = displaying => {
    document.getElementById('spinner').style.display = displaying;
}
// Search Result Display
const toggleResult = (forSearch, forCount) => {
    document.getElementById('book-list-container').style.display = forSearch;
    document.getElementById('result-found').style.display = forCount;
}
// Loading API With Function
const loadBookApi = () => {
    const searchField = document.getElementById('search-field');
    const searchFeildValue = searchField.value.toLowerCase();
    const bookURL = `https://openlibrary.org/search.json?q=${searchFeildValue}`;
    fetch(bookURL)
        .then(response => response.json())
        .then(data => showResult(data.docs, data));
    // Clearing Input Field
    searchField.value = '';
    // Spin On
    loadSpinner('block');
    // Search Result Off
    toggleResult('none', 'none');
    // For Not Showing Error Previously
    document.getElementById('not-found').style.display = 'none';
}
// Output Function for Data
const showResult = (resultData, resultFound) => {
    const resultContainer = document.getElementById('book-list-container');
    // Clearing Previous Data
    resultContainer.textContent = '';
    // Showing How Many Item Found
    const totalFoundResult = resultFound.numFound;
    const showResultTotal = document.getElementById('result-found');
    showResultTotal.innerText = `Result Found : ${totalFoundResult}`;
    // Condition For Error Message
    const showNotFoundMSG = document.getElementById('not-found');
    if (totalFoundResult === 0) {
        document.getElementById('not-found').style.display = 'block';
        showNotFoundMSG.innerText = 'No Result Found...!!!';
        loadSpinner('none');
    } else {
        showNotFoundMSG.textContent = '';
        // Declaring loop For Each Items
        resultData?.forEach(singleData => {
            // Declaring Every Data With Condition
            const coverI = singleData.cover_i;
            let authorName = singleData.author_name;
            if (authorName === undefined) {
                authorName = 'Not Mentioned';
            }
            let bookPublisher = singleData.publisher;
            if (bookPublisher === undefined) {
                bookPublisher = 'Not Mentioned';
            }
            let publishingYear = singleData.first_publish_year;
            if (publishingYear === undefined) {
                publishingYear = 'Not Mentioned';
            }
            // Creating New Element
            const createNewDiv = document.createElement('div');
            createNewDiv.classList.add('col');
            // Declaring Condition For Book Cover
            if (coverI === undefined) {
                createNewDiv.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h3 id="no-img-title" class="card-title">This Book Has No Cover Image</h3>
                            <p id="book-title" class="card-title">Book Title:</p><h4>${singleData.title}</h4>
                            <p id="author-name" class="card-title">Author:</p><h4>${authorName}</h4>
                            <p id="book-publisher" class="card-title">Book Publisher:</p> <h4>${bookPublisher}</h4>
                            <p id="publishing-year" class="card-title">First Publishing Year:</p> <h4>${publishingYear}</h4>
                        </div>
                    </div>
                `;
            } else {
                createNewDiv.innerHTML = `
                    <div class="card">
                        <img id="book-Cover" src="https://covers.openlibrary.org/b/id/${coverI}-M.jpg" class="img-fluid card-img-top" alt="Book Cover">
                        <div class="card-body">
                            <p id="book-title" class="card-title">Book Title:</p><h4>${singleData.title}</h4>
                            <p id="author-name" class="card-title">Author:</p> <h4>${authorName}</h4>
                            <p id="book-publisher" class="card-title">Book Publisher:</p> <h4>${bookPublisher}</h4>
                            <p id="publishing-year" class="card-title">First Publishing Year:</p> <h4>${publishingYear}</h4>
                        </div>
                    </div>
                `;
            }
            // Appending New Div
            resultContainer.appendChild(createNewDiv);
        });
        // Spin OFF
        loadSpinner('none');
        // Search Result On
        toggleResult('flex', 'block');
    }
}