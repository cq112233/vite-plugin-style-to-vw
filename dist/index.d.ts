interface IdefaultsProp {
  unitToConvert: string,
  viewportWidth: number,
  unitPrecision: number,
  viewportUnit: string,
  fontViewportUnit: string,
  minPixelValue: number,
}

 type VitePluginStyleToVw = (options?: IdefaultsProp)=>any

export { IdefaultsProp, VitePluginStyleToVw, VitePluginStyleToVw as default };
