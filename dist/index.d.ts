import { Plugin } from 'vite';

interface IdefaultsProp {
  allReplace?:boolean,
  unitToConvert?: string,
  viewportWidth?: number,
  unitPrecision?: number,
  viewportUnit?: string,
  fontViewportUnit?: string,
  minPixelValue?: number,
  attributeList?:string[],
  include?: string | RegExp | (string | RegExp)[],
  exclude?: string | RegExp | (string | RegExp)[]
}

declare function vitePluginStyleToVw(options?:IdefaultsProp):Plugin


declare function stylePxToVw(code: number | string ,options?:IdefaultsProp):number | string

export { IdefaultsProp, vitePluginStyleToVw as default, stylePxToVw };
