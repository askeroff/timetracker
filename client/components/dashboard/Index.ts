"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
// @flow
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var moment_timezone_1 = require("moment-timezone");
var dashboard_1 = require("../../actions/dashboard");
var DatePicker_1 = require("./DatePicker");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dashboard: [],
            chartView: false,
            defaultShow: 'today',
            startDate: moment_timezone_1["default"](new Date()),
            endDate: moment_timezone_1["default"](new Date()),
            focusedInput: null
        };
        _this.setDates = function (startDate, endDate) {
            _this.setState({
                startDate: moment_timezone_1["default"](startDate),
                endDate: moment_timezone_1["default"](endDate)
            });
        };
        _this.loadData = function (startDate, endDate) {
            var hour = _this.props.user.startsDay || 0;
            var start = moment_timezone_1["default"](startDate).set({
                hour: hour,
                minute: 0,
                second: 0,
                millisecond: 0
            });
            if (moment_timezone_1["default"](start).isAfter(new Date())) {
                start.subtract(1, 'days');
            }
            var end = moment_timezone_1["default"](endDate)
                .add(1, 'days')
                .set({ hour: hour, minute: 0, second: 0, millisecond: 0 });
            _this.props.handleDashboardData(start.valueOf(), end.valueOf());
        };
        _this.setDefaultShow = function (str) {
            _this.setState({
                defaultShow: str
            });
        };
        _this.setFocusedInput = function (input) {
            _this.setState({ focusedInput: input });
        };
        _this.toggleView = function () {
            _this.setState(function (state) { return ({
                chartView: !state.chartView
            }); });
        };
        _this.getView = function () {
            if (_this.state.chartView) {
                return dashboard = {};
                {
                    data: _this.state.dashboard,
                        timestamp;
                    Date.now();
                }
            }
            />;
            ;
        };
        return _this;
    }
    Dashboard.prototype.componentDidMount = function () {
        var _a = this.state, startDate = _a.startDate, endDate = _a.endDate;
        this.loadData(startDate, endDate);
    };
    Dashboard.prototype.componentDidUpdate = function (_a) {
        var dashboardData = _a.dashboardData;
        if (this.props.dashboardData.isFetching === false &&
            dashboardData.isFetching === true) {
            this.setState({
                dashboard: this.props.dashboardData.prepared
            });
        }
    };
    Dashboard.defaultProps = {
        dashboardData: {}
    };
    return Dashboard;
}(react_1["default"].Component));
;
render();
{
    var buttonText = this.state.chartView ? 'Text' : 'Charts';
    return className = "dashboard" >
        className;
    "dashboard__header" >
        onClick;
    {
        this.toggleView;
    }
    className = "dashboard__button" > {}(templateObject_1 || (templateObject_1 = __makeTemplateObject(["View ", ""], ["View ", ""])), buttonText);
}
/button>
    < DatePicker_1["default"];
setDates = { "this": .setDates };
startDate = { "this": .state.startDate };
endDate = { "this": .state.endDate };
setDefaultShow = { "this": .setDefaultShow };
defaultShow = { "this": .state.defaultShow };
focusedInput = { "this": .state.focusedInput };
setFocusedInput = { "this": .setFocusedInput };
loadData = { "this": .loadData }
    /  >
    /div>;
{
    this.getView();
}
/div>;
;
var mapStateToProps = function (state) { return ({
    dashboardData: state.dashboard,
    user: state.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleDashboardData: function (start, end) {
        dispatch(dashboard_1.fetchPosts());
        dispatch(dashboard_1.getDashboardData(start, end));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Dashboard);
var templateObject_1;