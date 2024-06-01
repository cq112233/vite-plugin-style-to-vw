import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props) {
    return () => (
      <div style={{width: '100%', height: '30px !important',background:'red' }}>
        <div style="width:100%;
        height:30px;
        background:red;">
        </div>
        {props.msg}
        1111
      </div>
    )
  }
})