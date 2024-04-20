import mysql from "mysql";

// Create a MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "social"
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        process.exit(1); // Terminate the Node.js process if connection fails
    }
    console.log("Connected to MySQL database");
});

// Export the database connection object for use in other modules
export { db } ;
