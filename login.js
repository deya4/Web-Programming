/**
 * Name: Deya Gonzalez
 * Date: December 7, 2023
 * Section: CSE 154 AE
 * The file, login.js, is responsible for managing the login functionality. It verifies user input
 * credentials and, if correct, initiates a login. In case of incorrect user input, it displays a
 * message on the page.
 */

'use strict';
(function() {

  window.addEventListener("load", init);

  /**
   * Initializes the user interface for login, attempting to pre-fill the email input field
   * with a saved email from local storage. Displays an error message if there is an issue
   * retrieving the saved email.
   */
  function init() {
    saveEmail();
    id('login-btn').addEventListener('click', confirmLogin);
  }

  /**
   * Retrieves a saved email from the local storage and populates
   * the 'log-email' input field if a saved email is found.
   *
   * @function
   * @name saveEmail
   * @throws {Error} If there is an issue accessing the local storage.
   * @returns {void}
   */
  function saveEmail() {
    try {
      const savedEmail = localStorage.getItem('email');
      if (savedEmail) {
        id('log-email').value = savedEmail;
      }
    } catch (err) {
      displayMessage('error', err);
    }
  }

  /**
   * Send user credentials to server for authentication
   * @param {Event} event - The form submit event
   */
  function confirmLogin(event) {
    event.preventDefault();
    const email = id('log-email').value;
    const password = id('log-password').value;
    id('log-email').value = '';
    id('log-password').value = '';
    const data = {email, password};
    fetchLoginInfo(data);
  }

  /**
   * Sends a POST request to the server for user authentication.
   * @param {Object} data - User credentials for authentication.
   * @param {string} data.email - User's email address.
   * @param {string} data.password - User's password.
   * @throws {Error} If the server response is not successful or user enters invalid credentials.
   */
  function fetchLoginInfo(data) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => statusCheck(response))
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          successfulLogin(data.email);
          localStorage.setItem('email', data.email);
          id('error').textContent = result.message;
        } else {
          displayMessage('error', result.message);
        }
      })
      .catch(error => {
        displayMessage('error', error.message);
      });
  }

  /**
   * Take user to enrollment page if login is succesful
   */
  function successfulLogin() {
    window.location.href = "enrollment.html";
  }

  /**
   * Displays a message in response to invalid user credentials or when an error occurs.
   *
   * @param {string} error - The ID of the HTML element where the message will be displayed.
   * @param {string} message - The message to be displayed.
   * @returns {void}
   */
  function displayMessage(error, message) {
    const errorElement = id(error);
    errorElement.textContent = message;
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
   * Checks the status code of the fetched endpoint
   * @param {Promise} response - response Object from the endpoint
   * @return {Promise} - response Object from the endpoint
   * @throws API error if the the status code is 400 or 500 level, or not ok
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }
})();