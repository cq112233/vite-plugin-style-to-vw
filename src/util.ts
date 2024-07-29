import type { IdefaultsProp } from './util.d'

const pxGlobalReg = /(\d+)px/g;

// 默认参数
const defaultsProp: IdefaultsProp = {
  allReplace: false, // 是否全局替换
  unitToConvert: "px", // 需要转换的单位，默认为"px"
  viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
  unitPrecision: 5, // 单位转换后保留的精度
  viewportUnit: "vw", // 希望使用的视口单位
  fontViewportUnit: "vw", // 字体使用的视口单位
  minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
  attributeList: [], // 添加额外转换属性
  include: [], // 包含哪些文件
  exclude: []  // 排除哪些文件
};

let extraOptions = defaultsProp

// @ts-ignore
if (typeof window !== "undefined") {
  try {
    // 读取文件，node端生成合并的配置,
    // ts忽略下文
    // @ts-ignore
    const json = await import('/node_modules/vite-plugin-style-to-vw/dist/file.json')
    extraOptions = json.default
  } catch (error) {
  }
}
// 转换函数
function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

// px 转 vw 函数
function createPxReplace(
  viewportSize: number,
  minPixelValue: number,
  unitPrecision: number,
  viewportUnit: any
) {
  return function ($0: any, $1: any) {
    $1 = Number($1)
    if (!$1) return $0;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue) return $0;
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit;
  };
}


// 手动转换成vw 100 ==> 13.33333 '100px' ==> '13.33333px
export const stylePxToVw = (code: string | number, customOptions: IdefaultsProp = {}) => {
  const copyExtraOptions = Object.assign({}, extraOptions)
  customOptions = Object.assign(copyExtraOptions, customOptions)
  if (typeof code === 'number' || (typeof Number(code) === 'number' && !isNaN(Number(code
  )))) {
    const returnCode = code.toString().replace(/(\d+)/g, (match) => {
      return match.replace(
        /(\d+)/g,
        createPxReplace(
          customOptions.viewportWidth as number,
          customOptions.minPixelValue as number,
          customOptions.unitPrecision as number,
          ''
        ),
      )

    })
    if (typeof code === 'number') {
      return Number(returnCode)
    } else {
      return returnCode
    }
  } else {
    return code.toString().replace(pxGlobalReg, (match) => {
      return match.replace(
        pxGlobalReg,
        createPxReplace(
          customOptions.viewportWidth as number,
          customOptions.minPixelValue as number,
          customOptions.unitPrecision as number,
          customOptions.viewportUnit as string,
        ),
      )
    })
  }
}
