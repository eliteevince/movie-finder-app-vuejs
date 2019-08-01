<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
  name: "app",
  components: {
  }
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    float: left;
    position: absolute;
    width: 100%;
    position: absolute;
    background-color: #ccc;
    top: 0;
    padding-top: 50px;
    bottom: 0;
}
</style>
