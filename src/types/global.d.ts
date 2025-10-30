/// <reference types="vite/client" />

declare module "react" {
  export * from "react";

  export function memo(arg0: () => JSX.Element) {
    throw new Error("Function not implemented.");
  }
}

declare module "react-dom" {
  export * from "react-dom";
}

declare module "babel__core" {
  const content: any;
  export = content;
}

declare module "babel__generator" {
  const content: any;
  export = content;
}

declare module "babel__template" {
  const content: any;
  export = content;
}

declare module "babel__traverse" {
  const content: any;
  export = content;
}

declare module "debug" {
  const content: any;
  export = content;
}

declare module "estree" {
  const content: any;
  export = content;
}

declare module "ms" {
  const content: any;
  export = content;
}

declare module "sax" {
  const content: any;
  export = content;
}
