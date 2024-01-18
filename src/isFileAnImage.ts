export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', "jfif"];

function IsFileAnImage(file: File): boolean {
    const lastDotIndex = file.name.lastIndexOf('.');

    if (lastDotIndex === -1) return false;
    const extension = file.name.slice(lastDotIndex + 1).toLowerCase();
    return imageExtensions.includes(extension);

}
export default IsFileAnImage;