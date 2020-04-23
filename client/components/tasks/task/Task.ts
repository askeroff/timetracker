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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
exports.__esModule = true;
// @flow
var React = require("react");
// import Swal from 'sweetalert';
var sweetalert2_1 = require("sweetalert2");
var sweetalert2_react_content_1 = require("sweetalert2-react-content");
var helpers_1 = require("../../../helpers");
var MySwal = sweetalert2_react_content_1["default"](sweetalert2_1["default"]);
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editName: '',
            showInput: false,
            showTimer: false,
            spinner: false,
            categoryID: _this.props.projectId
        };
        _this.getButtonProps = function () {
            var _a = _this.props, id = _a.id, name = _a.name, done = _a.done, taskDone = _a.taskDone, projectId = _a.projectId;
            var _b = _this.state, editName = _b.editName, showInput = _b.showInput, categoryID = _b.categoryID;
            var doneButtonValue = done ? 'undone' : 'done';
            return {
                done: done,
                id: id,
                projectId: projectId,
                handleDelete: _this.props.handleDelete,
                name: name,
                showInput: showInput,
                showTimer: _this.handleShowTimer,
                handleShowInput: _this.handleShowInput,
                handleRenaming: function () {
                    return _this.handleRenaming({
                        id: id,
                        name: editName,
                        newProject: categoryID
                    });
                },
                doneButtonValue: doneButtonValue,
                taskDone: taskDone
            };
        };
        _this.setMovetimeRef = function (element) {
            _this.moveTime = element;
        };
        _this.setDeletetimeRef = function (element) {
            _this.deleteTime = element;
        };
        return _this;
    }
    return Task;
}(React.Component));
 | null | undefined;
null;
moveTimeHTMLInputElement | null | undefined;
null;
handleNameInput = function (e) {
    _this.setState({ editName: e.currentTarget.value });
};
handleShowInput = function (name) {
    _this.setState({
        showInput: !_this.state.showInput,
        editName: name
    });
};
handleRenaming = function (params) {
    var id = params.id, name = params.name, newProject = params.newProject;
    if (_this.props.projectId !== params.newProject) {
        MySwal.fire({
            title: 'Read the options!',
            type: 'warning',
            showCancelButton: true,
            html: setDeleteRef = { "this": .setDeletetimeRef },
            setMoveRef: setMoveRef
        }),
            preConfirm;
        (function () { return [_this.moveTime.value, _this.deleteTime.value]; });
    }
    then(function (options) {
        if (options.value) {
            var moveTime = options.value[0] === 'true';
            var deleteTime = options.value[1] === 'true';
            _this.props.handleRename({
                id: id,
                name: name,
                currentProject: _this.props.projectId,
                timeSpent: _this.props.timeSpent,
                newProject: newProject,
                moveTime: moveTime,
                deleteTime: deleteTime
            });
        }
    });
};
{
    this.props.handleRename({
        id: id,
        name: name,
        newProject: newProject,
        currentProject: this.props.projectId
    });
    this.setState({
        showInput: false
    });
}
;
handleEnterButton = function (id, name) {
    _this.handleRenaming({ id: id, name: name, newProject: _this.state.categoryID });
    _this.setState({
        showInput: false
    });
};
changeSelect = function (e) {
    _this.setState({
        categoryID: e.currentTarget.value
    });
};
shouldShowTimer = function () {
    var _a = _this.props, id = _a.id, name = _a.name, projectId = _a.projectId, handleAddingTimeLog = _a.handleAddingTimeLog;
    var myProps = Object.assign({}, { id: id, taskName: name, project: projectId, handleAddingTimeLog: handleAddingTimeLog });
    if (_this.state.showTimer) {
        return key;
        {
            "timer" + id;
        }
        {
            myProps;
        }
        />;;
    }
    return null;
};
shouldShowInput = ();
React | null | undefined$Element < any > ;
{
    var _a = this.state, editName = _a.editName, categoryID = _a.categoryID;
    var inputProps = {
        editName: editName,
        categoryID: categoryID,
        id: this.props.id,
        projects: this.props.projects.list,
        changeSelect: this.changeSelect,
        handleNameInput: this.handleNameInput,
        handleEnterButton: this.handleEnterButton
    };
    if (this.state.showInput) {
        return __assign({}, inputProps) /  > ;
    }
    return null;
}
;
showDateString = function () {
    var newDate = _this.props.updated ? helpers_1.formatDate(_this.props.updated) : '';
    var dateString = _this.props.updated ? 'Done:' : '';
    if (dateString !== '') {
        return className = "tasks__list-date" >
            { dateString: dateString } < /strong>;
        {
            newDate;
        }
        /span>;
        ;
    }
    return null;
};
handleShowTimer = function () {
    _this.setState(function (state) { return ({
        showTimer: !state.showTimer
    }); });
};
render();
{
    var showInput = this.state.showInput;
    var _b = this.props, name_1 = _b.name, done = _b.done;
    var doneClass = done ? 'tasks__list-item--done' : 'tasks__list-item';
    var hideOrNot = showInput ? 'none' : '';
    if (this.state.spinner) {
        return />;;
    }
    return className = {}(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), doneClass);
}
 >
    style;
{
    {
        display: hideOrNot;
    }
}
className = "tasks__list-name" >
    { name: name } < /span>
    < span;
className = "pretty-time" >
    { : .props.timeSpent }
    < /span>
    < /p>;
{
    this.showDateString();
}
{
    this.shouldShowInput();
}
(__assign({}, this.getButtonProps()) /  >
    { "this": .shouldShowTimer() }
    < /li>);
;
exports["default"] = Task;
var templateObject_1;