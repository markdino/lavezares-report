export const isVideo = (inputString) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.flv', '.mkv'];
    return videoExtensions.some(ext => inputString.endsWith(ext));
}

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};