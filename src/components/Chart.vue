<template>
    <div class="echartContainer" ref="echartContainer">
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        inject:['reload'],
        name: "chart",
        props:{
            parameter:Array,
            name:String
        },
        created() {
        },
        mounted() {
            const myChart = echarts.init(this.$refs.echartContainer);
            // 绘制图表
            const time=this.getXtime();
            myChart.setOption({
                tooltip: {},
                xAxis: {
                    data: [time[0],time[1],time[2],time[3],time[4],time[5],
                        time[6],time[7],time[8],time[9],time[10],time[11],
                        time[12],time[13],time[14],]
                },
                yAxis: {},
                series: [{
                    name: this.name,
                    type: 'line',
                    data: [this.parameter[0], this.parameter[1], this.parameter[2], this.parameter[3], this.parameter[4],
                        this.parameter[5], this.parameter[6], this.parameter[7], this.parameter[8], this.parameter[9],
                        this.parameter[10], this.parameter[11], this.parameter[12], this.parameter[13], this.parameter[14]]
                    // data: [this.parameter[0], 3, 3, 4, 3,
                    //     4, 5, 5, 5, 5,
                    //     5, 5,5, 5, 5]
                }]
            });
        },
        methods:{
            getXtime(){
                const myDate = new Date();//获取系统当前时间
                const t=[];
                for(let i=1;i<16;i++){
                    if((myDate.getSeconds()-i*2)>0)
                        t.push(myDate.getHours()+":"+myDate.getMinutes()+":"+(myDate.getSeconds()-i*2))
                    else
                        t.push(myDate.getHours()+":"+(myDate.getMinutes()-1)+":"+(myDate.getSeconds()-i*2+60))
                }
                return t;
            }
        }
    }
</script>

<style scoped>
    .echartContainer{
        width:80%;
        height: 400px;
    }
</style>