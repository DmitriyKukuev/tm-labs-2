<template>
    <h1 class="text-xl mb-5">{{ title }}</h1>
</template>

<script setup lang="ts">
    type TComponentProps = {
        title: string,
    };

    const props = defineProps<TComponentProps>();
</script>