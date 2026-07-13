export function generateAIInsight(report) {

    let risk = "Low";
    let confidence = 75;
    let action = "Forward to concerned authority.";

    if (report.priority === "High") {
        risk = "High";
        confidence = 96;
        action =
            "Immediate inspection required. Notify authorities and verify the evidence.";
    }

    if (report.priority === "Medium") {
        risk = "Medium";
        confidence = 87;
        action =
            "Schedule field verification and monitor the situation.";
    }

    return {
        summary: `A ${report.category} complaint has been registered at ${report.location}. The system has analyzed the report and categorized it based on the submitted information.`,

        risk,

        confidence,

        action,
    };
}