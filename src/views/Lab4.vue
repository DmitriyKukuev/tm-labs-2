<template>
    <div class="grid grid-cols-2">
        <div>
            <NumberInput v-model="a" name="a "/>
            <NumberInput v-model="tz" name="t3"/>
            <NumberInput v-model="t0" name="t0"/>
            <NumberInput v-model="requests" name="количество заявок" in-column/>
        </div>

        <div class="space-y-4">
            <div class="h-96">
                <Line :data="dataRejects" :options="options"/>
            </div>

            <div class="h-96">
                <Line :data="dataLoad" :options="options"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import NumberInput from '@/components/NumberInput.vue';
    import {ref, watch} from "vue";
    import { Line } from 'vue-chartjs';
    import type {ChartData} from "chart.js";
    import {options, defaultData} from "@/chart";
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

    const dataRejects = ref<ChartData>();
    const dataLoad = ref<ChartData>();
    const WINDOWS_MAX = 10;

    const a = ref<number>(1);
    const tz = ref<number>(5);
    const t0 = ref<number>(1);
    const requests = ref<number>(1000);

    function systemService() {
        dataRejects.value = defaultData('% отказов');
        dataLoad.value = defaultData('% загруженности окон');

        for (let i = 0; i < WINDOWS_MAX; i++) {
            let T = 0;
            let rejectCount = 0;
            const t = Array(i + 1).fill(0);

            for (let j = 0; j < requests.value; j++) {
                const y = Math.random();
                const tau = -1 / a.value * Math.log(y);

                T += tau;

                let isOccupied = true;

                for (let k = 0; k < i + 1; k++) {
                    if (t[k] < T) {
                        t[k] += tz.value;
                        isOccupied = false;
                        break;
                    }
                }

                if (isOccupied) {
                    const tm = Math.min(...t);

                    if (tm < T + t0.value) {
                        t[i] += tz.value;
                    } else {
                        rejectCount++;
                    }
                }
            }

            dataRejects.value.labels?.push(i + 1);
            dataRejects.value.datasets[0].data.push(rejectCount);

            const x = ((requests.value - rejectCount) * tz.value) / (T * (i + 1)) * 100;

            dataLoad.value.labels?.push(i + 1);
            dataLoad.value.datasets[0].data.push(x);
        }

    }

    systemService();

    watch([a, tz, t0, requests], systemService);
</script>