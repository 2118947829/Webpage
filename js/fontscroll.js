// JavaScript Document
(function ($) {
    $.fn.myScroll = function (options) {
        //默认配置
        var defaults = {
            speed: 60,  //滚动速度,值越大速度越慢
            rowHeight: 24 //每行的高度
        };
        var opts = $.extend({}, defaults, options), intId = [];
        function marquee(obj, step) {
            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }
        this.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);
            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });
    }
})(jQuery);
$(document).ready(function () {
    var whei = $(window).width()
    $("html").css({ fontSize: whei / 20 })
    $(window).resize(function () {
        var whei = $(window).width()
        $("html").css({ fontSize: whei / 20 })
    });
});
$(function () {

    start();
    setInterval(start, 1000 * 60 * 10);
    function start() {
        echarts_1();
        echarts_2();
    }
    function echarts_1() {
        var myChart = echarts.init(document.getElementById('echart1'));
        var offices = ['标段一', '标段二', '标段三', '标段四', '标段五'];
        var pie_data2 = [56, 65, 73, 12, 33, 83, 17];
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 500,
                max: 600,
                inRange: {
                    //colorLightness: [0, 1]
                }
            },
            series: [{
                name: '分布',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['50%', '50%'],
                color: ['#37cde6', '#b7e47e', '#3064d9', '#4aed61', '#8d6fe8', ''],
                data: [{
                    value: pie_data2[0],
                    name: offices[0]
                },
                {
                    value: pie_data2[1],
                    name: offices[1]
                },
                {
                    value: pie_data2[2],
                    name: offices[2]
                },
                {
                    value: pie_data2[3],
                    name: offices[3]
                }
                ].sort(function (a, b) {
                    return a.value - b.value
                }),
                roseType: 'radius',
                label: {
                    normal: {
                        formatter: ['{d|{d}%}', '{b|{b}}'].join('\n'),
                        rich: {
                            d: {
                                color: 'rgb(241,246,104)',
                                fontSize: 14,
                                fontWeight: 'bold',
                            },
                            b: {
                                color: 'rgb(98,137,169)',
                                fontSize: 12,
                            },
                        },
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgb(98,137,169)',
                        },
                        smooth: 0.2,
                        length: 5,
                        length2: 9,
                    }
                },
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 50,
                    }
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        // })
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function echarts_2() {
        var myChart = echarts.init(document.getElementById('echart2'));
        var floor = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        var bar_data = [[150, 230, 180, 110, 100, 140, 160, 130, 221, 213, 210, 200]]
        option = {
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: { type: 'shadow' },

            // },
            //提示框
            tooltip: {
                // show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
            },
            legend: {
                x: 'center',
                y: '0',
                icon: 'circle',
                itemGap: 8,
                textStyle: { color: 'rgba(255,255,255,.5)' },
                itemWidth: 10,
                itemHeight: 10,
            },
            grid: {
                left: '10',
                top: '30',
                right: '15',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name: "单位（小时）",
                data: floor,
                axisLine: { show: false },
                axisLabel: {
                    textStyle: {
                        // color: 'rgba(255,255,255,.6)',
                        color: '#fff',
                        fontSize: 14
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
            },

            yAxis: {
                type: 'value',
                name: "单位（万元）", 
                position: 'left',
                splitNumber: 4,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.05)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                },
            },
            series: [{
                // name: project[0],
                type: 'bar',
                barWidth: '30%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8bd46e'
                        }, {
                            offset: 1,
                            color: '#03b48e'
                        }]),
                        barBorderRadius: 20,
                    }
                },
                data: bar_data[0],
            }
            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
})
function updateClock() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; // 月份是从0开始的
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // 如果数字不足两位，前面补零
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // 更新显示的时间
    document.getElementById('Dtime').textContent = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    // 每秒更新时间
    setTimeout(updateClock, 1000);
}

// 页面加载完成后开始更新时间
window.onload = function () {
    updateClock();
};