<template>
    <div class="min-h-screen flex flex-col">
        <header class="relative z-10 px-60 bg-white shadow">
            <nav class="flex gap-10 items-center ">
                <RouterLink
                    v-for="route in $router.options.routes"
                    :key="route.path"
                    :to="route.path"
                    active-class="border-emerald-400 text-emerald-500"
                    class="flex items-center h-16 border-b-2 text-base transition-colors
                    hover:border-emerald-400 hover:text-emerald-500"
                >{{ route.name }}</RouterLink>
            </nav>
        </header>

        <main class="px-60 py-5 flex-1 bg-gray-100">
            <Head :title="$route.name ?? 'title'"/>
            <RouterView/>
        </main>
    </div>
</template>

<script setup lang="ts">
    import {RouterLink, RouterView} from 'vue-router';
    import Head from '@/components/Head.vue';

</script>
