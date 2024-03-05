// Function to toggle sidebar menu and overlay
function toggleSidebar() {
  var sidebarMenu = document.getElementById("sidebar-menu");
  var overlay = document.querySelector(".overlay");
  var headerLinks = document.getElementById("header-links");

  sidebarMenu.classList.toggle("show"); // Toggle the 'show' class
  overlay.style.display = sidebarMenu.classList.contains("show") ? "block" : "none"; // Show/hide overlay
  // Toggle body overflow to prevent scrolling when menu is open
  document.body.style.overflow = sidebarMenu.classList.contains("show") ? "hidden" : "auto";

  // Hide/show header links based on sidebar menu state
  if (sidebarMenu.classList.contains("show")) {
    headerLinks.style.display = "none";
  } else {
    headerLinks.style.display = "flex";
  }
}

// Event listener for hamburger menu click
document.getElementById("hamburger-menu").addEventListener("click", toggleSidebar);

// Event listener to close sidebar menu when clicking away from it
document.addEventListener("click", function(event) {
  var sidebarMenu = document.getElementById("sidebar-menu");
  var hamburgerMenu = document.getElementById("hamburger-menu");
  var isClickInsideMenu = sidebarMenu.contains(event.target);
  var isClickOnHamburger = hamburgerMenu.contains(event.target);
  if (!isClickInsideMenu && !isClickOnHamburger && sidebarMenu.classList.contains("show")) {
    toggleSidebar(); // Close sidebar menu
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(productCard => {
      productCard.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent click event from bubbling up
          
          // Clear all extra-info boxes
          const allExtraInfoBoxes = document.querySelectorAll('.extra-info');
          allExtraInfoBoxes.forEach(box => {
              box.innerHTML = '';
          });
          
          const productInfoBox = productCard.querySelector('.extra-info');
          const productName = productCard.querySelector('h3').textContent;
          const productPrice = productCard.querySelector('.price').textContent;
          const productDescription = Array.from(productCard.querySelectorAll('.description')).map(desc => desc.textContent).join('\n');
          productInfoBox.innerHTML = `Product Name: ${productName}\nPrice: ${productPrice}\n\nDescription:\n${productDescription}`;
          
          // Remove event listener from document to hide info box when clicking outside
          document.removeEventListener('click', hideInfoBox);
          
          // Add event listener to hide info box when clicking outside the new product card
          document.addEventListener('click', hideInfoBox);
          
          // Function to hide info box when clicking outside the product card
          function hideInfoBox(e) {
              if (!productCard.contains(e.target)) {
                  productInfoBox.innerHTML = ''; // Clear info box content
                  document.removeEventListener('click', hideInfoBox); // Remove event listener
              }
          }
      });
  });
});


// JavaScript

document.addEventListener('click', function(event) {
  const infoBoxes = document.querySelectorAll('.extra-info');
  infoBoxes.forEach(infoBox => {
      if (!infoBox.contains(event.target) && event.target.closest('.product-card') !== infoBox.previousElementSibling) {
          infoBox.style.display = 'none'; // Hide info box if click is outside and not on the current product card
      }
  });
});


function showProductInfo(productId) {
    const productCard = document.getElementById(productId);
    const productInfoBox = productCard.querySelector('.extra-info');
    const productInfo = productCard.querySelector('.product-info');

    // Toggle display of extra info box
    productInfoBox.style.display = productInfoBox.style.display === 'block' ? 'none' : 'block';

    // Populate extra info box with product details
    const productName = productInfo.querySelector('h3').textContent;
    const productPrice = productInfo.querySelector('.price').textContent;
    const productDescription = productInfo.querySelectorAll('.description');
    let descriptionHTML = '';
    productDescription.forEach(desc => {
        descriptionHTML += `<p>${desc.textContent}</p>`;
    });
    productInfoBox.innerHTML = `
        <div class="product-details">
            <div class="product-name">${productName}</div>
            <div class="product-price">${productPrice}</div>
            <div class="product-description">${descriptionHTML}</div>
        </div>
    `;
}




function showProductInfo(productID) {
  var productInfo = document.getElementById(productID + "-info");
  var productInfos = document.querySelectorAll('.extra-info');
  productInfos.forEach(function(info) {
      if (info !== productInfo) {
          info.style.display = 'none';
      }
  });
  productInfo.style.display = productInfo.style.display === "block" ? "none" : "block";
}




// Define your products
const products = [
  {
      id: 1,
      name: "Headphones",
      price: 29.99,
      image: "product1.jpg",
  },
  {
      id: 2,
      name: "Smart Watch",
      price: 99.99,
      image: "product2.jpg",
  },
  {
      id: 3,
      name: "Smart TV",
      price: 999.99,
      image: "product3.jpg",
  },
  {
      id: 4,
      name: "Laptop",
      price: 799.99,
      image: "product4.jpg",
  },
  {
      id: 5,
      name: "Tablet",
      price: 599.99,
      image: "product5.jpg",
  },
  {
      id: 6,
      name: "Camera",
      price: 499.99,
      image: "product6.jpg",
  },
];

// Function to handle search
function handleSearch(event) {
  event.preventDefault(); // Prevent form submission
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const searchResults = searchProducts(searchInput);
  displaySearchResults(searchResults);
}

// Function to search products by name
function searchProducts(query) {
  return products.filter(product => product.name.toLowerCase().includes(query));
}

// Function to display search results
function displaySearchResults(results) {
  const productShowcase = document.querySelector(".slider");
  productShowcase.innerHTML = ""; // Clear existing products

  if (results.length === 0) {
      productShowcase.innerHTML = "<p>No matching products found</p>";
  } else {
      results.forEach(product => {
          const productCard = `
              <div class="product-card" id="product${product.id}" onclick="showProductInfo('product${product.id}')">
                  <img src="${product.image}" alt="${product.name}">
                  <div class="product-info" id="product${product.id}">
                      <h3>${product.name}</h3>
                      <p class="price">$${product.price}</p>
                      <p class="description">Product Name: ${product.name}</p>
                      <p class="description">Price: $${product.price}</p>
                      <div class="extra-info" id="product${product.id}-info"></div>
                      <button>Add to Cart</button>
                  </div>
              </div>`;
          productShowcase.innerHTML += productCard;
      });
  }
}
