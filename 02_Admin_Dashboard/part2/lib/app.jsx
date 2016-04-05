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

var Page=React.createClass({
    render:function(){
        return(
            <div className="container">
                <MainRangeSelection/>
                <Cards />
                <MainContainer />
                <SubContainer />
            </div>
        );
    }
});

ReactDOM.render(<Page />,document.getElementById("body"));