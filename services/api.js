import axios from "axios";

export const createReport = ({
  reportData,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();

  axios
    .post("/api/report/create", reportData)
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};