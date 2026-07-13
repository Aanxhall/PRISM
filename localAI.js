function generateLocalAI(report) {
  let summary = "";
  let risk = "";
  let department = "";
  let action = "";
  let confidence = Math.floor(Math.random() * 10) + 90;

  switch (report.category) {
    case "Cybercrime":
      summary =
        "Potential cyber fraud or online crime detected based on the complaint.";
      department = "Cyber Crime Cell";
      action =
        "Investigate digital evidence and verify the reported accounts.";
      break;

    case "Pollution":
      summary =
        "Environmental pollution reported that may affect public health.";
      department = "Municipal Corporation";
      action =
        "Send an inspection team to verify and take corrective action.";
      break;

    case "Child Labour":
      summary =
        "Possible child labour violation requiring immediate verification.";
      department = "Labour Department";
      action =
        "Conduct field inspection and ensure child protection.";
      break;

    case "Fraud":
      summary =
        "Financial or identity fraud appears likely based on the complaint.";
      department = "Economic Offences Wing";
      action =
        "Collect transaction records and identify suspects.";
      break;

    default:
      summary =
        "Public grievance requires verification by local authorities.";
      department = "District Administration";
      action =
        "Assign the complaint to the appropriate department.";
  }

  switch (report.priority) {
    case "Critical":
      risk = "Critical";
      break;
    case "High":
      risk = "High";
      break;
    case "Medium":
      risk = "Medium";
      break;
    default:
      risk = "Low";
  }

  return `
🤖 AI Analysis

Summary:
${summary}

Risk Level:
${risk}

AI Confidence:
${confidence}%

Suggested Department:
${department}

Recommended Action:
${action}
`;
}

module.exports = generateLocalAI;