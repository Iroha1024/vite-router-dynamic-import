<template>
  <div>home</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { throttle } from "lodash-es";

export default defineComponent({
  setup() {
    const fn = throttle(() => {}, 100);

    return {
      fn
    }
  },
});
</script>

<style></style>
