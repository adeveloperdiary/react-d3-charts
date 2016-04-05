var StackChart=React.createClass({
    getDefaultProps: function() {
        return {
            width: 250,
            height: 60,
            chartId: 't_chart'
        };
    },
    render:function(){

        var data=[
            { month:'jan', new:20, old:80 },
            { month:'mar', new:60, old:40 },
            { month:'apr', new:75, old:25 },
            { month:'may', new:55, old:45 },
            {
                month:'jun', new:80, old:20
            },
            {
                month:'jul', new:70, old:30
            },
            {
                month:'aug', new:65, old:35
            },
            {
                month:'sep', new:80, old:20
            },
            {
                month:'oct', new:60, old:40
            },
            {
                month:'nov', new:85, old:15
            },
            {
                month:'dec', new:60, old:70
            }

        ];

        var margin={top:5,right:5,bottom:5,left:5};

        var transform='translate('+margin.left+','+margin.top+')';

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, this.props.width], .35);

        var y = d3.scale.linear()
            .rangeRound([this.props.height, 0]);

        var color = d3.scale.ordinal()
            .range(["#74d3eb", "#58657f","#98abc5"]);

        color.domain(d3.keys(data[0]).filter(function(key){
            return key !== "month";
        }));

        data.forEach(function(d) {
            var y0 = 0;
            d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
            d.ages.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
        });

        x.domain(data.map(function(d) { return d.month; }));

        var _self=this;

        var rects = (data).map(function(d, i) {
            var transformG="translate(" + x(d.month) + ",0)";

            var ret=(d.ages).map(function(d1,j){

                return (
                    <rect fill={color(d1.name)}
                          y={y(d1.y1)} key={j}
                          height={y(d1.y0) - y(d1.y1)}
                          width={x.rangeBand()}/>
                );
            });

            return (
                <g className="state" transform={transformG} key={i}>
                    {ret}
                </g>
            )
        });

        return(
            <svg id={this.props.chartId} width={this.props.width}
                 height={this.props.height} className="shadow">
                <g transform={transform}>
                    {rects}
                </g>
            </svg>
        );
    }

});

window.StackChart=StackChart;