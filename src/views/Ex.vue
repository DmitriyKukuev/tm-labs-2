<template>
    <div v-html="infoStr.join('')"></div>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import {random} from "@/helper";

    const arrival = ref([10, 7])
    const stand = ref([15, 3])
    const M = 3;

    const load = Array(15 - M);

    const infoStr = ref<string[]>([]);

    const iterableEnd = 10;

    function portModel() {
        for (let pierCount = M; pierCount < iterableEnd; pierCount++) {
            const isFree = Array(pierCount).fill(true);
            const nextStandTime = Array(pierCount).fill(0);
            const portLoad = Array(pierCount).fill(0);

            let count = 0;

            for (let i = 0; i < iterableEnd - M; i++) {
                load[i] = 0;
            }

            let time = 0;
            let nextArrivalTime = 0;

            while(time < 720) {
                if (nextArrivalTime <= time) {
                    count++;

                    for (let i = 0; i < pierCount; i++) {
                        if (isFree[i]) {
                            isFree[i] = false;
                            nextStandTime[i] = time + getStandTime();
                            break;
                        }
                    }

                    nextArrivalTime = time + getArrivalTime();
                }

                for (let i = 0; i < pierCount; i++) {
                    if (nextStandTime[i] <= time) {
                        isFree[i] = true;
                    }

                    if (!isFree[i]) {
                        portLoad[i]++;
                    }
                }

                let loaded = 0;

                for (let i = 0; i < pierCount; i++) {
                    if (isFree[i]) {
                        loaded++;
                    }
                }

                load[pierCount - M] += loaded;
                time++;
            }

            let allPortsLoad = 0;

            for (let i = 0; i < pierCount; i++) {
                portLoad[i] /= 720;
                allPortsLoad += portLoad[i];
            }

            load[pierCount - M] /= 720;

            const str = `
            Портов = ${pierCount}<br>
            Поместились в порт = ${Math.round(load[pierCount - M] / pierCount * 100)}%<br>
            Средняя загрузка порта = ${Math.round(allPortsLoad / pierCount * 100)}%<br>
            <br>`

            infoStr.value.push(str);
        }
    }

    portModel();

    function getStandTime() {
        return stand.value[0] + random(-stand.value[1], stand.value[1]);
    }

    function getArrivalTime() {
        return arrival.value[0] + random(-arrival.value[1], arrival.value[1]);
    }
</script>
