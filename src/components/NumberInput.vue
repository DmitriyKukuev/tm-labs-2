<template>
    <label class="flex gap-2 w-fit items-baseline mb-4">
        <span class="text-gray-400 text-xl">{{ name }}:</span>
        <input type="number"
               v-model="value"
               :placeholder="name"
               class="p-2 rounded text-base focus:outline-none focus:outline-emerald-200"
        >
    </label>
</template>

<script setup lang="ts">
    import {ref, watch} from "vue";

    type TComponentProps = {
        modelValue: any,
        name: string,
    };

    const props = defineProps<TComponentProps>();
    const emit = defineEmits(['update:modelValue']);

    const value = ref(props.modelValue);

    watch(props, () => value.value = props.modelValue);

    watch(value, (newValue) => {
        if (newValue !== props.modelValue) {
            emit('update:modelValue', newValue)
        }
    });
</script>