import { Plugin } from "vite";
export interface IdefaultsProp {
  allReplace?:boolean,
  unitToConvert?: string,
  viewportWidth?: number,
  unitPrecision?: number,
  viewportUnit?: string,
  fontViewportUnit?: string,
  minPixelValue?: number,
  attributeList?:string[],
}

export default function vitePluginStyleToVw(options?:IdefaultsProp):Plugin


export function stylePxToVw(code: number | string ,options?:IdefaultsProp):number | string