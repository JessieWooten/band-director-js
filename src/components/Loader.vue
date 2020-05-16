<template>
    <div class="flex wave-loader" :style="(!!height ? 'height: '+height : '')">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {
props:{height:String}
}
</script>

<style lang="scss" scope>

.wave-loader {
    height: 10vh;
    & span{
        width: 5px;
        height: 10%;
        background: white;
        margin: 3px;
        animation: scale;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        &:nth-of-type(2){animation-delay: 100ms}
        &:nth-of-type(3){animation-delay: 200ms}
        &:nth-of-type(4){animation-delay: 300ms}
        &:nth-of-type(5){animation-delay: 400ms}
        &:nth-of-type(6){animation-delay: 500ms}
        &:nth-of-type(7){animation-delay: 600ms}
        &:nth-of-type(8){animation-delay: 700ms}
        &:nth-of-type(9){animation-delay: 800ms}
        &:nth-of-type(10){animation-delay: 900ms}
        
    }
}
@keyframes scale {
    0%{ height: 10%;}
    50%{height: 100%;} 
    10%{ height: 10%;} 
}
</style>
