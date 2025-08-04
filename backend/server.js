const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8081;

const db = mysql.createConnection({ 
    host: "localhost",
    user: "root",
    password: "",
    database: "school_management",
});

// Admin Login 
app.post('/login', (req, res) => {
    console.log('Login attempt received:', req.body);
    
    const { userName, password } = req.body;
    
    if (!userName || !password) {
        return res.json({ message: 'Username and password are required' });
    }
    
    // Use admin_details table
    const sql = "SELECT * FROM admin_details WHERE userName=? AND password=?";
    db.query(sql, [userName, password], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ message: "Database error" });
        }
        
        console.log('Query result:', data);
        
        if (data.length > 0) {
            return res.json({ message: "Success" });
        } else {
            return res.json({ message: "Invalid credentials" });
        }
    });
});
  
// Add Students
app.post("/add_user", (req, res) => {
    const enrolledCourses = Array.isArray(req.body.enrolledCourses)
        ? req.body.enrolledCourses.join(", ")
        : "";

    const sql = 
        "INSERT INTO student_details (`firstName`, `lastName`, `homeAddress`, `emailAddress`, `birthday`, `phoneNumber`, `studentId`, `degreeProgram`, `enrolledCourses`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.homeAddress,
        req.body.emailAddress,
        req.body.birthday,
        req.body.phoneNumber,
        req.body.studentId,
        req.body.degreeProgram,
        enrolledCourses,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ message: "Insert failed: " + err.message });
        }
        return res.json({ success: "Student added successfully" });
    });
});

// Get all students
app.get("/students", (req, res) => {
    console.log("GET /students requested");
    const sql = "SELECT * FROM student_details";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error in /students:", err);
            return res.json({ message: "Server error: " + err.message });
        }

        const processedResult = result.map(student => ({
            ...student,
            enrolledCourses: student.enrolledCourses ? student.enrolledCourses.split(', ') : []
        }));

        console.log(`Returning ${processedResult.length} students`);
        return res.json(processedResult);
    });
});

// Get single student by studentId 
app.get("/get_student/:studentId", (req, res) => {
    const studentId = req.params.studentId.trim();

    const debugSql = "SELECT studentId FROM student_details LIMIT 5";
    db.query(debugSql, (err, debugResult) => {
        if (err) {
            console.log("Debug query error:", err);
        } else {
            console.log("Sample studentIds in database:", debugResult);
        }
    });
    
    const sql = "SELECT * FROM student_details WHERE `studentId` = ?";
    
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.json({ message: "Server error: " + err.message });
        }
        
        console.log("Raw database result:", result);
        console.log("Result length:", result.length);
        console.log("Result type:", typeof result);
        
        if (result.length === 0) {
            console.log("No student found with ID:", studentId);
            
            // Let's try a broader search to see if similar records exist
            const searchSql = "SELECT * FROM student_details WHERE `studentId` LIKE ?";
            db.query(searchSql, [`%${studentId}%`], (searchErr, searchResult) => {
                if (!searchErr) {
                    console.log("Similar studentIds found:", searchResult.map(s => s.studentId));
                }
            });
            
            return res.json([]);
        }
        
        const processedResult = result.map(student => ({
            ...student,
            enrolledCourses: student.enrolledCourses ? student.enrolledCourses.split(', ') : []
        }));
        
        console.log("Processed result:", processedResult);
        return res.json(processedResult);
    });
});

// Edit Student
app.post("/edit_student/:studentId", (req, res) => {
    const studentId = req.params.studentId;

    const enrolledCourses = Array.isArray(req.body.enrolledCourses)
        ? req.body.enrolledCourses.join(", ")
        : "";

    const sql = 
        "UPDATE student_details SET `firstName`=?, `lastName`=?, `homeAddress`=?, `emailAddress`=?, `birthday`=?, `phoneNumber`=?, `degreeProgram`=?, `enrolledCourses`=? WHERE studentId=?";

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.homeAddress,
        req.body.emailAddress,
        req.body.birthday,
        req.body.phoneNumber,
        req.body.degreeProgram,
        enrolledCourses,
        studentId,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
          return res.json({ message: "Update failed: " + err.message });
        }
      
        if (result.affectedRows === 0) {
          return res.json({ message: "No student found with the given ID." });
        }
      
        return res.json({ success: "Student edited successfully" });
      });
      
});

// Audit Trail
app.get("/audit-trail", (req, res) => {
    console.log("GET /audit-trail requested");

    const auditSql = "SELECT * FROM audit_trail";

    db.query(auditSql, (err, result) => {
        if (err) {
            console.error("Database error in /audit-trail:", err);
            return res.json({ error: "Server error: " + err.message });
        }

        console.log(`Returning ${result.length} audit trail records`);
        return res.json(Array.isArray(result) ? result : []);
    });
});


// Delete student (using studentId)
app.delete("/delete/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    console.log("DELETE /delete requested for ID:", studentId);

    const sql = "DELETE FROM student_details WHERE studentId = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error(" Delete error:", err);
            return res.json({ message: "Delete failed: " + err.message });
        }
        console.log(" Student deleted successfully");
        return res.json({ success: "Student deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});


