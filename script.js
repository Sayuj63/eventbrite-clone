document.addEventListener('DOMContentLoaded', function() {
  // Location dropdown functionality
  const locationTrigger = document.querySelector('.location-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const locationName = document.querySelector('.location-name');

  // Toggle dropdown on click
  locationTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isOpen ? 'none' : 'block';
    
    // Rotate the chevron icon
    const icon = locationTrigger.querySelector('i');
    if (isOpen) {
      icon.style.transform = 'rotate(0deg)';
    } else {
      icon.style.transform = 'rotate(180deg)';
    }
  });

  // Handle click on dropdown items
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.textContent.includes('current location')) {
        // In a real app, we would get the user's current location here
        locationName.textContent = 'Current Location';
      } else if (item.textContent.includes('online events')) {
        window.location.href = '/online-events';
      }
      dropdownMenu.style.display = 'none';
      locationTrigger.querySelector('i').style.transform = 'rotate(0deg)';
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
    const icon = locationTrigger.querySelector('i');
    icon.style.transform = 'rotate(0deg)';
  });

  // Prevent dropdown from closing when clicking inside it
  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });


  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;
  let slideInterval;
  const slideTime = 5000; // 5 seconds

  // Initialize the slideshow
  function initSlideshow() {
    showSlide(currentSlide);
    startSlideShow();
  }

  // Show a specific slide
  function showSlide(index) {
    // Hide all slides and deactivate dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show the current slide and activate corresponding dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  // Go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Go to previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Start the automatic slideshow
  function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideTime);
  }

  // Events Section Horizontal Scroll
  const eventsScroll = document.querySelector('.events-scroll');
  const scrollLeftBtn = document.querySelector('.scroll-btn.left');
  const scrollRightBtn = document.querySelector('.scroll-btn.right');
  const eventCards = document.querySelectorAll('.event-card');
  const cardWidth = eventCards[0].offsetWidth + 20; // Width + gap
  
  // Scroll left function
  scrollLeftBtn.addEventListener('click', () => {
    eventsScroll.scrollBy({
      left: -cardWidth * 2, // Scroll by 2 cards
      behavior: 'smooth'
    });
  });
  
  // Scroll right function
  scrollRightBtn.addEventListener('click', () => {
    eventsScroll.scrollBy({
      left: cardWidth * 2, // Scroll by 2 cards
      behavior: 'smooth'
    });
  });
  
  // Show/hide scroll buttons based on scroll position
  const updateScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = eventsScroll;
    
    // Show/hide left button
    if (scrollLeft > 10) {
      scrollLeftBtn.style.display = 'flex';
    } else {
      scrollLeftBtn.style.display = 'none';
    }
    
    // Show/hide right button
    if (scrollLeft < scrollWidth - clientWidth - 10) {
      scrollRightBtn.style.display = 'flex';
    } else {
      scrollRightBtn.style.display = 'none';
    }
  };
  
  // Initial check
  updateScrollButtons();
  
  // Update buttons on scroll
  eventsScroll.addEventListener('scroll', updateScrollButtons);
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateScrollButtons, 250);
  });

  // Initialize Popular Cities Carousel
  const citiesData = [
    { name: 'New York', image: 'assets/ny--new-york.webp' },
    { name: 'Los Angeles', image: 'assets/ca--los-angeles.webp' },
    { name: 'San Francisco', image: 'assets/ca--san-francisco.webp' },
    { name: 'Washington', image: 'assets/dc--washington.webp' },
    { name: 'Miami', image: 'assets/fl--miami.webp' },
    { name: 'Orlando', image: 'assets/fl--orlando.webp' },
    { name: 'Atlanta', image: 'assets/ga--atlanta.webp' },
    { name: 'Boston', image: 'assets/ma--boston.webp' },
    { name: 'Charlotte', image: 'assets/nc--charlotte.webp' },
    { name: 'Las Vegas', image: 'assets/nv--las-vegas.webp' },
    { name: 'Philadelphia', image: 'assets/pa--philadelphia.webp' },
    { name: 'San Diego', image: 'assets/ca--san-diego.webp' }
  ];

  const citiesScroll = document.querySelector('.cities-scroll');
  const cityScrollLeftBtn = document.querySelector('.popular-cities .scroll-btn.left');
  const cityScrollRightBtn = document.querySelector('.popular-cities .scroll-btn.right');
  
  // Generate city cards
  citiesData.forEach(city => {
    const cityCard = document.createElement('div');
    cityCard.className = 'city-card';
    cityCard.innerHTML = `
      <div class="city-image" style="background-image: url('${city.image}')">
        <div class="city-overlay">
          <h3 class="city-name">${city.name}</h3>
        </div>
      </div>
      <div class="city-highlight-container">
        <div class="city-highlight"></div>
      </div>
    `;
    citiesScroll.appendChild(cityCard);
  });

  // Calculate scroll amount (width of 2.5 cards)
  const cityCardWidth = document.querySelector('.city-card').offsetWidth;
  const scrollAmount = cityCardWidth * 2.5 + 20; // 2.5 cards + gap

  // Scroll left function
  cityScrollLeftBtn.addEventListener('click', () => {
    citiesScroll.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // Scroll right function
  cityScrollRightBtn.addEventListener('click', () => {
    citiesScroll.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Show/hide scroll buttons based on scroll position
  const updateCityScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = citiesScroll;
    
    // Show/hide left button
    if (scrollLeft > 10) {
      cityScrollLeftBtn.style.display = 'flex';
    } else {
      cityScrollLeftBtn.style.display = 'none';
    }
    
    // Show/hide right button
    if (scrollLeft < scrollWidth - clientWidth - 10) {
      cityScrollRightBtn.style.display = 'flex';
    } else {
      cityScrollRightBtn.style.display = 'none';
    }
  };

  // Initial check
  updateCityScrollButtons();
  
  // Update buttons on scroll
  citiesScroll.addEventListener('scroll', updateCityScrollButtons);
  
  // Handle window resize
  let cityResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(cityResizeTimer);
    cityResizeTimer = setTimeout(updateCityScrollButtons, 250);
  });

  // Generate More Events
  const eventsData = [
    {
      title: "Level Up Sync Con 2025 | August 2-3",
      location: "Virtual",
      price: "$100.00",
      followers: "131",
      badges: ["Promoted"]
    },
    {
      title: "IICSR Sustainability Dialogues Mumbai",
      location: "Grounded Cafe",
      price: "$5.00",
      followers: "166",
      badges: []
    },
    {
      title: "Work in Europe / Sweden – Jobs, Talent Visa and EU Blue Card",
      location: "Radisson Blu",
      price: "€39.00",
      followers: "1.7k",
      badges: ["Sales end soon"]
    },
    {
      title: "BLL Sprint Connect",
      location: "ITM Institute",
      price: "$618.61",
      followers: "208",
      badges: ["Sales end soon"]
    },
    {
      title: "Work in Sweden - Jobs, Employers, Work Visa (MUM)",
      location: "Regus Mumbai",
      price: "€39.00",
      followers: "8.6k",
      badges: ["Sales end soon"]
    },
    {
      title: "Drink Pub Meetup Mumbai",
      location: "R Adda",
      price: "$0.00",
      followers: "1.3k",
      badges: ["Just added"]
    },
    {
      title: "AI Implementation in Business | Mumbai",
      location: "Mumbai",
      price: "$499.00",
      followers: "45",
      badges: []
    },
    {
      title: "Job Fair (Virtual)",
      location: "Virtual Event [Online Only]",
      price: "$0.00",
      followers: "10.3k",
      badges: ["#FirstFridayFair"]
    },
    {
      title: "GRC, Data Privacy & Cyber Security ConfEx | Mumbai",
      location: "Radisson Blu Mumbai International Airport",
      price: "$420.00",
      followers: "1k",
      badges: ["Sales end soon"]
    },
    {
      title: "100 Cities Project: Fighting Loneliness | Dinner with Strangers",
      location: "Mumbai Central",
      price: "$23.18",
      followers: "954",
      badges: ["Sales end soon"]
    },
    {
      title: "Mumbai's Big Business, Tech & Entrepreneur Professional Meetup",
      location: "Grand Hyatt Mumbai Hotel & Residences",
      price: "$0.00",
      followers: "",
      badges: []
    },
    {
      title: "Coffee Meetup Mumbai",
      location: "Bake House Cafe",
      price: "$0.00",
      followers: "1.3k",
      badges: []
    },
    {
      title: "Leveraging Robotics for Success | Mumbai",
      location: "Mumbai",
      price: "$499.00",
      followers: "45",
      badges: []
    },
    {
      title: "Harnessing AI for Marketing Innovation | Mumbai",
      location: "Mumbai",
      price: "$499.00",
      followers: "45",
      badges: []
    },
    {
      title: "Your Employer Benefits: Taking Charge of Your Future",
      location: "—",
      price: "Free",
      followers: "",
      badges: ["Promoted"]
    },
    {
      title: "Q&A with Dr. Hala: Get your AI Answers",
      location: "—",
      price: "$2.50",
      followers: "",
      badges: ["Promoted", "2 for 1 deal"]
    }
  ];

  const eventsGrid = document.querySelector('.more-events .events-grid');
  
  // Clear any existing content
  eventsGrid.innerHTML = '';
  
  
  
  // Helper function to generate random dates
  function getRandomDate() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = days[Math.floor(Math.random() * 7)];
    const date = Math.floor(Math.random() * 28) + 1;
    const month = months[Math.floor(Math.random() * 12)];
    let hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.random() > 0.5 ? '00' : '30';
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    
    // Ensure hour is two digits
    hour = hour < 10 ? '0' + hour : hour;
    
    return `${day}, ${month} ${date} • ${hour}:${minute} ${ampm}`;
  }

  // Pause the slideshow when hovering over it
  const slideshow = document.querySelector('.hero-slideshow');
  slideshow.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  // Resume the slideshow when mouse leaves
  slideshow.addEventListener('mouseleave', startSlideShow);

  // Event listeners for navigation buttons
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startSlideShow(); // Reset timer on manual navigation
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startSlideShow(); // Reset timer on manual navigation
  });

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startSlideShow(); // Reset timer on dot click
    });
  });

  // Initialize the slideshow
  initSlideshow();

  // Category selection functionality
  const categoryItems = document.querySelectorAll('.category-item');
  
  categoryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // e.preventDefault();
      // Remove active class from all items
      categoryItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      
      // In a real application, you would navigate to the category page here
      // For example: window.location.href = item.getAttribute('href');
    });
  });
});
// Find where you're creating the event cards (around line 359)
eventsData.forEach(event => {
  // Create anchor element instead of div
  const eventLink = document.createElement('a');
  eventLink.href = `checkoutpage.html?title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}&location=${encodeURIComponent(event.location)}&price=${event.price}&image=${encodeURIComponent(event.image)}&followers=${encodeURIComponent(event.followers)}`;
  eventLink.className = 'event-card-link';
  eventLink.style.textDecoration = 'none';
  eventLink.style.color = 'inherit';
  
  const eventCard = document.createElement('div');
  eventCard.className = 'event-card';
  
  // Rest of your existing card creation code...
  // Make sure to append everything to eventLink instead of directly to the grid
  // For example:
  eventLink.appendChild(eventCard);
  
  // Then append the eventLink to your grid
  const eventsGrid = document.querySelector('.events-grid');
  if (eventsGrid) {
      eventsGrid.appendChild(eventLink);
  }
});
// For the "More events" section
const moreEventsGrid = document.querySelector('.more-events .events-grid');
if (moreEventsGrid) {
    eventsData.forEach(event => {
        const eventLink = document.createElement('a');
        eventLink.href = `checkoutpage.html?title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}&location=${encodeURIComponent(event.location)}&price=${event.price}&image=${encodeURIComponent(event.image)}&followers=${encodeURIComponent(event.followers)}`;
        eventLink.className = 'event-card-link';
        eventLink.style.textDecoration = 'none';
        eventLink.style.color = 'inherit';
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        // Add your existing card content here
        // ...
        
        eventLink.appendChild(eventCard);
        moreEventsGrid.appendChild(eventLink);
    });
}
const eventsData = [
  {
      title: "Event Title",
      date: "Day, Month DD · HH:MM AM/PM",
      location: "Venue Name",
      price: 0.00,  // Just the number, no currency symbol
      image: "path/to/image.jpg",
      followers: "X.Xk followers"
  },
  // ... more events
];