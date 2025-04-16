export class MaxFileStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MaxFileStorage";
  }
}
