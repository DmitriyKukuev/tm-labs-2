<template>
    <div class="grid grid-cols-2">
        <div>
            <NumberInput v-model="a" name="a"/>
            <NumberInput v-model="b" name="b"/>
            <NumberInput v-model="h" name="h"/>
        </div>

        <div class="h-96">
            <Line :data="data" :options="options"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import {random} from "@/helper";
    import NumberInput from '@/components/NumberInput.vue';
    import { Line } from 'vue-chartjs';
    import type {ChartData} from "chart.js";
    import {options} from "@/chart";
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

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

    const data = ref<ChartData>({
        labels: [],
        datasets: [
            {
                label: 'I',
                data: [],
                fill: false,
                borderColor: '#e74062',
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
            },
        ]
    });

    const a = ref<number>(1);
    const b = ref<number>(3);
    const h = ref<number>(20);

    function f(x: number) {
        return x ** 2 + 2 * x;
    }

    let N = 20000;
    let M = 0;
    const I = [];
    for (let i = 0; i < N; i++) {
        const x = random(a.value, b.value);
        const y = random(0, h.value);

        if (y < f(x)) {
            M++;
        }

        I.push((M / i) * (b.value - a.value) * h.value);
    }

    for (let i = 0; i < I.length; i+= 100) {
        data.value.labels?.push(i + 1);
        data.value.datasets[0].data.push(I[i]);
    }
</script>