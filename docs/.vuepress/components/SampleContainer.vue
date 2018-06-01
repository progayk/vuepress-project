<template>
    <div>
        <button @click="isDisplayed = !isDisplayed">See Code</button>
        <br>
        <div v-show="isDisplayed">
            <pre style="color: white">
                <code><slot></slot></code></pre>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isDisplayed: false
        }
    }
}
</script>

