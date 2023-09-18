<script lang="ts" setup>
import { PhBriefcase, PhChatCircleText, PhGameController, PhMusicNotes, PhRobot } from "@phosphor-icons/vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
    default: "22"
  },
  weight: {
    type: String,
    required: false,
    default: "regular"
  }
});

const iconComponents: Record<string, any> = {
  PhGameController,
  PhMusicNotes,
  PhRobot,
  PhBriefcase,
  PhChatCircleText,
};

const getIconComponent = () => {
  const iconComponent = iconComponents[props.iconName];

  if (!iconComponent) {
    return iconComponents["PhChatCircleText"];
  }

  return iconComponents[props.iconName];
};
</script>

<template>
  <component
    :is="getIconComponent()"
    class="text-primary"
    :size="size"
    :weight="weight"
  />
</template>
