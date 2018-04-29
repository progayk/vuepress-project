<template>
    <div>
        <strong>
            {{ message }}
        </strong>
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: "I'm coming from MyComp.vue file!!!"
        }
    }
}
</script>

<style scoped>
    strong {
        color: red;
    }
</style>