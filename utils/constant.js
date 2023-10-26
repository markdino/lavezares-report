export const UPLOAD_FILES = {
  imageUploader: {
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
    getMessage: function () {
      return `Images up to ${this.image.maxFileSize}, max ${
        this.image.maxFileCount
      } file${this.image.maxFileCount > 1 ? "s" : ""}`;
    },
  },
  mediaPost: {
    image: { maxFileSize: "10MB", maxFileCount: 10 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
    getMessage: function () {
      return `Images up to ${this.image.maxFileSize}, max ${
        this.image.maxFileCount
      } file${this.image.maxFileCount > 1 ? "s" : ""}. Videos up to ${
        this.video.maxFileSize
      }, max ${this.video.maxFileCount} file${
        this.video.maxFileCount > 1 ? "s" : ""
      }.`;
    },
  },
};
