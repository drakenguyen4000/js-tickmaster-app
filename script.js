const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update total and count
function updateSelectedCount() {
  //Get list of all element with selected attributed
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //Create list of seats selected
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  //Count the number of selected seats
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  //Make total text display the total price of all ticket seats selected.
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    //Set the movie option to display what's stored in local storage.
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie selected event Listener
movieSelect.addEventListener("change", (e) => {
  //Update movie ticket price when user selects different movie
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

//add an eventListener to every child element of the container
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});


//Initial Count and total set
updateSelectedCount();