<template>
    <NumberInput v-model="m" name="m"/>

    <span class="text-gray-400 text-xl">Вероятность:</span> <span class="text-xl">{{P}}</span>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import {C, random} from "@/helper";
    import NumberInput from '@/components/NumberInput.vue';

    const CUBE_TOSSES = 2;
    const MAX_RAND = 50;

    const m = ref<number>(20);
    let n = C(CUBE_TOSSES, m.value);

    let p = m.value / n;

    let M = 0;
    for (let i = 0; i < m.value; i++) {
        const x = random(0, MAX_RAND);
        const k1 = Math.trunc(MAX_RAND / x);
        const y = random(0, MAX_RAND);
        const k2 = Math.trunc(MAX_RAND / y);

        if (k1 === k2) {
            M++;
        }
    }

    const P = M / m.value;
</script>