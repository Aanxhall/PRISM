import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import UploadBox from "./UploadBox";
import API from "../../api/api";

function ReportForm({
  addReport,
  updateReport,
  selectedReport,
  setSelectedReport,
  setAiInsight,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Cybercrime",
    location: "",
    priority: "Low",
    description: "",
  });

  // Fill form when Edit is clicked
  useEffect(() => {
    if (selectedReport) {
      setFormData({
        id: selectedReport.id,
        title: selectedReport.title,
        category: selectedReport.category,
        location: selectedReport.location,
        priority: selectedReport.priority,
        description: selectedReport.description,
      });
    }
  }, [selectedReport]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      title: "",
      category: "Cybercrime",
      location: "",
      priority: "Low",
      description: "",
    });

    setSelectedReport(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.location ||
      !formData.description
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      if (selectedReport) {
        await updateReport(formData);
        toast.success("Report updated successfully!");
      } else {
        await addReport(formData);

        const aiResponse = await API.post("/ai-insights", formData);

        // Save AI analysis in parent state
        setAiInsight(aiResponse.data.insight);

        toast.success("AI Analysis Generated!");
      }

      clearForm();
    } catch (error) {
      console.error("FULL ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-md p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {selectedReport ? "Edit Report" : "Submit New Report"}
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="title"
          placeholder="Report Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-cyan-400"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-cyan-400"
        >
          <option>Cybercrime</option>
          <option>Pollution</option>
          <option>Child Labour</option>
          <option>Fraud</option>
          <option>Others</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-cyan-400"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-cyan-400"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <textarea
        rows="6"
        name="description"
        placeholder="Describe the incident..."
        value={formData.description}
        onChange={handleChange}
        className="w-full mt-6 rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-cyan-400"
      />

      <div className="mt-6">
        <UploadBox />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          {selectedReport ? "Update Report" : "Submit Report"}
        </button>

        {selectedReport && (
          <button
            type="button"
            onClick={clearForm}
            className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white hover:bg-red-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ReportForm;