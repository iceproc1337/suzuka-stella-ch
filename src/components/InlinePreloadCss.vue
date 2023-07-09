<script setup>
let props = defineProps({
    href: { type: String, required: true },
    integrity: { type: String }
})

</script>
<template>
    <link rel="preload" :href="props.href" :integrity="integrity" crossorigin="anonymous" as="style"
        onload="this.onload=null;this.rel='stylesheet'" />
    <noscript>
        <link rel="stylesheet" :href="props.href" :integrity="integrity" crossorigin="anonymous" />
    </noscript>
</template>
