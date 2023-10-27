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
  files: {
    type: [
      {
        name: { type: String, required: [true, "File name is required"] },
        url: { type: String, required: [true, "File url is required"] },
        size: { type: Number, required: [true, "File size is required"] },
        key: {
          type: String,
          required: [true, "File key identifier is required"],
        },
      },
    ],
  },
  incidentDetails: {
    type: String,
  },
  incidentLocation: {
    type: String,
  },
  reportArrested: {
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
  reporterMiddleName: {
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
