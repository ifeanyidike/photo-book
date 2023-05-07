<template>
    <div>
        <header class="header">
            <h1>Connect people &amp; spaces</h1>
        </header>

        <div v-if="loading">Loading...</div>
        <div v-else>
            <ImageList :items="items" class="image-list" />
            <button >
                <input 
                    @change="handleUploadImage" 
                    type="file" 
                    class="file"
                    accept="image/png, image/jpeg, image/jpg"
                >
                Upload image
            </button>
        </div>
        
        
    </div>
</template>

<script setup>
    const config = useRuntimeConfig()
    const { baseURL } = config.public || {}
    const items = ref([])
    const loading = ref(false)
    const fetchImages = async() => {
        const { data, pending } = await useFetch(`${baseURL}/images`)
        
        items.value = data.value
        loading.value = pending.value   
    }
    
    fetchImages()

    const handleUploadImage = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('img', file);
        formData.append('itemSize', items.value.length)

        await $fetch(`${baseURL}/upload-image`, {
            method: 'POST',
            body: formData,
            onResponse(context) {
                items.value.push(context.response._data)
            }
        })
    }
</script>

<style scoped>
    .header {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 500;
        margin: 20px 15px;
    }
    .image-list{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }

    button {
        display: block;
        margin: 0 auto;
        width: 120px;
        height: 40px;
        position: relative;
        border-radius: 10px;
        border: 0;
        cursor: pointer;
        background-color: #4A52FF;
        color: #FFF;
        font-size: 1rem;
    }

    input[type="file"]{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        .image-list{
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 470px) {
        .image-list{
            grid-template-columns: 1fr;
        }
    }
</style>