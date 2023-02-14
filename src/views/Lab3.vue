<template>
    <div class="grid grid-cols-2">
        <div>
            <NumberInput v-model="M" name="M"/>

            <span class="text-gray-600 text-xl">количество лампочек</span>
            <NumberInput v-model="k" name="k"/>

            <span class="text-gray-600 text-xl">число опытов</span>
            <NumberInput v-model="N" name="N"/>
        </div>

        <div class="h-96">
            <Line :data="data" :options="options"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import NumberInput from '@/components/NumberInput.vue';
    import {ref, watch} from "vue";
    import { Line } from 'vue-chartjs';
    import type {ChartData} from "chart.js";
    import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js';

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const data = ref<ChartData>({
        labels: [], // к
        datasets: [
            {
                label: 'Mk (k)',
                data: [], // Mk
                fill: false,
                borderColor: '#e74062',
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
            }
        ]
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const M = ref<number>(1000);
    const k = ref<number>(10);
    const N = ref<number>(5000);

    for (let i = 0; i < k.value; i++) { // 1
        let Mk = 0;

        for (let j = 0; j < N.value; j++) { // 2
            const tau = [];

            for (let l = 0; l < i + 1; l++) { // 3
                const y = Math.random();
                tau.push(-M.value * Math.log(y));
            }

            const t = Math.min(...tau);
            Mk += t;
        }
        Mk /= N.value;

        data.value.labels?.push(i + 1);
        data.value.datasets[0].data.push(Mk);
    }
</script>