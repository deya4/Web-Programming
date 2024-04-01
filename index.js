/**
 * Name: Deya Gonzalez
 * Date: December 7, 2023
 * Section: CSE 154 AE
 *
 * Overview:
 * This script initializes the application by setting up event listeners for navigation buttons.
 * It includes functions to navigate to specific pages within the 'public' folder based on user
 * actions.
 *
 * Usage:
 * - Ensure 'strict mode' is active for enhanced code quality.
 * - The 'init' function is invoked on the 'load' event, setting up event listeners.
 * - Clicking navigation buttons triggers the 'navigateTo' function, redirecting to the
 * corresponding page.
 */

'use strict';
(function() {

  window.addEventListener("load", init);

  /**
   * Initializes the application by setting up event listeners for navigation
   * buttons.
   */
  function init() {
    const homeButton = document.getElementById('home-button');
    const instructionsButton = document.getElementById('instructions-button');
    const logInButton = document.getElementById('log-in-button');

    homeButton.addEventListener('click', () => navigateTo('home'));
    instructionsButton.addEventListener('click', () => navigateTo('how-to-register'));
    logInButton.addEventListener('click', () => navigateTo('log-in'));
  }

  /**
   * Navigate to a specific page within the 'public' folder.
   *
   * @param {string} page - The name of the page to navigate to (excluding file extension).
   * @returns {void}
   */
  function navigateTo(page) {
    if (page === 'home') {
      window.location.href = "index.html";
    } else if (page === 'how-to-register') {
      window.location.href = "how.html";
    } else {
      window.location.href = "login.html";
    }
  }
})();