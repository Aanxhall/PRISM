require("dotenv").config();

const express = require("express");
const cors = require("cors");

const initializeDatabase = require("./database");
const generateInsights = require("./localAI");

const app = express();

app.use(cors());
app.use(express.json());

let db = null;

// ================= HOME =================

app.get("/", (req, res) => {
  res.send("🚀 PRISM Backend Running Successfully");
});

// ================= GET REPORTS =================

app.get("/reports", async (req, res) => {
  try {
    const reports = await db.all(
      "SELECT * FROM reports ORDER BY id DESC"
    );

    res.json(reports);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching reports",
    });
  }
});

// ================= ADD REPORT =================

app.post("/reports", async (req, res) => {
  try {
    const {
      title,
      category,
      location,
      priority,
      description,
    } = req.body;

    await db.run(
      `
      INSERT INTO reports
      (
        title,
        category,
        location,
        priority,
        description,
        status
      )

      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        category,
        location,
        priority,
        description,
        "Submitted",
      ]
    );

    res.json({
      message: "Report Added Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding report",
    });
  }
});

// ================= UPDATE REPORT =================

app.put("/reports/:id", async (req, res) => {
  try {
    const {
      title,
      category,
      location,
      priority,
      description,
    } = req.body;

    await db.run(
      `
      UPDATE reports
      SET
        title = ?,
        category = ?,
        location = ?,
        priority = ?,
        description = ?
      WHERE id = ?
      `,
      [
        title,
        category,
        location,
        priority,
        description,
        req.params.id,
      ]
    );

    res.json({
      message: "Report Updated Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating report",
    });
  }
});

// ================= AI INSIGHTS =================

// ================= AI INSIGHTS =================

app.post("/ai-insights", async (req, res) => {

    try {

        const report = req.body;

        let insight;

        try {

            insight = await generateInsights(report);

        } catch (err) {

            console.log("Gemini unavailable:", err.message);

            insight = `
AI Analysis

Summary:
The complaint has been received successfully.

Risk Level:
High

Recommended Action:
• Verify the complaint.
• Dispatch the concerned authority.
• Inspect the reported location.
• Take necessary action.
`;

        }

        res.json({
            success: true,
            insight
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: "AI generation failed"
        });

    }

});
// ================= DELETE REPORT =================

app.delete("/reports/:id", async (req, res) => {
  try {

    await db.run(
      "DELETE FROM reports WHERE id = ?",
      req.params.id
    );

    res.json({
      message: "Report Deleted Successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error deleting report",
    });

  }
});

// ================= START SERVER =================

const PORT = 5000;

const startServer = async () => {

  try {

    db = await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {

    console.error("Database Error:", error);

  }

};

startServer();