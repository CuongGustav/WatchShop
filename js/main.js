/* Slider */
const swiper = new Swiper('.slider', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
    },
});

/* Price Format */
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
/* Product List */
let productListHTML = document.querySelector('.productList');
let listProducts = [];
const addDataItemsToHTML = () => {
    productListHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.ID;
            newProduct.innerHTML = `
                <div class="image">
                    <img src="${product.Image}" alt="">
                </div>
                <div class="name">
                    <a href="" class="linkName-Item">
                    ${[product.Brand, product.ProductID, product.Collection, product.Origin, product.Gender, product.Glass, product.Movement]
                        .filter(item => item) // Lọc ra các phần tử không tồn tại 
                        .join(" - ")}
                    </a>
                </div>
                <div class="price">
                    ${formatPrice(product.Price)}
                    <span>₫</span>
                </div>
                <button class="addToBag">
                    Add To Cart
                </button>
            `;
            productListHTML.appendChild(newProduct);
        })
    }
}
/* Pagination Page */
const itemsPerPage = 12;
let currentPage = 1;

function showPage(page) {
    const items = document.querySelectorAll('.productList .item');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    items.forEach((item, index) => {
        item.style.display = (index >= start && index < end)? 'block' : 'none';
    });
    displayPageNumbers(totalPages);
}

function displayPageNumbers (totalPages) {
    const pageNumbersHTML = document.querySelector('.pageNumbers');
    pageNumbersHTML.innerHTML = "";
    const maxVisiblePages = 5;
    let startPage, endPage;
    if (totalPages < maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage < Math.ceil(maxVisiblePages /2)) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if ( currentPage + Math.floor(maxVisiblePages /2) >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxVisiblePages / 2);
            endPage = currentPage + Math.floor(maxVisiblePages / 2);
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = () => {
            currentPage = i;
            showPage(currentPage);
        };
        pageNumbersHTML.appendChild(pageButton);
    }
}
function nextPage() {
    const items = document.querySelectorAll('.productList .item');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}
function prevPage () {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

/*check @gmail.com*/
const checkEmailInContactUs = () => {
    const emailInput = document.getElementsByClassName('yourEmail')[0];
    const errorMessage = document.getElementsByClassName('error-message')[0];

    if (!emailInput.value.endsWith('@gmail.com') || emailInput.value.trim() === '') {
        emailInput.style.borderColor = 'red';
        errorMessage.style.display = 'block';
        return false;
    }

    emailInput.style.borderColor = '';
    errorMessage.style.display = 'none';
    return true;
};
/*Send Email*/
emailjs.init("44pUBi_G1PDWcTUaP");
const sendEmail = () => {
    if (!checkEmailInContactUs()) {
        return;
    } else {
        let btnSendEmail = document.getElementsByClassName('sendEmail')[0];
        let parms = {
            name: document.getElementsByClassName('yourName')[0].value,
            email: document.getElementsByClassName('yourEmail')[0].value,
            message: document.getElementsByClassName('messageInput')[0].value
        }
        btnSendEmail.textContent = 'Sending ...';
    
        const serviceID = 'service_gi1xr4b';
        const templateID = 'template_14ialso';
        emailjs.send(serviceID, templateID, parms)
        .then(() => {
            btnSendEmail.textContent = 'Send Now';
        }, (err) => {
            btnSendEmail.textContent = 'Send Now';
            alert(JSON.stringify(err));
        });
    }
}
document.getElementsByClassName('yourEmail')[0].addEventListener('input', checkEmailInContactUs);


/* Footer Retail  */
document.querySelector('.city').addEventListener('click', function() {
    document.querySelector('.retail').classList.toggle('active');
});
/* Link googleMap load browser */
document.addEventListener("DOMContentLoaded", function() {
    const addressLink = document.querySelector('.google-maps-link');
    const addressText = addressLink.textContent.trim();
    
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
    addressLink.href = googleMapsUrl;
    addressLink.target = "_blank"; 
});




/* App */
const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(dataItems => {
        listProducts = dataItems;
        addDataItemsToHTML();
        showPage(currentPage);
    })
    .catch(error => console.log(error));
}

initApp();
