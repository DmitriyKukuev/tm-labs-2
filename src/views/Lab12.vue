<template>
    <NumberInput v-model="a" name="a"/>
    <NumberInput v-model="b" name="b"/>
    <NumberInput v-model="h" name="h"/>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import {random} from "@/helper";
    import NumberInput from '@/components/NumberInput.vue';

    const a = ref<number>(10);
    const b = ref<number>(17);
    const h = ref<number>(9);

    function f(x: number) {
        return x ** 0.5;
    }

    let N = 20;
    let M = 0;
    for (let i = 0; i < N; i++) {
        const x = random(b.value, a.value);
        const y = random(h.value);

        if (y < f(x)) {
            M++;
        }
    }

    const I = M / N * (b.value - a.value) * h.value;
</script>