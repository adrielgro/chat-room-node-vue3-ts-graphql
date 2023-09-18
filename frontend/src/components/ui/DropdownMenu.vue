<script lang="ts" setup>
import { PhCaretDown } from "@phosphor-icons/vue";
import { onMounted, onUnmounted, ref } from "vue";

const isOpen = ref(false);
const dropdownContent = ref<null | HTMLDivElement>(null);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdownContentNode = dropdownContent.value as Node | null;
  const targetNode = event.target as Node | null;

  if (isOpen.value && dropdownContentNode && targetNode) {
    if (!dropdownContentNode.contains(targetNode)) {
      isOpen.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    ref="dropdownContent"
    class="relative inline-block text-left"
  >
    <div>
      <button
        id="menu-button"
        type="button"
        class="dropdown-button"
        aria-expanded="true"
        aria-haspopup="true"
        @click="toggleDropdown"
      >
        <p>{{ props.text }}</p>
        <PhCaretDown
          class="text-gray-400"
          size="14"
          weight="bold"
        />
      </button>
    </div>

    <div
      :class="['dropdown-menu', isOpen ? 'max-h-[400px] ring-1' : 'max-h-0']"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div
        class="py-1"
        role="none"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
