<template>
    <div class="mod-container flex">
        <!-- **************
            Left
         ************* -->
        <div class="mod-left flex-spread flareOutLeft">
            <div class="flex" :class="{'active': activeModifier === 1}">
                <span>min</span>
            </div>
            <div class="mod-arm"></div>
        </div>

        <div class="mod-top-left flex-spread flareOutLeftXL">
            <div class="flex" :class="{'active': activeModifier === 2}">
                <span>dim</span>
            </div>
            <!-- <div class="mod-arm"></div> -->
        </div>

        <!-- **************
            RIGHT
         ************* -->
        <div class="mod-right flex-spread flareOutRight" >
            <div class="mod-arm"></div>
            <div class="flex" :class="{'active': activeModifier === 5}">
                <span>maj</span>
            </div>
        </div>

        <div class="mod-top-right flex-spread flareOutRightXL">
            <!-- <div class="mod-arm"></div> -->
            <div class="flex" :class="{'active': activeModifier === 4}">
                <span>aug</span>
            </div>
        </div>

        <!-- **************
            TOP
         ************* -->
        <div class="mod-top flareOutTop">
            <div class="flex" :class="{'active': activeModifier === 3}">
                <span>7</span>
            </div>
            <div class="mod-arm"></div>
        </div>
        <!-- **************
            BOTTOM
         ************* -->
        <div class="mod-bottom flareOutBottom">
            <div class="flex" :class="{'active': activeModifier === 0}">
                <span style="transform: rotate(45deg)">+</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    watch:{
        activeModifier(newVal){
            this.$store.commit('setModifier', newVal);
        }
    },
    computed:{
        activeModifier(){
            let thresh = window.innerHeight/12;
            let distance = this.$store.state.view.distanceTraveled;
            switch (true) {
                case distance.x > thresh && distance.y <= thresh:
                    //left
                    return 1

                case (-1 * thresh) > distance.x  && distance.y <= thresh:
                    //right
                    return 5

                case distance.x > thresh && distance.y > thresh:
                    //top-left
                    return 2

                case (-1 * thresh) > distance.x  && distance.y > thresh:
                    //top-right
                    return 4
                
                case (-1 * thresh) < distance.x  && distance.y > thresh:
                    //top
                    return 3

                case distance.y < ( -1 * (window.innerHeight/15)):
                    //bottom
                    return 0
            
                default:
                    return -1
            }
        }
    },
}
</script>

<style>

</style>
