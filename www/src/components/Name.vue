<template>
    <div class="name">
        <h1>Hi I'm a name</h1>
        <div v-if="changeName">
            <!-- Handle change name -->
            <form @submit.prevent="setName">
                <input class="name-input-control" type="text" name="nameInput" placeholder="What should I call you?" v-model="newName">
            </form>

        </div>
        <!-- normal display -->
        <div v-else>
            <a @click="changeName = !changeName">
                <h2>Good {{timeOfDay}}, {{userName}}</h2>
            </a>
        </div>


    </div>
</template>

<script>
    var today = new Date();
    var hour = today.getHours();
    var timeOfDay = '';

    if (hour >= 1 && hour < 12) {
        timeOfDay = 'morning';
    }
    else if (hour >= 12 && hour < 17) {
        timeOfDay = 'afternoon'
    }
    else if (hour >= 17) {
        timeOfDay = 'evening';
    }



    export default {
        name: 'name',
        data() {
            return {
                timeOfDay: timeOfDay,
                changeName: false,
                newName: ''
            }
        },
        computed: {
            userName() {
                return this.$store.state.preferredName
            }
        },
        methods: {
            setName() {
                debugger
                this.$store.dispatch("changePreferredName", this.newName);
                this.changeName = !this.changeName;
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>