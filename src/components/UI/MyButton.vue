<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
    margin-left:20px; 
    padding: 10px 15px ;
    background-color: black;
    border:0px;
    color:white;
}
.btn:active {
    color: purple;
}
</style>