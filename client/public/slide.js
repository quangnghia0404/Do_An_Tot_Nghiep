$(function() {
    // new WOW().init();
    $(window).scroll(function() {
        var vitri = $("html").scrollTop();
        if (vitri >= 180) {
            $(".logo-menu").addClass("scrollFunction");
        } else if (vitri < 180) {
            $(".logo-menu.scrollFunction").removeClass("scrollFunction");
        }
    });

    $(document).ready(function() {
        $("#testimonial-slider").owlCarousel({
            items: 3,
            itemsDesktop: [1000, 3],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [768, 2],
            itemsMobile: [650, 1],
            pagination: true,
            autoPlay: true,
        });
    });
});

// window.addEventListener('scroll', function () {
//     this.console.log(this.window.pageYOffset)
// })

const months = [
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
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".timer");
const items = document.querySelectorAll(".deadline-format h4");

// console.log(items);
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth() + 1;
let tempDay = tempDate.getDate();

// let futureDate = new Date(2021, 4, 7, 11, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + -15, 12, 10, 8);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60min
    // 1day = 24hr

    // values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // caculate all values
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    // set values arayy
    const values = [days, hours, minutes, seconds];

    function format(item) {
        if (item < 10) {
            return (item = `0${item}`);
        }
        return item;
    }

    items.forEach(function(item, index) {
        item.innerHTML = format(values[index]);
    });
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
    }
}
// countdown
let countdown = setInterval(getRemainingTime, 1000);

// $("#search-icon").click(function() {
//     $(".nav").toggleClass("search");
//     $(".nav").toggleClass("no-search");
//     $(".search-input").toggleClass("search-active");
// });

// $(".menu-toggle").click(function() {
//     $(".nav").toggleClass("mobile-nav");
//     $(this).toggleClass("is-active");
// });
// console.log("acb");