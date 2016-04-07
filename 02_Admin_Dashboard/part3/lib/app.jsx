var Range=React.createClass({
    render:function(){
        return(
            <div>
                <span className="range-span">
                    <svg width="10" height="10">
                        <circle cx="5" cy="5" r="5" fill="#e58c72"/>
                    </svg>
                    <span className="padding-left-5">7 days</span>
                </span>
                <span className="range-span">
                    <svg width="10" height="10">
                        <circle cx="5" cy="5" r="5" fill="#8f8f8f"/>
                    </svg>
                    <span className="padding-left-5">30 days</span>
                </span>
            </div>
        );
    }
});

var Panel=React.createClass({
    render:function() {
        return (
            <div className="bg">
                {this.props.children}
            </div>
        );
    }
});

var PanelHeader=React.createClass({
    propTypes: {
        title:React.PropTypes.string
    },
    render: function () {
        return (
            <div className="panel-header">
                <div className="pull-left panel-title">{this.props.title}</div>
                <div className="pull-right line-height-30">
                    {this.props.children}
                </div>

            </div>
        );
    }
});


var MainRangeSelection=React.createClass({
    render:function(){
        return(
            <div className="row range-custom">
                <div className="range-custom-child">
                    <Range />
                </div>
            </div>
        );
    }
});

var Cards=React.createClass({
    render:function(){

        var color=['#53c79f','#64b0cc','#7a6fca','#ca6f96','#e58c72','#e5c072'];

        var cards=color.map(function(d,i){
            var style={
                'backgroundColor':d
            };
            return (
                <div className="col-xs-2 custom_padding margin-below-20" key={i}>
                    <div className="card" style={style}>
                        <div className="card_header">
                            <div className="pull-left">
                                Visitors
                            </div>
                            <div className="pull-right">
                                70%
                            </div>
                        </div>
                        <hr className="hr-custom"/>
                        <div className="card_body">
                            3,502
                        </div>
                    </div>
                </div>
            );
        });

        return(
            <div className="row">
                {cards}
            </div>
        );
    }
});


var SubContainer=React.createClass({
    render:function(){
        return(
            <div className="row">
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Traffic Source">
                            <Range/>
                        </PanelHeader>
                    </Panel>
                </div>
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Traffic Source">
                            <Range/>
                        </PanelHeader>
                    </Panel>
                </div>
            </div>
        );
    }
});


var MainContainer=React.createClass({
    render:function(){

        var data=[];
        var parseDate = d3.time.format("%m-%d-%Y").parse;

        for(var i=0;i<15;++i){

            var d={day:moment().subtract(i, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 80) + 50)};
            d.date = parseDate(d.day);
            data[i]=d;
        }

        console.log(JSON.stringify(data));


        var dataArea=[];

        for(var i=0,j=0;i<15;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 30) + 5),type:'A'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(var i=15,j=0;i<30;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 40) + 20),type:'B'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(var i=30,j=0;i<45;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 50) + 30),type:'C'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }



        var margin={
            top: 20, right: 30, bottom: 20, left: 50
        };


        return(
            <div className="row">
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Interaction Analysis">
                            <Range/>
                        </PanelHeader>

                        <D3TimeAreaChart data={dataArea} xData="date" yData="count" type="type" margin={margin}
                                         yMaxBuffer={10} id="multi-area-chart" interpolations="cardinal">
                            <yGrid orient="left" className="y-grid" ticks={5}/>
                            <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                            <yAxis orient="left" className="axis" ticks={5}/>
                            <area className="area" fill="#ca6f96" value="C"/>
                            <area className="area" fill="#53c79f" value="B"/>
                            <area className="area" fill="#e58c72" value="A"/>

                        </D3TimeAreaChart>

                    </Panel>
                </div>
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Traffic Trend">
                            <Range/>
                        </PanelHeader>
                        <D3TimeLineChart data={data} xData="date" yData="count" margin={margin}
                                         yMaxBuffer={10} id="line-chart">
                            <defs>
                                <gradient color1="#fff" color2="#53c79f" id="area"/>
                            </defs>
                            {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
                            <yGrid orient="left" className="y-grid" ticks={5}/>
                            <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                            <yAxis orient="left" className="axis" ticks={5}/>
                            <area className="area" fill="url(#area)"/>
                            <path className="line shadow" strokeLinecap="round"/>
                            <dots r="5" format="%b %e" removeFirstAndLast={false}/>
                            <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
                        </D3TimeLineChart>
                    </Panel>
                </div>
            </div>
        );
    }
});


var Page=React.createClass({
    render:function(){
        return(
            <div className="container">
                <MainRangeSelection />
                <Cards />
                <MainContainer />
                <SubContainer />
            </div>
        );
    }
});

ReactDOM.render(<Page/>,document.getElementById("body"));