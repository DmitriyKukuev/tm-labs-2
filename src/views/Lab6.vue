<template>
    <div class="flex"
         v-for="(i, line) in heatInfo"
         :key="line"
    >
        <div class="h-5 w-5 border border-gray-500"
             :style="{background: `rgb(${getRGBC(j * 100)})`}"
             v-for="(j, column) in i"
             :key="column"
             :data-line="line"
             :data-column="column"
             :data-value="j"
        ></div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const lambda = 92;
const l = 5 * (10 ** -3);
const S =  25 * (10 ** -6);
const R = 8.314;
const i = 6;

const w = (2 * lambda * S) / (l * R * i);

const dt = 1;

const n = 9;
const m = 51;

const getRGBC = (perc: number) => {
    const color = Math.round(255 - 255 * perc / 100);
    return `${color}, ${color}, ${color}`;
}

const table = Array.from(Array(n), () => Array(m).fill(1));
table[8][23] = 1000;
table[8][24] = 1000;
table[8][25] = 1000;

const heatInfo = ref(Array.from(Array(n), () => Array(m).fill(1)));
heatInfo.value[8][23] = 1000;
heatInfo.value[8][24] = 1000;
heatInfo.value[8][25] = 1000;

let T1 = 0;
let T2 = 0;
let T3 = 0;
let T4 = 0;

function heat() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            T1 = 0;
            if (i - 1 >= 0) {
                T1 = table[i][j] - w * dt * (heatInfo.value[i][j] - heatInfo.value[i - 1][j]);
            }

            T2 = 0;
            if (i + 1 < n) {
                T2 = table[i][j] - w * dt * (heatInfo.value[i][j] - heatInfo.value[i + 1][j]);
            }

            T3 = 0;
            if (j - 1 >= 0) {
                T3 = table[i][j] - w * dt * (heatInfo.value[i][j] - heatInfo.value[i][j - 1]);
            }

            T4 = 0;
            if (j + 1 < m) {
                T4 = table[i][j] - w * dt * (heatInfo.value[i][j] - heatInfo.value[i][j + 1]);
            }

            heatInfo.value[i][j] = (T1 + T2 + T3 + T4) / 4;
            table[i][j] = (T1 + T2 + T3 + T4) / 4;
        }
    }
}

let time = 0;

let id = setInterval( () => {
    heat();

    time += dt;

    if (time > n * m) {
        clearInterval(id);
    }
}, dt * 10);

</script>
