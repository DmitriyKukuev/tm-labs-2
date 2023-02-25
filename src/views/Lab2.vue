<template>
    <div class="grid grid-cols-2">
        <div>
            <NumberInput v-model="N" name="особей" in-column/>
            <NumberInput v-model="n" name="контактов" in-column/>
            <NumberInput v-model="p" name="вероятность заражения" in-column/>
            <NumberInput v-model="k" name="сколько дней заразна" in-column/>
            <NumberInput v-model="illBefore" name="заболевших до" in-column/>
        </div>

        <div class="h-96">
            <Line :data="data" :options="options"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from "vue";
    import NumberInput from '@/components/NumberInput.vue';
    import { Line } from 'vue-chartjs';
    import type {ChartData} from "chart.js";
    import {defaultData, options} from "@/chart";
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

    const data = ref<ChartData>();

    const N = ref<number>(5000); // особей
    const n = ref<number>(3); // контактов
    const p = ref<number>(0.05); // вероятность заражения
    const k = ref<number>(7); // сколько дней заразна
    const illBefore = ref<number>(20); // заболевших до

    const DAYS = 100;

    // const arr = [];
    //
    // while(true) {
    //     arr.push(1);
    // }
    
    function epidemic() {
        data.value = defaultData('y(k)');

        const z = Array(N.value)
            .fill(0, 0, N.value - illBefore.value)
            .fill(1, N.value - illBefore.value, N.value);

        for (let day = 0; day < DAYS; day++) {
            let y = 0;

            for (let i = 0; i < N.value; i++) {
                if (z[i] > 0) {
                    z[i]++;
                }

                const indexes = Array.from(Array(10).keys());
                indexes.splice(i, 1)

                for (let j = 0; j < n.value; j++) {
                    const randIndex = Math.floor(Math.random() * indexes.length);
                    const index = indexes[randIndex];

                    const infectionProb = Math.random() < p.value;

                    if (
                        z[i] === 0
                        && z[index] > 0
                        && z[index] <= k.value
                        && infectionProb
                    ) {
                        z[i]++;
                    }

                    if (
                        z[index] === 0
                        && z[i] > 0
                        && z[i] <= k.value
                        && infectionProb
                    ) {
                        z[index]++;
                    }
                }

                if (z[i] > 0 && z[i] <= k.value) {
                    y++;
                }
            }

            data.value.labels?.push(day + 1);
            data.value.datasets[0].data.push(y);
        }
    }

    epidemic();

    watch([N, n, p, k, illBefore], epidemic);
</script>