<template>
  <div id="app">
    <h1>hhhh</h1>
    <div ref="chartsContainer" class="chartsContainer">
      <h1>jj</h1>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';


export default {
  name: 'app',
  data(){
    return{
      voltage:[],
      frequency:[],
      current:[],
      activePower:[],
      reactivePower:[]
    }
  },
  created() {
      this.$axios.get("120.78.191.131:8080/arm2web/socket/json")
              .then(res=>{
                console.log(res);
              })
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.chartsContainer);
  // 绘制图表
    myChart.setOption({
      title: { text: 'voltage' },
      tooltip: {},
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .chartsContainer{
    width:80%;
    height: 400px;
  }
</style>
