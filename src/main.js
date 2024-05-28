// 匹配包含样式属性的字符串，支持换行
const styleRegex = /style\s*=\s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})/g;

// 在您的HTML模板中提取样式信息
const htmlTemplate = `import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props) {
    return () => (
      <div style={{width: '100%', height: '30px',background:'red' }}>
        <div style="width:100%;
        height:30px;
        background:red;">
        </div>
        {props.msg}
        1111
      </div>
    )
  }
})`;

const extractedStyles = [];
let match;
while ((match = styleRegex.exec(htmlTemplate)) !== null) {
  const styleContent = match[1] || match[2] || match[3];
  extractedStyles.push(styleContent);
}

console.log(extractedStyles);