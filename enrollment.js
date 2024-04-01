/**
 * Name: Deya Gonzalez
 * Date: December 7, 2023
 * Section: CSE 154 AE
 * The file, enrollment.js, is responsible for handling the user interface functionality for class
 * enrollment on the Binary Hub Learning platform. This script initializes the application, fetches
 * and displays classes based on user input, and provides functions for handling class details,
 * clearing filters, and error handling.
 */

'use strict';

(function() {

  window.addEventListener("load", init);

  /**
   * Initializes the application by setting up event listeners for navigation buttons.
   * - Listens for click events on the "Search" button and the "Clear Filters" button,
   *   triggering the fetchClasses or clearFilters functions accordingly.
   * - Listens for "Enter" key events in the search input, triggering the fetchClasses function.
   * - Listens for click events on the "Toggle View" button, toggling between list and grid views.
   *
   * @function
   * @name init
   * @returns {void}
   */
  function init() {

    id('search-btn').addEventListener('click', function() {
      fetchClasses();
    });

    id("search-input").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        fetchClasses();
      }
    });

    id('clear-filters-btn').addEventListener('click', function() {
      clearFilters();
    });

    id('toggle-view-btn').addEventListener('click', function() {
      let classesBox = id('classes-box');
      classesBox.classList.toggle('list');
      classesBox.classList.toggle('grid');
    });
  }

  /**
   * Gets the values of the searched items and populates
   * the page with the classes that meet the selected criteria.
   * Fetches using the given value entered in the search bar, meeting days and times,
   * and the selected category from the dropdown menu 'Filter Classes by Category'.
   *
   * @function
   * @name fetchClasses
   * @returns {void}
   */
  function fetchClasses() {
    let classMeetingDaysInput = qs('input[name="day"]:checked');
    let classMeetingTimesInput = qs('input[name="time"]:checked');
    let classMeetingDays, classMeetingTimes;

    if (classMeetingDaysInput) {
      classMeetingDays = classMeetingDaysInput.value;
    }

    if (classMeetingTimesInput) {
      classMeetingTimes = classMeetingTimesInput.value;
    }

    let search = id("search-input").value.trim();

    if ((classMeetingDays || classMeetingTimes) || search) {
      let fetchLink = `/classeslist?${classMeetingDays ? "classMeetingDays=" +
        classMeetingDays : ""}${classMeetingTimes ? "&classMeetingTimes=" +
        classMeetingTimes : ""}${search ? "&search=" + encodeURIComponent(search) : ""}`;

      fetch(fetchLink)
        .then(statusCheck)
        .then(res => res.json())
        .then(displayClasses)
        .catch(handleError);
    }
  }

  /**
   * Displays classes on the webpage based on the provided JSON array.
   *
   * @param {Array} classesJson - The JSON array containing class information.
   * @returns {void}
   */
  function displayClasses(classesJson) {
    let classesContainer = id("classes-box");
    classesContainer.innerHTML = '';

    // Iterate through each class and create an element for it
    classesJson.forEach(classInfo => {
      let classText = document.createTextNode(`${classInfo.subject}`);
      const classElement = document.createElement('div');
      classElement.classList.add('class-item');
      classElement.setAttribute('data-item-id', classInfo.id);
      classElement.appendChild(classText);
      classesContainer.appendChild(classElement);

      // Adds click event listener to fetch detailed information when the class is clicked
      classElement.addEventListener('click', function() {
        fetchClassDetails(
          classInfo.id,
          classInfo.subject,
          classInfo.instructionMode,
          classInfo.classMeetingDays,
          classInfo.classMeetingTimes,
          classInfo.categoryId
        );
      });
    });
  }

  /**
   * Fetch detailed information about a class from the server and display it.
   *
   * @param {string} id - The ID of the class.
   * @param {string} subject - The subject of the class.
   * @param {string} instructionMode - The instruction mode of the class.
   * @param {string} classMeetingDays - The meeting days of the class.
   * @param {string} classMeetingTimes - The meeting times of the class.
   * @param {string} categoryId - The category ID of the class.
   * @returns {void}
   */
  function fetchClassDetails(
    id,
    subject,
    instructionMode,
    classMeetingDays,
    classMeetingTimes
  ) {
    fetch(`/item-details/${id}`)
      .then(statusCheck)
      .then(response => response.json())
      .then(itemDetails => {
        displayItemDetails(
          itemDetails.categoryId,
          subject,
          instructionMode,
          classMeetingDays,
          classMeetingTimes
        );
      })
      .catch(handleError);
  }

  /**
   * Display detailed information about a class in the specified container.
   *
   * @param {Object} categoryId - The category ID of the class.
   * @param {string} subject - The subject of the class.
   * @param {string} instructionMode - The instruction mode of the class.
   * @param {string} classMeetingDays - The meeting days of the class.
   * @param {string} classMeetingTimes - The meeting times of the class.
   * @returns {void}
   */
  function displayItemDetails(
    categoryId,
    subject,
    instructionMode,
    classMeetingDays,
    classMeetingTimes
  ) {
    const detailsContainer = id('item-details-container');

    // Clear existing content
    detailsContainer.textContent = '';

    const h2 = document.createElement('h2');
    h2.textContent = subject;

    const instructionModeParagraph = document.createElement('p');
    instructionModeParagraph.textContent = `Instruction Mode: ${instructionMode}`;

    const meetingDaysParagraph = document.createElement('p');
    meetingDaysParagraph.textContent = `Meeting Days: ${classMeetingDays}`;

    const meetingTimesParagraph = document.createElement('p');
    meetingTimesParagraph.textContent = `Meeting Times: ${classMeetingTimes}`;

    const categoryIdParagraph = document.createElement('p');
    categoryIdParagraph.textContent = `Category ID: ${categoryId}`;

    detailsContainer.appendChild(h2);
    detailsContainer.appendChild(instructionModeParagraph);
    detailsContainer.appendChild(meetingDaysParagraph);
    detailsContainer.appendChild(meetingTimesParagraph);
    detailsContainer.appendChild(categoryIdParagraph);
  }

  /**
   * Clears filters by unchecking radio buttons and clearing the search input.
   * After clearing filters, it fetches classes without any applied filters.
   * @function
   * @name clearFilters
   * @returns {void}
   */
  function clearFilters() {
    // Uncheck radio buttons
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
      radio.checked = false;
    });

    id('search-input').value = '';
    id('classes-box').innerHTML = '';
    fetchClasses();
  }

  /**
   * Handles errors that may occur during the fetch operation.
   *
   * @param {Error} error - The error object received from the fetch operation.
   * @returns {void}
   */
  function handleError(error) {
    let errorMessage = document.createElement("p");
    errorMessage.textContent = error;
    qs("main").append(errorMessage);
  }

  /**
   * Finds the element with the specified ID attribute.
   *
   * @param {string} id - element ID
   * @returns {HTMLElement} HTML element associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Finds the element with the specified selector
   *
   * @param {String} selector - css selector
   * @returns {HTMLElement} HTML element associated with the selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Checks the status code of the fetched endpoint
   * @param {Promise} response - response Object from the endpoint
   * @return {Promise} - response Object from the endpoint
   * @throws API error if the status code is 400 or 500 level, or not ok
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }
})();