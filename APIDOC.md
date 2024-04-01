# Class Registration API Documentation
This API documentation provides endpoints for users to buy enroll in a class, search and filter available classes, and retrieve their enrollment history.
The API is designed to ensure a seamless and efficient user experience. It includes features such as user authentication, transaction confirmation, error handling, and preconditions for each endpoint.

## Retrieve All Classes

**Endpoint Name:** '/classes'

**Description:** This endpoint allows users to retrieve a list of all available classes in the course enrollment site.

**Request Format:** GET /classes

**Request Type:** GET

**Parameters:** classId: The unique ID of the class. (Required, String or Number).

**Description (Parameter):** The classId is a unique identifier for each class in a course registration system. It's used to retrieve specific class data.

**Example request (Parameter):**  GET /classes/CSE100

**Example response (Parameter):**
{
 "class_id": "CSE100",
 "class_name": "Introduction to Computer Programming",
 "class_description": " Introduction to computer programming for students without previous programming experience. ,
 "class_instructor": "Prof. Smith"
}

**Returned Data Format**: JSON array of class objects

**Example Request:** *http://localhost:8000/classes*

**Example Response:** [
  {
    "class_id": "CSE101",
    "class_name": "Introduction to Computer Science",
    "instructor": "Prof. Smith",
    "available_seats": 20,
    "schedule": "Mon, Wed 10:00 AM - 11:30 AM",
    "department": "Computer Science"
  },
  {
    "class_id": "ENG202",
    "class_name": "Advanced English Composition",
    "instructor": "Dr. Johnson",
    "available_seats": 15,
    "schedule": "Tue, Thu 1:00 PM - 2:30 PM",
    "department": "English"
  },
  // ... other classes
]

**Error Handling:**
404 Not Found: If the endpoint does not exist.
500 Internal Server Error: If there's an unexpected server error.

## Check  if the username and password match an entry in the database:

**Endpoint Name:** '/login'

**Description:** This endpoint checks if the provided username and password match an entry in the database. If the credentials are valid, the user is granted access to account-required actions.

**Request Format:** POST /login

**Request Type:**  POST

**Parameters:**
username: The username of the user. (Required, String)
password: The password of the user. (Required, String)

**Description (Parameters):** The username is the unique identifier for the user in the system. It is a required parameter for the login process. The password is the user's chosen password. The password is used to authenticate the user's identity and ensure that only authorized users can access their account.

**Returned Data Format**:  JSON object

**Example Request:**
POST /login
{
 "username": "user1",
 "password": "password1"
}

**Example Response:**
{
 "message": "Login successful",
 "user": {
  "username": "user1",
  "password": "password1"
 }
}

**Error Handling:**
400 Bad Request: If the request body is missing the required parameters.
401 Unauthorized: If the provided username and password do not match any entry in the database.

## Endpoint to retrieve detailed class information

**Endpoint Name:**  '/class/:classId'

**Description:** This endpoint retrieves detailed information about a specific class based on the provided class ID.

**Request Format:** GET /class/:classId

**Request Type:** GET

**Parameters:** classId: The unique identifier for the class. (Required, String or Number)

**Description (Parameters):** classId: The unique identifier for the class. This is a required parameter. The classId is a unique identifier for each class in the system. It's used to retrieve specific class data.

**Returned Data Format**: JSON object

**Example Request:** GET /class/CSE101

**Example Response:** {
 "class_id": "CLASS1",
 "class_name": "Class 1",
 "class_description": "Description for Class 1",
 "class_instructor": "Prof. Smith",
 "class_schedule": "Monday and Wednesday, 10:00 AM - 11:00 AM"
}

**Error Handling:** 400 Bad Request: If the request body is missing the required parameters. 404 Not Found: If the provided classId does not match any entry in the database.

## Endpoint to check if enrollment is successful or not

**Endpoint Name:**  '/enroll/:classId'

**Description:** This endpoint checks if a user is successfully enrolled in a specific class based on the provided class ID.

**Request Format:** GET /enroll/:classId

**Request Type:** GET

**Parameters:** classId: The unique identifier for the class. (Required, String or Number)

**Description (Parameters):** The classId is a unique identifier for each class in the system. It's used to check if the user is enrolled in the specific class.

**Returned Data Format**: JSON object

**Example Request:** GET /enroll/CS100

**Example Response:** {
 "class_id": "CS100",
 "enrollment_status": "Successful"
}

{
 "class_id": "CS100",
 "enrollment_status": "Failed",
 "error_message": "Class is full"
}

**Error Handling:** 400 Bad Request: If the request body is missing the required parameters. 404 Not Found: If the provided classId does not match any entry in the database. 500 Internal Server Error: If there is an issue with the server while processing the request.

## Endpoint to search database and return results

**Endpoint Name:**  '/search'

**Description:** This endpoint allows users to search the database for items based on the provided search criteria and filters.

**Request Format:** GET /search?searchTerm={searchTerm}&filters={filters}

**Request Type:** GET

**Parameters:** searchTerm: The term to search for in the database. (Optional, String). classId: The unique identifier for the class. (Optional, String or Number)

**Description (Parameters):** searchTerm: The term to search for in the database. This is an optional parameter. The searchTerm is used to search for classes that match the provided term. classId: The unique identifier for the class. This is an optional parameter. The classId is a unique identifier for each class in the system. It's used to retrieve specific class data.

**Returned Data Format**:  JSON array of class objects

**Example Request:** GET /search?searchTerm=CSE

**Example Response:** [
 {
   "class_id": "CSE101",
   "class_name": "Introduction to Computer Science",
   "instructor": "Prof. Smith",
   "available_seats": 20,
   "schedule": "Mon, Wed 10:00 AM - 11:30 AM",
   "department": "Computer Science"
 },
 {
   "class_id": "CSE102",
   "class_name": "Advanced Computer Science",
   "instructor": "Prof. Jones",
   "available_seats": 15,
   "schedule": "Tue, Thu 1:00 PM - 2:30 PM",
   "department": "Computer Science"
 },
 // ... other classes
]

**Error Handling:** 400 Bad Request: If the request body is missing the required parameters. 404 Not Found: If the provided searchTerm or classId does not match any entry in the database. 500 Internal Server Error: If there's an unexpected server error.

## Endpoint to retrieve enrollment history for any given user

**Endpoint Name:**  '/enrollmentHistory'

**Description:** This endpoint retrieves the enrollment history for a specific user.

**Request Format:** GET /enrollmentHistory

**Request Type:** GET

**Parameters:** none

**Description (Parameters):** This endpoint does not require any parameters as it retrieves the enrollment history for the logged-in user.

**Returned Data Format**: JSON array of enrollment objects

**Example Request:** GET /enrollmentHistory

**Example Response:** [
 {
 "class_id": "CS100",
 "class_name": "Introduction to Computer Science",
 "enrollment_date": "2023-01-01",
 "confirmation_number": "ENR12345"
 },
 {
 "class_id": "CS101",
 "class_name": "Advanced Computer Science",
 "enrollment_date": "2023-02-01",
 "confirmation_number": "ENR67890"
 },
 // ... other enrollments
]

**Error Handling:** 400 Bad Request: If the request body is missing the required parameters.
404 Not Found: If the user does not have any enrollment history.
500 Internal Server Error: If there's an unexpected server error.

**Preconditions:** The user must be logged in.