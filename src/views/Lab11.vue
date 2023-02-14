<template>
    <NumberInput v-model="m" name="m"/>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import {random} from "@/helper";
    import NumberInput from '@/components/NumberInput.vue';

    const CUBE_TOSSES = 2;
    const MAX_RAND = 50;

    const m = ref<number>(6);
    let n = C(CUBE_TOSSES, m.value);

    let p = m.value / n;

    let M = 0;
    for (let i = 0; i < m.value; i++) {
        const x = random(MAX_RAND);
        const k1 = Math.trunc(MAX_RAND / x);
        const y = random(MAX_RAND);
        const k2 = Math.trunc(MAX_RAND / y);

        if (k1 === k2) {
            M++;
        }
    }

    const P = M / m.value;

    function C(k: number, n: number) {
        return fact(n) / (fact(k) * fact(n - k));
    }

    function fact(n: number): number {
        return (n !== 1) ? n * fact(n - 1) : 1;
    }
</script>