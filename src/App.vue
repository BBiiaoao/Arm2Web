<template>
  <div id="app">
    <!--<h1>hhhh</h1>-->
    <div ref="chartsContainer" class="chartsContainer">
      <div class="voltageChart chart">
        <chart v-if="showChart" :parameter="voltage" :name="name[0]"></chart>
      </div>
      <div class="frequencyChart chart">
        <chart v-if="showChart" :parameter="frequency" :name="name[1]"></chart>
      </div>
      <div class="currentChart chart">
        <chart v-if="showChart" :parameter="current" :name="name[2]"></chart>
      </div>
      <div class="activePowerChart chart">
        <chart v-if="showChart" :parameter="activePower" :name="name[3]"></chart>
      </div>
      <div class="reactivePowerChart chart">
        <chart v-if="showChart" :parameter="reactivePower" :name="name[4]"></chart>
    </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Chart from './components/Chart'


export default {
  name: 'app',
  components:{
    Chart,
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      showChart:false,
      name:["电压","频率","电流","有功功率","无功功率"],
      voltage:[],
      frequency:[],
      current:[],
      activePower:[],
      reactivePower:[]
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例

  },
  methods:{
    getData(){
      this.$axios.get("/api/socket/json")
              .then(res=>{
                const self=this;
                const resData=res.data;
                resData.forEach((item,index)=>{
                  this.addObj(this.voltage,index,item.voltage);
                  this.addObj(this.frequency,index,item.frequency);
                  this.addObj(this.current,index,item.current);
                  this.addObj(this.activePower,index,item.activePower);
                  this.addObj(this.reactivePower,index,item.reactivePower);
                });
                this.showChart=true;
                setTimeout(function(){
                  self.getData();
                  self.reload();
                },2000);//2秒后定时发送请求
              });
    },
    reload(){
      this.showChart=false;
      this.$nextTick(()=>{
        this.showChart=true
      })
    },
    addObj(accept,index,obj){
      Vue.set(accept, index, obj)
    }
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
  .chart{
    margin-bottom: 20px;
  }
</style>
