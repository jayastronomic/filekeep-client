export function base64ToBlob(filedata: ShareableFileData) {
  const byteCharacters = atob(filedata.content);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: filedata.mimeType });
}
