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

export const getAllReports = ({
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .get("/api/report")
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};

export const getReport = ({
  reportId,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .get(`/api/report/${reportId}`)
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};

export const editReport = ({
  reportId,
  reportData,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .put(`/api/report/${reportId}`,reportData)
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};

export const deleteReport = ({
  reportId,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .delete(`/api/report/${reportId}`)
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};

export const deleteFile = ({
  fileId,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .delete(`/api/file/${fileId}`)
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};