import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  crimeDate: {
    type: Date,
    required: [true, "Crime date is required!"],
  },
  crimeTime: {
    type: Date,
    required: [true, "Crime time is required!"],
  },
  imageFile: {
    type: String,
  },
  incidentDetails: {
    type: String,
  },
  reportDate: {
    type: Date,
    required: [true, "Report date is required!"],
  },
  reportTime: {
    type: Date,
    required: [true, "Report time is required!"],
  },
  reporterContact: {
    type: String,
  },
  reporterFirstName: {
    type: String,
  },
  reporterLastName: {
    type: String,
  },
  reporterMiddletName: {
    type: String,
  },
  reporterPosition: {
    type: String,
  },
  suspectCharges: {
    type: String,
  },
  suspectFirstName: {
    type: String,
  },
  suspectLastName: {
    type: String,
  },
});

const Report = models.Report || model("Report", ReportSchema);

export default Report;
