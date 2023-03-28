<template>
    <div>Детали A</div>
    <pre>{{ A.join(' ') }}</pre>

    <div>Детали B</div>
    <pre>{{ B.join(' ') }}</pre>

    <div>Время: {{ minTime }}</div>
    <div>Последовательность: {{ order.join(', ') }}</div>


    <div class="border-b border-l w-full h-96 border-black mt-10 relative">
        <div v-for="(value, index) in aArr"
             :key="value"
             class="absolute bg-amber-300 border border-black top-28 h-8"
             :style="{left: `${value * scale}px`, width: `${A[order[index]] * scale}px`}"
        >{{ order[index] }}</div>

        <div v-for="(value, index) in bArr"
             :key="value"
             class="absolute bg-cyan-300 border border-black bottom-28 h-8"
             :style="{left: `${value * scale}px`, width: `${B[order[index]] * scale}px`}"
        >{{ order[index] }}</div>
    </div>

</template>

<script setup lang="ts">
    import {ref} from "vue";

    const scale = ref(5);

    const A = ref([10, 20, 15, 30, 40, 5]);
    const B = ref([50, 70, 30, 20, 10, 30]);
    const list = Array.from({length: 6}, (item, index) => index);

    const permutator = (inputArr: any[]) => {
        let result: any[] = [];

        const permute = (arr: any[], m = []) => {
            if (arr.length === 0) {
                result.push(m);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next));
                }
            }
        }

        permute(inputArr);

        return result;
    }

    const permutations = permutator(list);

    function optimizing() {
        const aStart = [];
        const bStart = [];
        const time = [];

        for (let perm of permutations) {
            let aTime = 0;
            let bTime = 0;
            let aIndex = 0;
            let bIndex = 0;

            const aArr = [];
            const bArr = [];
            let sumTime = 0;

            while (bIndex < perm.length) {
                if (sumTime >= aTime && aIndex < perm.length) {
                    aArr.push(aTime);
                    aTime += A.value[perm[aIndex]];
                    aIndex++;
                }

                if (
                    sumTime >= bTime
                    && bIndex < perm.length
                    && aIndex > bIndex
                ) {
                    if (
                        sumTime > aArr[bIndex] + A.value[perm[bIndex]]
                        || sumTime > bArr[bIndex] + B.value[perm[bIndex]]
                    ) {
                        bArr.push(sumTime - 1);
                        bTime = sumTime + B.value[perm[bIndex]];
                        bIndex++;
                    }
                }

                sumTime++;
            }

            aStart.push(aArr);
            bStart.push(bArr);
            time.push(bTime);
        }

        return {time, aStart, bStart};
    }

    const {time, aStart, bStart} = optimizing();

    const minTime = ref(Math.min(...time));
    const minIndex = time.indexOf(minTime.value);

    const order = ref(permutations[minIndex]);
    const aArr = ref(aStart[minIndex]);
    const bArr = ref(bStart[minIndex]);
</script>
