<template>
    <div class="flex flex-col gap-2">
        <RouterLink
            v-for="route in $router.options.routes"
            :key="route.path"
            :to="route.path"
            active-class="border-emerald-400 text-emerald-500"
            class="flex items-center p-3 bg-white rounded-md transition-colors
            hover:text-emerald-500"
        >{{ route.name }}</RouterLink>
    </div>
</template>