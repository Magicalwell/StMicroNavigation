<script lang="ts">
import { defineComponent, h } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const elementList = store.state.textContainer
  }
})
</script>
