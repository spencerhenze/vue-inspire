<template>
    <div class="clock">
        <h1>Hi I'm a clock</h1>
        <!--middle row  -->
        <!-- <a href="javascript:void(0)" onclick="toggleMilitaryTime()">
            <h1 id="clock" class="clock-display"></h1>
        </a> -->
        <div v-if="militaryTime">
            <a @click="militaryTime = !militaryTime">
                <h1 id="clock" class="clock-display">{{mTime}}</h1>
            </a>
        </div>
        <div v-else>
            <a @click="militaryTime = !militaryTime">
                <h1 id="clock" class="clock-display">{{nTime}}</h1>
            </a>
        </div>

    </div>
</template>

<script>
    var d = new Date();
    export default {
        name: 'clock',
        data() {
            return {
                militaryTime: false,
                mTime: d.toLocaleTimeString('en-US', { hour12: false }),
                nTime: d.toLocaleTimeString('en-US', { hour12: true })
            }
        },

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>