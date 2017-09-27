<template>
  <div class="home">
    <!-- top row -->
    <div class="row">
      <div class="col-xs-12 top-row">
        <weather></weather>
      </div>
    </div>

    <!--middle row  -->
    <div class="row">
      <div class="col-xs-12 middle-row">
        <div id="time-display" class="clock-container">
          <clock></clock>
          <name></name>
        </div>
      </div>
    </div>




  </div>
</template>

<script>
  import Clock from './Clock'
  import Photo from './Photo'
  import Name from './Name'
  import Quote from './Quote'
  import Todo from './Todo'
  import Weather from './Weather'

  export default {
    name: 'home',
    data() {
      return {
      }
    },
    components: {
      Clock,
      Photo,
      Name,
      Quote,
      Todo,
      Weather
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>