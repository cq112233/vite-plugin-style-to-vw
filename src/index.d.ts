import { Plugin } from "vite";
export interface IdefaultsProp {
  unitToConvert?: string,
  viewportWidth?: number,
  unitPrecision?: number,
  viewportUnit?: string,
  fontViewportUnit?: string,
  minPixelValue?: number,
}

export default function vitePluginStyleToVw(options?:IdefaultsProp):Plugin


 