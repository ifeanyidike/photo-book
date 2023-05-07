<template>
    <div>
        <div v-for="item in items">
            <ImageDetail :item="item" />
        </div>
    </div>
</template>

<script setup>
    const {items} = defineProps(["items"])
    
</script>

<style  scoped>
   

</style>