
declare module 'vite-plugin-style-to-vw' {
  export interface IdefaultsProp {
    unitToConvert: string,
    viewportWidth: number,
    unitPrecision: number,
    viewportUnit: string,
    fontViewportUnit: string,
    minPixelValue: number,
  }
  export type VitePluginStyleToVw = (options?: IdefaultsProp)=>any
}