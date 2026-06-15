// Type declarations for asset imports
// Allows TypeScript to recognize .png, .jpg, .ttf file imports

declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '*.ttf' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}
