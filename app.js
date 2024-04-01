/*
 * Name: Deyanira Gonzalez
 * Date: December 7, 2023
 * Section: AE T - Th 1:30 - 2:20 PM
 * TA: Allison Ho
 *
 */

'use strict';

const express = require("express");
const app = express();
const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const SERVER_ERROR = 500;
const INVALID_REQ = 400;
const VALID_REQ = 200;
const DEFAULT_PORT = 8000;

// Log a user in, checking their credentials against the users table
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    try {
      const db = await getDBConnection();
      const queryCheckUser = 'SELECT * FROM users WHERE email = ?';
      const user = await db.get(queryCheckUser, email);
      if (user) {
        if (user.password === password) {
          res.type('json').status(VALID_REQ)
            .send({success: true, message: 'Logged in successfully!'});
        } else {
          res.type('json').status(VALID_REQ)
            .send({success: false, message: 'Incorrect password. Please try again.'});
        }
      } else {
        res.type('json').status(VALID_REQ)
          .send({success: false, message: 'User not found. Please try again.'});
      }
    } catch (err) {
      res.type('json').status(SERVER_ERROR)
        .send('An error occurred on the server. Try again later.');
    }
  } else {
    res.type('json').status(INVALID_REQ)
      .send('Both username and password must be provided.');
  }
});

/**
 * Builds the WHERE clause and the query parameters for the SQL query.
 * @param {string} classMeetingDays - The class meeting days.
 * @param {string} classMeetingTimes - The class meeting times.
 * @param {string} search - The search term.
 * @returns {Object} An object containing the WHERE clause and the query parameters.
 */
function buildWhereClause(classMeetingDays, classMeetingTimes, search) {
  let whereClause = [];
  let queryParams = [];

  if (classMeetingDays) {
    whereClause.push("classes.classMeetingDays = ?");
    queryParams.push(classMeetingDays);
  }
  if (classMeetingTimes) {
    whereClause.push("classes.classMeetingTimes = ?");
    queryParams.push(classMeetingTimes);
  }
  if (search) {
    whereClause.push("classes.subject LIKE ?");
    queryParams.push(`%${search}%`);
  }

  return {whereClause: whereClause.join(' AND '), queryParams};
}

/**
 * Executes the SQL query.
 * @param {Object} db - The database connection.
 * @param {string} selectClassesQuery - The SELECT query.
 * @param {string} whereClause - The WHERE clause.
 * @param {Array} queryParams - The query parameters.
 * @returns {Array} The results of the SQL query.
 */
async function executeQuery(db, selectClassesQuery, whereClause, queryParams) {
  let classesQuery = selectClassesQuery + ' FROM classes WHERE ' + whereClause;
  let classesResults = await db.all(classesQuery, queryParams);
  return classesResults;
}

// Retrieves and returns a list of classes based on the provided search criteria and filters.
app.get("/classeslist", async (req, res) => {
  let db = await getDBConnection();
  const {classMeetingDays, classMeetingTimes, search} = req.query;
  let selectClassesQuery =
  "SELECT classes.id, classes.instructionMode, " +
  "classes.subject, classes.categoryId, classes.classMeetingDays, classes.classMeetingTimes, " +
  "classes.capacity";

  try {
    let {whereClause, queryParams} = buildWhereClause(classMeetingDays, classMeetingTimes, search);
    let classesResults = await executeQuery(db, selectClassesQuery, whereClause, queryParams);
    res.json(classesResults);
    await db.close();
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).send("An error occurred on the server. Try again later");
  }
});

// Endpoint to retrieve detailed information about a class
app.get('/item-details/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const classDetails = await getDetailedClassInfo(itemId);

    if (classDetails) {
      res.json(classDetails);
    } else {
      res.status(404).type('json');
      res.send({error: 'Class not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).type('json');
    res.send({error: 'Internal Server Error'});
  }
});

/**
 * Retrieves detailed information about a class from the database.
 *
 * @param {string} itemId - The ID of the class to retrieve detailed information for.
 * @returns {Promise<Object|null>} - A promise that resolves with the detailed class information,
 * or null if the class with the specified ID is not found.
 * @throws {Error} If there's an issue with the database connection or query execution.
 */
async function getDetailedClassInfo(itemId) {
  const db = await getDBConnection();
  const query = 'SELECT * FROM classes WHERE id = ?';
  const classDetails = await db.get(query, itemId);
  await db.close();
  return classDetails;
}

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {sqlite3.Database} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: "binaryhub.db",
    driver: sqlite3.Database
  });
  return db;
}

app.use(express.static("public"));
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT);