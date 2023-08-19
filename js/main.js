function toggleSearch() {
    var searchInput = document.querySelector('.search-input-item');

    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'flex';
    } else {
        searchInput.style.display = 'none';
    }
}

document.getElementById("navigateBtn").addEventListener("click", function() {
    location.href = "#gallery";
});

document.addEventListener("DOMContentLoaded", function() {
    var backdrop = document.querySelector('.backdrop');
    var instaButton = document.querySelector('.insta_button');
    var contactModal = document.getElementById('contactModalWindow');
    var imageModal = document.getElementById('modal');

    // Code for hamburger menu toggle
    if (backdrop) {
        $('.hamburger').click(function() {
            $('.menu__list').slideToggle();
            backdrop.style.display = 'block';
        });

        backdrop.addEventListener('click', function() {
            $('.menu__list').slideUp();
            this.style.display = 'none';
        });

        if (window.innerWidth <= 768) { 
            document.querySelectorAll('.menu__list-link').forEach(link => {
                link.addEventListener('click', () => {
                    backdrop.style.display = 'none';
                    document.querySelector('.menu__list').style.display = 'none';
                    document.querySelector('.hamburger').classList.remove('open');
                });
            });
        }
    }

    if (instaButton) {
        instaButton.addEventListener('click', function() {
            window.open("https://www.instagram.com/abigailfraczek/", "_blank");
        });
    }

    if (contactModal) {
        var buttons = document.querySelectorAll('.btn.btn-primary, .footer__button');
        var closeBtn = document.querySelector('.close-contact-btn');

        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                contactModal.style.display = "block";
            });
        });

        closeBtn.onclick = function() {
            contactModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == contactModal) {
                contactModal.style.display = "none";
            }
        }

        var closeMenuButton = document.querySelector('.close-menu');
        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', function() {
                $('.menu__list').slideUp();
                backdrop.style.display = 'none';
            });
        }
    }

    // Ensure the grid exists
    var grid = document.querySelector('.grid');
    if (grid) {
        // Initialize Masonry after images are loaded
        var msnry = new Masonry(grid, {
            itemSelector: '.grid_item',
            columnWidth: '.grid_item',
            gutter: 10,
            percentPosition: true
        });

        // Load more functionality
        var loadMoreButton = document.getElementById('loadMore');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', function() {
                // Get all hidden grid items
                var hiddenItems = document.querySelectorAll('.grid_item.hidden');

                // Define the number of items to show.
                var itemsToShow = 6;

                for (var i = 0; i < itemsToShow && i < hiddenItems.length; i++) {
                    hiddenItems[i].classList.remove('hidden');
                }
                msnry.layout();

                if (document.querySelectorAll('.grid_item.hidden').length === 0) {
                    loadMoreButton.style.display = 'none';
                }

                document.querySelector('.gallery').classList.add('no-gradient');
            });
        }
    }

    if (imageModal) {
        var modalImage = document.getElementById('modalImage');
        var captionText = document.getElementById('caption');
        var closeButton = document.querySelector('.close-btn');
        var images = document.querySelectorAll('.grid img');
        var currentIndex = 0;

        function showImageByIndex(index) {
            if (index < 0) {
                index = images.length - 1;
            } else if (index >= images.length) {
                index = 0;
            }
            modalImage.src = images[index].src;
            captionText.innerHTML = images[index].alt;
            currentIndex = index;
        }

        images.forEach(function(image, index) {
            image.addEventListener('click', function() {
                imageModal.style.display = "block";
                modalImage.src = this.currentSrc || this.src;
                captionText.innerHTML = this.alt;
                currentIndex = index;
            });
        });

        closeButton.addEventListener('click', function() {
            imageModal.style.display = "none";
        });

        var prevButton = document.querySelector(".prev");
        var nextButton = document.querySelector(".next");

        prevButton.addEventListener('click', function() {
            showImageByIndex(currentIndex - 1);
        });

        nextButton.addEventListener('click', function() {
            showImageByIndex(currentIndex + 1);
        });
    }
});
