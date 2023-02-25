<template>
    <div class="grid grid-cols-2">
        <div>
            <NumberInput v-model="N" name="N"/>
        </div>

        <div class="h-96">
            <Line :data="data" :options="options"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from "vue";
    import {random} from "@/helper";
    import NumberInput from '@/components/NumberInput.vue';
    import type {ChartData} from "chart.js";
    import {options, defaultData} from "@/chart";
    import { Line } from 'vue-chartjs';
    import {
        CategoryScale,
        Chart as ChartJS,
        Legend,
        LinearScale,
        LineElement,
        PointElement,
        Title,
        Tooltip
    } from "chart.js";

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const data = ref<ChartData>();

    const MAX_RAND = 50;

    const N = ref<number>(20000);

    function randCube() {
        data.value = defaultData();

        const P = [];
        let M = 0;

        for (let i = 0; i < N.value; i++) {
            const x = random(0, MAX_RAND);
            const k1 = Math.trunc(MAX_RAND / x);
            const y = random(0, MAX_RAND);
            const k2 = Math.trunc(MAX_RAND / y);

            if (k1 === k2) {
                M++;
            }

            P.push(M/i);
        }

        const step = N.value / 100;

        for (let i = 0; i < N.value; i += step) {
            data.value.labels?.push(i + 1);
            data.value.datasets[0].data.push(P[i]);
        }
    }

    randCube();

    watch([N], randCube);
</script>