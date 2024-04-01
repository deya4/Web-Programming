CREATE TABLE "users" (
	"email"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("email")
);

CREATE TABLE "classes" (
	"id"	TEXT,
	"subject"	TEXT,
	"instructionMode"	TEXT,
	"classMeetingDays"	TEXT,
	"classMeetingTimes"	TEXT,
	"categoryId"	TEXT,
	"capacity"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("categoryId") REFERENCES "categories"("id")
);

CREATE TABLE "categories" (
	"id"	TEXT,
	"category"	TEXT,
	PRIMARY KEY("id")
);
INSERT INTO "users" VALUES ('johns@binaryhub.edu','commonname');
INSERT INTO "users" VALUES ('talw@binaryhub.edu','instructor');
INSERT INTO "users" VALUES ('deyag@binaryhub.edu','student');
INSERT INTO "users" VALUES ('web@binaryhub.edu','class');
INSERT INTO "users" VALUES ('js@binaryhub.edu','programminglanguage');
INSERT INTO "classes" VALUES ('INTRO 101','Overview of Computer Science','Online','mon','am','CS INTRO',0);
INSERT INTO "classes" VALUES ('INTRO 201','History and Evolution of Computing','In Person','tue','pm','CS INTRO',1);
INSERT INTO "classes" VALUES ('INTRO 301','Basics of Algorithms and Problem Solving','Online','wed','am','CS INTRO',0);
INSERT INTO "classes" VALUES ('FUND 101','Introduction to Programming Logic','In Person','thu','pm','CS FUND',1);
INSERT INTO "classes" VALUES ('FUND 201','Variables, Data Types, and Operators','Online','fri','am','CS FUND',0);
INSERT INTO "classes" VALUES ('FUND 301','Loops and Conditionals','In Person','mon','pm','CS FUND',1);
INSERT INTO "classes" VALUES ('FUND 401','Functions and Modular Programming','Online','tue','am','CS FUND',0);
INSERT INTO "classes" VALUES ('WEB DEV 101','HTML Fundamentals','In Person','wed','pm','WEB BASICS',1);
INSERT INTO "classes" VALUES ('WEB DEV 201','CSS Fundamentals','Online','thu','am','WEB BASICS',0);
INSERT INTO "classes" VALUES ('WEB DEV 301','Introduction to Responsive Web Design','In Person','fri','pm','WEB BASICS',1);
INSERT INTO "classes" VALUES ('WEB DEV 401','Basic JavaScript Concepts','Online','mon','am','WEB BASICS',0);
INSERT INTO "classes" VALUES ('PYTHON 101','Introduction to Python','In Person','tue','pm','PY PROGRAM',1);
INSERT INTO "classes" VALUES ('PYTHON 201','Variables, Data Types, and Operators in Python','Online','wed','am','PY PROGRAM',0);
INSERT INTO "classes" VALUES ('PYTHON 301','Control Flow and Functions in Python','In Person','thu','pm','PY PROGRAM',1);
INSERT INTO "classes" VALUES ('PYTHON 401','Data Structures in Python','Online','fri','am','PY PROGRAM',0);
INSERT INTO "classes" VALUES ('PYTHON 501','Introduction to Object-Oriented Programming (OOP) in Python','In Person','mon','pm','PY PROGRAM',1);
INSERT INTO "classes" VALUES ('JS 101','Introduction to JavaScript','Online','tue','am','JS PROGRAM',0);
INSERT INTO "classes" VALUES ('JS 201','JavaScript Functions and Events','In Person','wed','pm','JS PROGRAM',1);
INSERT INTO "classes" VALUES ('JS 301','DOM Manipulation and AJAX','Online','thu','am','JS PROGRAM',0);
INSERT INTO "classes" VALUES ('JS 401','Introduction to Front-End Frameworks','In Person','fri','pm','JS PROGRAM',1);
INSERT INTO "classes" VALUES ('JAVA 101','Introduction to Java','Online','mon','am','JAVA PROGRAM',0);
INSERT INTO "classes" VALUES ('JAVA 201','Java Syntax and Object-Oriented Programming','In Person','tue','pm','JAVA PROGRAM',1);
INSERT INTO "classes" VALUES ('JAVA 301','Java Collections Framework','Online','wed','am','JAVA PROGRAM',0);
INSERT INTO "classes" VALUES ('JAVA 401','Exception Handling in Java','In Person','thu','pm','JAVA PROGRAM',1);
INSERT INTO "classes" VALUES ('JAVA 501','Introduction to JavaFX for GUI Development','Online','fri','am','JAVA PROGRAM',0);
INSERT INTO "classes" VALUES ('PROJ 101','Building a Simple Website (HTML, CSS, JavaScript)','Online','mon','pm','PROJ',1);
INSERT INTO "classes" VALUES ('PROJ 201','Creating a Python Web Application','Online','tue','am','PROJ',0);
INSERT INTO "classes" VALUES ('PROJ 301','Developing a Java Desktop Application','Online','wed','pm','PROJ',1);
INSERT INTO "classes" VALUES ('ADV 101','Database Management and SQL','Online','thu','am','ADV TOPICS',0);
INSERT INTO "classes" VALUES ('ADV 201','Introduction to RESTful APIs','Online','fri','pm','ADV TOPICS',1);
INSERT INTO "classes" VALUES ('ADV 301','Version Control with Git','Online','mon','am','ADV TOPICS',0);
INSERT INTO "classes" VALUES ('ADV 401','Introduction to Cloud Computing','Online','tue','pm','ADV TOPICS',1);
INSERT INTO "categories" VALUES ('CS_INTRO ','Introduction to Computer Science');
INSERT INTO "categories" VALUES ('CS FUND','Programming Fundamentals');
INSERT INTO "categories" VALUES ('WEB BASICS','Web Development Basics');
INSERT INTO "categories" VALUES ('PY PROGRAM','Python Programming');
INSERT INTO "categories" VALUES ('JS PROGRAM','JavaScript Programming');
INSERT INTO "categories" VALUES ('JAVA PROGRAM','Java Programming');
INSERT INTO "categories" VALUES ('PROJ','Projects');
INSERT INTO "categories" VALUES ('ADV TOPICS','Advanced Topics');
COMMIT;