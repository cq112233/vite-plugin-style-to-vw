import type { IdefaultsProp } from './index.d'

// 默认参数
const defaultsProp: IdefaultsProp = {
  unitToConvert: "px", // 需要转换的单位，默认为"px"
  viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
  unitPrecision: 5, // 单位转换后保留的精度
  viewportUnit: "vw", // 希望使用的视口单位
  fontViewportUnit: "vw", // 字体使用的视口单位
  minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
};

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
let extraOptions = defaultsProp
const templateReg = /<template>([\s\S]+)<\/template>/gi;
const pxGlobalReg = /(\d+)px/g;
const styleRegex = /style\s*(:|=)\s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})/g;
const styleSetPropertyReg = /style.setProperty\(.*\)/g

function vitePluginStyleToVw(customOptions: IdefaultsProp = defaultsProp) {
  return {
    // 插件名称
    name: "vite-plugin-style-to-vw",
    // 构建阶段的通用钩子：在每个传入模块请求时被调用：在每个传入模块请求时被调用，主要是用来转换单个模块
    transform(code: any, id: any) {
      customOptions = Object.assign(defaultsProp, customOptions)
      extraOptions = customOptions
      if (/.vue$/.test(id)) {
        let _source = ''
        let _sourceCopy = ''
        // template 模式
        if (templateReg.test(code)) {
          _source = code.match(templateReg)[0]
          _sourceCopy = code.match(templateReg)[0]
        } else if (code.includes('setup')) {
          _source = code
          _sourceCopy = code
        }
        if (styleRegex.test(_source)) {

          const styleMatches = _source.match(styleRegex) as string[]

          if (styleMatches?.length) {
            // 遍历每个 style 属性值,替换 px 为 vw
            const newStyleValues: string[] = []
            for (let i = 0; i < styleMatches.length; i++) {
              const styleValue = styleMatches[i]
              const newStyleValue = styleValue.replace(pxGlobalReg, (match) => {
                return match.replace(
                  pxGlobalReg,
                  createPxReplace(
                    customOptions.viewportWidth,
                    customOptions.minPixelValue,
                    customOptions.unitPrecision,
                    customOptions.viewportUnit,
                  ),
                )
              })
              newStyleValues.push(newStyleValue)
            }
            // 将新的 style 属性值替换回原始字符串
            let newStr = _source
            for (let i = 0; i < styleMatches.length; i++) {
              newStr = newStr.replace(styleMatches[i], `${newStyleValues[i]}`)
            }
            code = code.replace(_sourceCopy, newStr)

          }
        }
      } else if (/\.tsx|\.jsx$/.test(id)) {
        let _source = code
        let _sourceCopy = code
        // 匹配style
        if (styleRegex.test(_source)) {
          const styleMatches = _source.match(styleRegex) as string[]
          if (styleMatches?.length) {
            // 遍历每个 style 属性值,替换 px 为 vw
            const newStyleValues: string[] = []
            for (let i = 0; i < styleMatches.length; i++) {
              const styleValue = styleMatches[i]
              const newStyleValue = styleValue.replace(pxGlobalReg, (match) => {
                return match.replace(
                  pxGlobalReg,
                  createPxReplace(
                    customOptions.viewportWidth,
                    customOptions.minPixelValue,
                    customOptions.unitPrecision,
                    customOptions.viewportUnit,
                  ),
                )
              })
              newStyleValues.push(newStyleValue)
            }
            // 将新的 style 属性值替换回原始字符串
            let newStr = _source
            for (let i = 0; i < styleMatches.length; i++) {
              newStr = newStr.replace(styleMatches[i], `${newStyleValues[i]}`)
            }
            code = code.replace(_sourceCopy, newStr)
            _sourceCopy = code
            _source = code
          }
        }
        // react 设置important
        if(styleSetPropertyReg.test(_source)) {
          const styleMatches = _source.match(styleSetPropertyReg) as string[]
          if (styleMatches?.length) {
            // 遍历每个 style 属性值,替换 px 为 vw
            const newStyleValues: string[] = []
            for (let i = 0; i < styleMatches.length; i++) {
              const styleValue = styleMatches[i]
              const newStyleValue = styleValue.replace(pxGlobalReg, (match) => {
                return match.replace(
                  pxGlobalReg,
                  createPxReplace(
                    customOptions.viewportWidth,
                    customOptions.minPixelValue,
                    customOptions.unitPrecision,
                    customOptions.viewportUnit,
                  ),
                )
              })
              newStyleValues.push(newStyleValue)
            }
            // 将新的 style 属性值替换回原始字符串
            let newStr = _source
            for (let i = 0; i < styleMatches.length; i++) {
              newStr = newStr.replace(styleMatches[i], `${newStyleValues[i]}`)
            }
            code = code.replace(code, newStr)
          }
        }
      }
      return {
        code,
        map: null, // Prevent missing sourcemap warning
      }
    },

  };
}



export default vitePluginStyleToVw;


// 手动转换成vw 100 ==> 13.33333 '100px' ==> '13.33333px
export const stylePxToVw = (code: string | number,customOptions: IdefaultsProp = extraOptions) => {
  customOptions = Object.assign(extraOptions, customOptions)
  if (typeof code === 'number' || (typeof Number(code) === 'number' && !isNaN(Number(code
  )))) {
    let returnCode = code.toString().replace(/(\d+)/g, (match) => {
      return match.replace(
        /(\d+)/g,
        createPxReplace(
          customOptions.viewportWidth,
          customOptions.minPixelValue,
          customOptions.unitPrecision,
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
          customOptions.viewportWidth,
          customOptions.minPixelValue,
          customOptions.unitPrecision,
          customOptions.viewportUnit,
        ),
      )
    })
  }
}





