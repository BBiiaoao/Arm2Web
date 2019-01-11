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
            <div class="reactivePowerChart chart">
                <chart v-if="showChart" :parameter="reactiveElectric" :name="name[5]"></chart>
            </div>
            <div class="reactivePowerChart chart">
                <chart v-if="showChart" :parameter="activeElectric" :name="name[6]"></chart>
            </div>
            <div class="reactivePowerChart chart">
                <chart v-if="showChart" :parameter="dcCurrent" :name="name[7]"></chart>
            </div>
            <div class="reactivePowerChart chart">
                <chart v-if="showChart" :parameter="dcElectric" :name="name[8]"></chart>
            </div>
            <div class="reactivePowerChart chart">
                <chart v-if="showChart" :parameter="dcVoltage" :name="name[9]"></chart>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Chart from './components/Chart'


    export default {
        name: 'app',
        components: {
            Chart,
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                showChart: false,
                name: ["交流电压", "频率", "电流", "有功功率", "无功功率","电压", "频率", "电流", "有功功率", "无功功率"],
                voltage: [],
                frequency: [],
                current: [],
                activePower: [],
                reactivePower: [],
                reactiveElectric: [],
                activeElectric: [],
                dcCurrent: [],
                dcElectric: [],
                dcVoltage: [],
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例

        },
        methods: {
            getData() {
                this.$axios.get("/api/arm2web/api/data?address=1")
                    .then(
                        res => {
                            console.log(res.data.data);
                            const self = this;
                            const Data = res.data.data;
                            Data.forEach((item, index) => {
                                let measureData=item.measureData;
                                this.addObj(this.voltage, index, measureData.voltage);
                                this.addObj(this.frequency, index, measureData.frequency);
                                this.addObj(this.current, index, measureData.current);
                                this.addObj(this.activePower, index, measureData.activePower);
                                this.addObj(this.reactivePower, index, measureData.reactivePower);
                                this.addObj(this.reactiveElectric, index, measureData.reactiveElectric);
                                this.addObj(this.activeElectric, index, measureData.activeElectric);
                                this.addObj(this.dcCurrent, index, measureData.dcCurrent);
                                this.addObj(this.dcElectric, index, measureData.dcElectric);
                                this.addObj(this.dcVoltage, index, measureData.dcVoltage);
                            });
                            this.showChart = true;
                            setTimeout(function () {
                                self.getData();
                                self.reload();
                            }, 2);//2秒后定时发送请求
                        }
                    );
            },
            reload() {
                this.showChart = false;
                this.$nextTick(() => {
                    this.showChart = true
                })
            },
            addObj(accept, index, obj) {
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

    .chart {
        margin-bottom: 20px;
    }
</style>
