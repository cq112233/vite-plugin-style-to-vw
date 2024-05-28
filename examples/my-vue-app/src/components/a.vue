<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'A',
  setup() {
    return () => <div style={{ color: 'red',fontSize:'100px' }}>A</div>;
  },
});
</script>