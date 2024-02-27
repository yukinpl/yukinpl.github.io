$(document).ready(function() {
  'use strict';

  var html = $('html'),
    headerOverlay = $(".header__overlay"),
    menuOpenIcon = $(".nav__icon-menu"),
    menuCloseIcon = $(".nav__icon-close"),
    menuList = $(".main-nav"),
    searchOpenIcon = $(".nav__icon-search"),
    searchCloseIcon = $(".search__close"),
    searchInput = $(".search__text"),
    searchBox = $(".search"),
    toggleTheme = $(".toggle-theme");

  /* =======================
  // Hide Header
  ======================= */
  $('.header').headroom({
    tolerance: {
      down : 10,
      up : 20
    },
    classes: {
      initial:  'header--headroom',
      top:      'header--top',
      notTop:   'header--not-top',
      pinned:   'header--pinned',
      unpinned: 'header--unpinned'
    }
  });


  /* ===============================
  // Menu + Search + Theme Switcher
  =============================== */
  menuOpenIcon.click(function() {
    menuOpen();
  })

  menuCloseIcon.click(function () {
    menuClose();
  })

  searchOpenIcon.click(function () {
    searchOpen();
  });

  searchCloseIcon.click(function () {
    searchClose();
  });

  headerOverlay.click(function () {
    menuClose();
    searchClose();
  });

  function menuOpen() {
    menuList.addClass("is-open");
    headerOverlay.addClass("is-visible");
  }

  function menuClose() {
    menuList.removeClass("is-open");
    headerOverlay.removeClass("is-visible");
  }

  function searchOpen() {
    searchBox.addClass("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 100);
  }

  function searchClose() {
    searchBox.removeClass("is-visible");
  }

  $('.search, .search__box').on('click keyup', function (event) {
    if (event.target == this || event.keyCode == 27) {
      $('.search').removeClass('is-visible');
    }
  });

  if (toggleTheme) {
    toggleTheme.click(function () {
      darkMode();
    });
  };

  // Theme Switcher
  function darkMode() {
    if (html.hasClass('dark-mode')) {
      html.removeClass('dark-mode');
      localStorage.removeItem("theme");
      $(document.documentElement).removeAttr("dark");
    } else {
      html.addClass('dark-mode');
      localStorage.setItem("theme", "dark");
      $(document.documentElement).attr("dark", "");
    }
  }


  // =====================
  // Simple Jekyll Search
  // =====================
  SimpleJekyllSearch({
    searchInput: document.getElementById("js-search-input"),
    resultsContainer: document.getElementById("js-results-container"),
    json: "/search.json",
    searchResultTemplate: '<li class="search-results__item"><a class="search-results__link" href="{url}">{title}</a></li>',
    noResultsText: '<li class="no-results">No results found</li>'
  });


  /* =======================
  // Slick Slider
  ======================= */
  $('.slider__box').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    dots: false,
    centerMode: true,
    adaptiveHeight: true,
    fade: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: true
        }
      }
    ]
  });


  /* =======================
  // Masonry Grid Layout
  ======================= */
  var $grid = $('.grid').masonry({
    itemSelector: '.grid__post',
    percentPosition: true
  });

  $grid.imagesLoaded().progress(function () {
    $grid.masonry('layout');
  });


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post__content, .page__content").fitVids({
    customSelector: ['iframe[src*="ted.com"]', 'iframe[src*="facebook.com"]']
  });

  /* =======================
  // Zoom Image
  ======================= */
  $(".page img, .post img, .gallery img").attr("data-action", "zoom");
  $(".page a img, .post a img, .gallery a img").removeAttr("data-action", "zoom");


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function() {
    $("html, body")
      .stop()
      .animate({ scrollTop: 0 }, "slow", "swing");
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > $(window).height()) {
      $(".top").addClass("is-active");
    } else {
      $(".top").removeClass("is-active");
    }
  });


});