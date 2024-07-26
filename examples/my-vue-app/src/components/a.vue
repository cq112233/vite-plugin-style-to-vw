<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'A',
  props: {
    size: String,
  },
  setup(props) {
    console.log('props',props)
    return () => <div style={ { color: 'red',fontSize:'100px' } }>A {props.size}</div>;
  },
});
</script>