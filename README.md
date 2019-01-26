# Arm2Web
这是一个监听充电桩电流电压的前端动态数据展示页面,前端每隔一定时间展示从后端的实时数据，并将这个数据以折线图和表格的简单可视化方式展示给用户看(主要是给给让我帮忙写这个页面的同学的不断改需求的sb项目答辩老师看)，折线图横坐标时间2s一次增长，数据也逐渐右移，实现动态增长，表格也能做到实时刷新数据展示
## 开发过程
虽然功能和界面都不难，但是还是出现了各种问题，特别是在实时数据传输这一块，因为后端没有用websoket接口，所以我被迫使用轮询axios的方法请求，果然处处是坑，问题和解决过程我也都用博客写出来了:[实时数据展示坑啊坑(一)](https://www.jianshu.com/p/1fc79a448fe7)
还有垃圾回收的问题，可以说让我也解决了很长时间
## 前端
>
- 项目搭建:基于vue-cli3
- 数据展示:使用的是echarts
- 数据请求:使用axios
- 界面UI:Element
>
## 后端
>
(好像不关我事,我同学使用springSSM写好接口我调用就完事了)
>
## 界面展示
![实时数据展示折线图](https://github.com/BBiiaoao/Arm2Web/blob/master/screenShot/showChart.png "数据展示图")
![实时数据展示表格](https://github.com/BBiiaoao/Arm2Web/blob/master/screenShot/showForm.png "数据展示表格")
