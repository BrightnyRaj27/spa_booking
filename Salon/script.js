document.addEventListener("DOMContentLoaded", function () {
  const categories = [
    "Hair Services",
    "Beauty Services",
    "Spa Services",
    "Nail Services",
    "Bridal Services",
    "Haircare Services",
    "Skincare Services",
    "Groom Services",
    "Detox Services",
    "Manicure Services",
    "Pedicure Services",
    "Facial Services",
    "Massage Services",
  ];
  const services = {
    "Hair Services": [
      { name: "Haircut", duration: "30 mins", price: 30, tax: 5 },
      { name: "Haircolor", duration: "2hrs 30 mins", price: 300, tax: 50 },
      { name: "Hair Extensions", duration: "40 mins", price: 100, tax: 10 },
      { name: "Hair Spa", duration: "50 mins", price: 60 },
    ],
    "Beauty Services": [
      { name: "Facial", duration: "45 mins", price: 50, tax: 5 },
      { name: "Manicure", duration: "40 mins", price: 40, tax: 5 },
      { name: "Pedicure", duration: "50 mins", price: 50, tax: 5 },
      { name: "Waxing", duration: "30 mins", price: 35, tax: 5 },
    ],

    "Spa Services": [
      { name: "Body Scrubs", duration: "45 mins", price: 100, tax: 10 },
      { name: "wraps ", duration: "30 mins", price: 150, tax: 15 },
    ],
    "Nail Services": [
      { name: "Waxing", duration: "30 mins", price: 150, tax: 12 },
      { name: "Nail Art ", duration: "30 mins", price: 100, tax: 10 },
    ],
    "Bridal Services": [
      { name: "Bridal Makeup", duration: "90 mins", price: 1000, tax: 30 },
      { name: "Saree Drapping ", duration: "10 mins", price: 150, tax: 10 },
    ],
    "Haircare Services": [
      { name: "Hair cut", duration: "30 mins", price: 300, tax: 10 },
      { name: "Hair Wash ", duration: "30 mins", price: 150, tax: 12 },
      { name: "Hair Coluring ", duration: "60 mins", price: 450, tax: 50 },
    ],
    "Skincare Services": [
      { name: "Detan", duration: "40 mins", price: 200, tax: 5 },
      { name: "Scrub ", duration: "30 mins", price: 150, tax: 5 },
      { name: "Bleaching ", duration: "30 mins", price: 150, tax: 5 },
    ],
    "Groom Services": [
      { name: "Groom Makeup", duration: "45 mins", price: 100, tax: 5 },
    ],
    "Detox Services": [
      { name: "Hair Detox", duration: "30 mins", price: 200, tax: 10 },
    ],
    "Manicure Services": [
      { name: "trimming", duration: "10 mins", price: 50, tax: 5 },
      { name: "shaping ", duration: "10 mins", price: 100, tax: 7 },
      { name: "filing ", duration: "10 mins", price: 150, tax: 15 },
    ],
    "Pedicure Services": [
      { name: "classic", duration: "30 mins", price: 200, tax: 20 },
      { name: "gel ", duration: "30 mins", price: 150, tax: 5 },
      { name: "paraffin ", duration: "30 mins", price: 150, tax: 5 },
    ],
    "Facial Services": [
      { name: "Golden Facial", duration: "60 mins", price: 2000, tax: 100 },
      { name: "Wine Facial ", duration: "40 mins", price: 1500, tax: 60 },
    ],
    "Massage Services": [
      { name: "Swedish", duration: "40 mins", price: 200, tax: 20 },
      { name: "hot stone ", duration: "30 mins", price: 150, tax: 5 },
      { name: "deep tissue ", duration: "30 mins", price: 150, tax: 5 },
    ],
  };

  const giftVouchers = [
    { name: "Daughter’s Day", price: 50, value: 50, validity: "Unlimited" },
    { name: "Father’s Day", price: 60, value: 60, validity: "30 days" },
    { name: "World Smile Day", price: 40, value: 40, validity: "Unlimited" },
    { name: "Halloween", price: 100, value: 100, validity: "30 days" },
    { name: "World Kindness Day", price: 80, value: 80, validity: "Unlimited" },
    {
      name: "International Men’s Day",
      price: 40,
      value: 40,
      validity: "Unlimited",
    },
    { name: "Thanks Giving", price: 100, value: 100, validity: "Unlimited" },
    { name: "Christmas", price: 40, value: 40, validity: "Unlimited" },
    { name: "Valentine’s Day", price: 50, value: 50, validity: "Unlimited" },
    { name: "Mother’s Day", price: 70, value: 70, validity: "Unlimited" },
    { name: "Easter", price: 80, value: 80, validity: "Unlimited" },
  ];

  const categoryList = document.getElementById("category-list");
  const serviceList = document.getElementById("service-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("total-price");
  const bookNowBtn = document.querySelector(".cart button");
  const tabs = document.querySelectorAll(".tabs button");


  
  let cart = [];

  bookNowBtn.style.display = "none";

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerText = category;

    if (category === "Hair Services") {
      li.classList.add("active"); //  Make it active by default
      showServices(category); // Show Hair Services immediately
    }

    li.onclick = () => {
      document
        .querySelectorAll("#category-list li")
        .forEach((item) => item.classList.remove("active"));
      li.classList.add("active");
      showServices(category);
    };

    categoryList.appendChild(li);
  });

  window.showTab = function (tab) {
    tabs.forEach((btn) => btn.classList.remove("active"));
    document
      .querySelector(`button[onclick="showTab('${tab}')"]`)
      .classList.add("active");

    document.querySelector(".categories").style.display = "none";
    serviceList.style.display = "none";
    serviceList.innerHTML = ""; //  Clear out previous content
    document.getElementById("staff-selection").classList.add("hidden");

    if (tab === "services") {
      document.querySelector(".categories").style.display = "block";
      serviceList.style.display = "block";
      showServices(categories[0]);
    } else if (tab === "gift-vouchers") {
      serviceList.style.display = "block";
      showGiftVouchers();
    } else if (tab === "select-staff") {
      document.getElementById("staff-selection").classList.remove("hidden");
    }
  };

  window.lastSelectedRadio = null;

  function showServices(category) {
    const serviceList = document.getElementById("service-list");
    serviceList.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = category;
    heading.style.fontSize = "16px";
    heading.style.marginBottom = "10px";
    heading.style.fontWeight = "600";
    heading.style.borderBottom = "1px solid #eee";
    heading.style.paddingBottom = "5px";
    serviceList.appendChild(heading);

    services[category].forEach((service) => {
      const div = document.createElement("label");
      div.classList.add("service-item");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `service-${category}`;
      input.value = service.name;
      input.dataset.price = service.price;

      // Restore checked state if service is already in cart
      const isSelected = cart.find((item) => item.name === service.name);
      if (isSelected) {
        input.checked = true;
        input._lastClicked = input;
      }

      // Toggle radio like checkbox
      input.onclick = function (e) {
        if (input._lastClicked === input) {
          input.checked = false;
          input._lastClicked = null;
          toggleService(null, service.name); // remove from cart
        } else {
          input._lastClicked = input;
          toggleService(input);
        }
      };

      const details = document.createElement("div");
      details.innerHTML = `
              <strong>${service.name}</strong>
              <small>${service.duration}</small>
          `;

      const price = document.createElement("strong");
      price.textContent = `$${service.price}`;

      div.appendChild(input);
      div.appendChild(details);
      div.appendChild(price);
      serviceList.appendChild(div);
    });
  }

  function showGiftVouchers() {
    serviceList.innerHTML = "";

    giftVouchers.forEach((voucher) => {
      const div = document.createElement("div");
      div.classList.add("service-item");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = voucher.name;
      input.dataset.price = voucher.price;

      const inCart = cart.find((item) => item.name === voucher.name);
      if (inCart) {
        input.checked = true;
      }

      input.onchange = function () {
        toggleVoucher(input);
      };

      const details = document.createElement("div");
      details.innerHTML = `
              <span><strong>${voucher.name}</strong></span>
              <small>Validity: ${voucher.validity} | Voucher Value: $${voucher.value}</small>
          `;

      const price = document.createElement("strong");
      price.textContent = `$${voucher.price}`;

      div.appendChild(input);
      div.appendChild(details);
      div.appendChild(price);

      serviceList.appendChild(div);
    });
  }

  function toggleVoucher(input) {
    const name = input.value;
    const price = parseFloat(input.dataset.price);

    if (input.checked) {
      const exists = cart.find((item) => item.name === name);
      if (!exists) {
        cart.push({ name, price, duration: "Voucher" });
      }
    } else {
      cart = cart.filter((item) => item.name !== name);
    }

    //   console.log("Cart after update:", cart); // Debug
    updateCart();
  }

  window.toggleVoucher = function (checkbox) {
    const name = checkbox.value;
    const price = parseFloat(checkbox.getAttribute("data-price"));

    if (checkbox.checked) {
      cart.push({ name, price });
    } else {
      cart = cart.filter((item) => item.name !== name);
    }
    updateCart();
  };

  // Handle date selection
  const dateScroll = document.getElementById("date-scroll");
  const cartDateEl = document.getElementById("cart-date");
  const staffDateEl = document.getElementById("selected-date-display");

  const weekdayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function renderDatePills(startOffset = 0) {
    dateScroll.innerHTML = "";
    const today = new Date();
    today.setDate(today.getDate() + startOffset);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayNum = String(date.getDate()).padStart(2, "0");
      const dayName = weekdayMap[date.getDay()];
      const month = monthMap[date.getMonth()];
      const year = date.getFullYear();

      const pill = document.createElement("div");
      pill.className = "date-pill";
      pill.innerHTML = `<div>${dayNum}</div><div>${dayName}</div>`;

      pill.addEventListener("click", () => {
        document
          .querySelectorAll(".date-pill")
          .forEach((p) => p.classList.remove("selected"));
        pill.classList.add("selected");

        const formatted = `${dayNum} ${month}, ${year}`;
        if (cartDateEl) cartDateEl.textContent = formatted;
        if (staffDateEl) staffDateEl.textContent = formatted;
      });

      dateScroll.appendChild(pill);
    }
  }

  let currentOffset = 0;

  window.scrollDates = function (direction) {
    currentOffset += direction * 7;
    renderDatePills(currentOffset);
  };

  renderDatePills();

  // Handle time slot selection

  const timeSlots = document.querySelectorAll(".time-slot");
  const cartTime = document.getElementById("cart-time");

  timeSlots.forEach((slot) => {
    slot.addEventListener("click", () => {
      // Remove 'selected' from all time slots
      timeSlots.forEach((s) => s.classList.remove("selected"));
      // Add 'selected' to the clicked one
      slot.classList.add("selected");

      // Update time in cart
      if (cartTime) {
        cartTime.textContent = slot.textContent;
      }
    });
  });

  // Open Modal

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("bookingModal");
    const openBtn = document.getElementById("openBookingBtn");
    const closeBtn = document.getElementById("closeModal");

    if (!modal || !openBtn || !closeBtn) {
      console.error("Modal elements not found.");
      return;
    }

    openBtn.addEventListener("click", function () {
      console.log("Book Now clicked");
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });

  document.querySelector(".close-btn").addEventListener("click", function () {
    document.querySelector(".booking-details-overlay").classList.add("hidden");
  });

  //   validation for confirm booking

  const confirmBookingBtn = document.querySelector(".confirm-booking");
  const bookingSection = document.querySelector(".booking-details-overlay");
  const successOverlay = document.getElementById("booking-success-overlay");
  const closeSuccessBtn = document.querySelector(".close-success-overlay");
  const formAlert = document.getElementById("form-alert");

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Confirm Booking clicked");

      const firstName = document.querySelector(
        'input[placeholder="First name"]'
      );
      const mobile = document.querySelector('input[type="tel"]');
      const paymentSelected = document.querySelector(
        'input[name="payment"]:checked'
      );
      const terms = document.querySelector('.terms input[type="checkbox"]');
      console.log("First Name:", firstName?.value);
      console.log("Mobile:", mobile?.value);
      console.log("Payment Selected:", !!paymentSelected);
      console.log("Terms Accepted:", terms?.checked);

      const isValid =
        firstName &&
        firstName.value.trim() !== "" &&
        mobile &&
        mobile.value.trim() !== "" &&
        paymentSelected &&
        terms &&
        terms.checked;

      if (!isValid) {
        console.log("Validation failed. Showing alert.");
        if (formAlert) {
          formAlert.classList.add("show");
          setTimeout(() => {
            formAlert.classList.remove("show");
          }, 3000);
        } else {
          // console.warn("formAlert element not found.");
        }
        return;
      }

      // If all valid:
      console.log("Validation passed. Showing success overlay.");
      bookingSection.classList.add("hidden");
      successOverlay.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });

      resetBookingWidget(); // Clear everything
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", () => {
      successOverlay.classList.add("hidden");
    });
  }

  function toggleService(input, name) {
    if (!input) {
      // Remove by name
      cart = cart.filter((item) => item.name !== name);
    } else {
      const price = parseFloat(input.dataset.price);
      const item = {
        name: input.value,
        duration:
          services[
            document.querySelector("#category-list li.active").innerText
          ].find((s) => s.name === input.value)?.duration || "30 mins",
        price: price,
      };
      // Remove previous selection if exists
      cart = cart.filter((c) => c.name !== item.name);
      cart.push(item);
    }

    updateCart();
  }

  window.toggleService = function (checkbox) {
    const name = checkbox.value;
    const price = parseFloat(checkbox.getAttribute("data-price"));

    if (checkbox.checked) {
      // Only add if not already in cart
      if (!cart.find((item) => item.name === name)) {
        cart.push({ name, price });
      }
    } else {
      // Remove from cart if unchecked
      cart = cart.filter((item) => item.name !== name);
    }

    updateCart();
  };

  function updateCartSummary(total, count) {
    const summary = document.getElementById("mobile-cart-summary");
    if (summary) {
      summary.textContent = `${count} Item${count !== 1 ? "s" : ""
        } | $${total.toFixed(2)}`;
    }
  }

  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("total-price");
    const bookNowBtnMobile = document.getElementById("book-now");
    const bookNowBtnDesktop = document.getElementById("book-now-desktop");
    const cartEmpty = document.getElementById("cart-empty");
    const itemCount = document.getElementById("item-count");
    const cartSummary = document.getElementById("cart-summary");
    const mobileSummaryText = document.getElementById("mobileSummaryText");

    const isMobile = window.innerWidth <= 480;

    if (!cart || cart.length === 0) {
      // Cart is empty
      cartItems.innerHTML = "";
      cartEmpty.style.display = isMobile ? "none" : "block";
      cartSummary.style.display = "none";
      itemCount.style.display = "none";

      if (bookNowBtnMobile) bookNowBtnMobile.style.display = "none";
      if (bookNowBtnDesktop) bookNowBtnDesktop.style.display = "none";

      if (mobileSummaryText) {
        mobileSummaryText.textContent = "0 Items | $0.00";
      }
    } else {
      // Cart has items
      cartItems.innerHTML = cart
        .map(
          (item) => `
      <div class="cart-service cart-details-desktop">
        <div class="cart-line">
          <span class="cart-service-name">${item.name}</span>
          <span class="cart-service-price">$${item.price}</span>
        </div>
        <div class="cart-service-duration">${item.duration || "30 mins"}</div>
      </div>
    `
        )
        .join("");

      const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
      cartTotal.textContent = subtotal.toFixed(2);
      itemCount.textContent = `${cart.length} Item${cart.length > 1 ? "s" : ""
        }`;

      if (!isMobile) {
        cartSummary.style.display = "block";
        itemCount.style.display = "inline";
        if (bookNowBtnDesktop) bookNowBtnDesktop.style.display = "block";
        if (bookNowBtnMobile) bookNowBtnMobile.style.display = "none";
      } else {
        cartSummary.style.display = "none";
        itemCount.style.display = "none";
        if (bookNowBtnMobile) bookNowBtnMobile.style.display = "block";
        if (bookNowBtnDesktop) bookNowBtnDesktop.style.display = "none";
      }

      cartEmpty.style.display = "none";

      if (mobileSummaryText) {
        mobileSummaryText.textContent = `${cart.length} Item${cart.length > 1 ? "s" : ""
          } | $${subtotal.toFixed(2)}`;
      }
    }
  }

  document
    .querySelectorAll('.service-options input[type="radio"]')
    .forEach((input) => {
      input.addEventListener("change", updateCartSummary);
    });

  function resetBookingWidget() {
    // Clear cart
    cart = [];

    // Clear cart UI
    cartItems.innerHTML = "";
    cartTotal.innerText = "0";
    cartTotal.parentElement.style.display = "none";
    bookNowBtn.style.display = "none";

    // Show "Your cart is empty" message
    const emptyCartMessage = document.getElementById("cart-empty");
    if (emptyCartMessage) {
      emptyCartMessage.style.display = "block";
    }

    // Clear cart item count
    const itemCount = document.getElementById("item-count");
    if (itemCount) {
      // itemCount.textContent = "(0 Items)";
      itemCount.textContent = "Your Cart is Empty";
    }

    // Clear date and time from cart
    const cartDate = document.getElementById("cart-date");
    const cartTime = document.getElementById("cart-time");
    if (cartDate) cartDate.textContent = "";
    if (cartTime) cartTime.textContent = "";
    // }

    const cartSummary = document.getElementById("cart-summary");
    if (cartSummary) {
      cartSummary.style.display = "none";
    }

    // Reset staff selection
    const staffInputs = document.querySelectorAll('input[name="staff"]');
    staffInputs.forEach((input) => (input.checked = false));
    const noPref = document.querySelector(
      'input[name="staff"][value="no-preference"]'
    );
    if (noPref) noPref.checked = true;

    // Reset date selection
    document
      .querySelectorAll(".date-pill.selected")
      .forEach((pill) => pill.classList.remove("selected"));

    // Reset time slot selection
    document
      .querySelectorAll(".time-slot.selected")
      .forEach((slot) => slot.classList.remove("selected"));

    // Clear entered booking details
    document
      .querySelectorAll(
        '.booking-details-overlay input[type="text"], .booking-details-overlay input[type="email"], .booking-details-overlay input[type="tel"], .booking-details-overlay input[type="date"]'
      )
      .forEach((input) => {
        input.value = "";
      });

    // Uncheck selected services and vouchers
    document
      .querySelectorAll('#service-list input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const mobileBookBtn = document.getElementById("mobile-book-now");
    const desktopBookBtn = document.getElementById("book-now");

    if (mobileBookBtn && desktopBookBtn) {
      mobileBookBtn.addEventListener("click", function () {
        desktopBookBtn.click();
      });
    }
  });


  function showMobileSummaryModal() {
    const modal = document.querySelector(".mobile-booking-summary-modal");
    const mobileCartSummary = document.getElementById("mobile-cart-summary");
    if (!modal) return;

    // Hide mobile cart summary properly
    mobileCartSummary.classList.add("hidden");
    document.querySelector(".cart-line").style.display = "none";

    const servicesContainer = document.getElementById("summary-services-list");
    servicesContainer.innerHTML = "";

    const staff = document.querySelector('input[name="staff"]:checked')?.value || "No preference";
    const date = document.querySelector(".date-pill.selected")?.textContent || "";
    const time = document.querySelector(".time-slot.selected")?.textContent || "";
    const total = document.getElementById("total-price").textContent;

    const serviceItems = cart.filter(item => item.duration !== "Voucher");

    serviceItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "summary-service-item";
      div.innerHTML = `
      <div class="service-info">
        <div>
          <div class="service-name">${item.name}</div>
          <div class="service-staff">Staff: ${staff}</div>
        </div>
      </div>
      <button class="delete-service" aria-label="Delete service" data-index="${index}">
        <div class="service-price"><strong>$${item.price}</strong></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm2 2h2v1h-2V5zm5 3v11H8V8h8z"/>
        </svg>
      </button>
    `;
      servicesContainer.appendChild(div);
    });

    document.getElementById("summary-date").textContent = date;
    document.getElementById("summary-time").textContent = time;
    document.getElementById("summary-total").textContent = total;

    modal.classList.remove("hidden");
  }

  function hideMobileSummaryModal() {
    document.querySelector(".mobile-booking-summary-modal").classList.add("hidden");
    document.getElementById("mobile-cart-summary").classList.remove("hidden");
    document.querySelector(".cart-line").style.display = "block";
  }

  document.querySelector(".back-summary-modal").addEventListener("click", hideMobileSummaryModal);

  document.querySelectorAll(".edit-icon").forEach(btn => {
    btn.addEventListener("click", hideMobileSummaryModal);
  });


  // Proceed button triggers overlay
  document.getElementById("proceed-to-form").addEventListener("click", () => {
    document.querySelector(".mobile-booking-summary-modal").classList.add("hidden");
    const overlay = document.querySelector(".booking-details-overlay");
    if (overlay) {
      overlay.classList.remove("hidden");
    }
  });

  // Handle delete service from modal
  // document.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("delete-service")) {
  //     const index = parseInt(e.target.getAttribute("data-index"));
  //     const nonVoucherItems = cart.filter(item => item.duration !== "Voucher");
  //     const itemToRemove = nonVoucherItems[index];
  //     const realIndex = cart.findIndex(item => item.name === itemToRemove.name && item.duration !== "Voucher");
  //     if (realIndex > -1) {
  //       cart.splice(realIndex, 1);
  //       updateCart();
  //       showMobileSummaryModal(); // Re-render modal
  //     }
  //   }

  //   if (e.target.id === "add-service-link") {
  //     document.querySelector(".mobile-booking-summary-modal").classList.add("hidden");

  //     // Show the mobile cart again
  //     const mobileCartSummary = document.getElementById("mobile-cart-summary");
  //     if (mobileCartSummary) mobileCartSummary.classList.remove("hidden");

  //     const cartLine = document.querySelector(".cart-line");
  //     if (cartLine) cartLine.style.display = "block";

  //     const serviceTab = document.querySelector("#services-tab-content");
  //     if (serviceTab) {
  //       serviceTab.scrollIntoView({ behavior: "smooth" });
  //     } else {
  //       console.log("#services-tab-content not found");
  //     }
  //   }

  // });

  document.addEventListener("click", (e) => {
    // Handle delete-service button click, even if SVG/path is clicked
    const deleteBtn = e.target.closest(".delete-service");
    if (deleteBtn) {
      const index = parseInt(deleteBtn.getAttribute("data-index"));
      const nonVoucherItems = cart.filter(item => item.duration !== "Voucher");
      const itemToRemove = nonVoucherItems[index];
      const realIndex = cart.findIndex(item => item.name === itemToRemove.name && item.duration !== "Voucher");
  
      if (realIndex > -1) {
        cart.splice(realIndex, 1);
        updateCart();
        showMobileSummaryModal(); // Re-render modal
      }
      return;
    }
  
    // Handle "Add service" button click
    if (e.target.id === "add-service-link") {
      document.querySelector(".mobile-booking-summary-modal").classList.add("hidden");
  
      // Show the mobile cart again
      const mobileCartSummary = document.getElementById("mobile-cart-summary");
      if (mobileCartSummary) mobileCartSummary.classList.remove("hidden");
  
      const cartLine = document.querySelector(".cart-line");
      if (cartLine) cartLine.style.display = "block";
  
      const serviceTab = document.querySelector("#services-tab-content");
      if (serviceTab) {
        serviceTab.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("#services-tab-content not found");
      }
    }
  });

  
  // book now validation

  function validateBooking(e) {
    e.preventDefault();
    console.log("📦 Book Now clicked");

    const alertService = document.getElementById("service-alert");
    const alertDatetime = document.getElementById("datetime-alert");

    const selectedDate = document.querySelector(".date-pill.selected");
    const selectedTime = document.querySelector(".time-slot.selected");

    const hasService =
      cart.length > 0 && cart.some((item) => item.duration !== "Voucher");

    // console.log("🛒 Cart:", cart);
    // console.log("✅ Has valid service?", hasService);
    // console.log("📅 Selected date:", selectedDate);
    // console.log("⏰ Selected time:", selectedTime);

    // Hide alerts first
    if (alertService) {
      alertService.classList.add("hidden");
      alertService.classList.remove("show");
    }
    if (alertDatetime) {
      alertDatetime.classList.add("hidden");
      alertDatetime.classList.remove("show");
    }

    let hasError = false;

    // 🔍 First: check for services
    if (!hasService) {
      // console.warn("⚠️ No service selected");
      if (alertService) {
        alertService.classList.remove("hidden");
        alertService.classList.add("show");
        setTimeout(() => {
          alertService.classList.remove("show");
          alertService.classList.add("hidden");
        }, 3000);
      }
      hasError = true;
    }

    // 🔍 Then: check for date/time
    if (!selectedDate || !selectedTime) {

      if (alertDatetime) {
        alertDatetime.classList.remove("hidden");
        alertDatetime.classList.add("show");
        setTimeout(() => {
          alertDatetime.classList.remove("show");
          alertDatetime.classList.add("hidden");
        }, 3000);
      }
      hasError = true;
    }


    if (hasError) return;

    // Only for mobile screen
    if (window.innerWidth <= 768) {
      showMobileSummaryModal();
      return;
    }

    // Otherwise proceed directly to booking form (desktop)
    const overlay = document.querySelector(".booking-details-overlay");
    if (overlay) {
      overlay.classList.remove("hidden");
    }

    else {
      console.error("❌ Booking overlay not found");
    }
  }

  const mobileBtn = document.getElementById("book-now");
  const desktopBtn = document.getElementById("book-now-desktop");

  if (mobileBtn) {
    console.log("✅ Mobile Book Now found");
    mobileBtn.addEventListener("click", validateBooking);
  } else {
    // console.log("❌ Mobile Book Now NOT found");
  }

  if (desktopBtn) {
    console.log("✅ Desktop Book Now found");
    desktopBtn.addEventListener("click", validateBooking);
  } else {
    // console.log("❌ Desktop Book Now NOT found");
  }
});



