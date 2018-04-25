// @flow
import * as React from 'react';
import swal from 'sweetalert';
import Timer from '../Timer';
import ButtonsGroup from '../ButtonsGroup';
import Spinner from '../../layout/Spinner';
import { formatDate, formatTime } from '../../../helpers';
import Input from './Input';
import TimeAddOptionsNode from './TimeAddOptions';
import { IRenameTask, ITimeLogData } from '../../../actions/actions.types';
import { IProject } from '../../../types';

type TaskProps = {
  name: string,
  handleDelete: (id: string) => void,
  handleRename: (params: IRenameTask) => void,
  taskDone: (id: string) => void,
  done: boolean,
  id: string,
  updated?: string,
  projectId: string,
  timeSpent: number,
  projects: IProject[],
  optionsValues: boolean[],
  handleChangeOptions: (arr: boolean[]) => void,
  handleAddingTimeLog?: (data: ITimeLogData, seconds: number) => void,
};

type TaskState = {
  editName: string,
  showInput: boolean,
  showTimer: boolean,
  spinner: boolean,
  categoryID: string,
  optionValues: boolean[],
}

class Task extends React.Component<TaskProps, TaskState> {
  state: TaskState = {
    editName: '',
    showInput: false,
    showTimer: false,
    spinner: false,
    categoryID: '',
    optionValues: [true, false]
  }

  componentWillMount() {
    this.setState({ categoryID: this.props.projectId });
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }

  showTimer = () => {
    this.setState(state => ({
      showTimer: !state.showTimer,
    }));
  };

  handleNameInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ editName: e.currentTarget.value });
  };

  handleShowInput = (name: string) => {
    this.setState({
      showInput: !this.state.showInput,
      editName: name,
    });
  };

  handleRenaming = (params: IRenameTask) => {
    const { id, name, newProject } = params;
    if (this.props.projectId !== params.newProject) {
      const { optionsValues } = this.props;
      swal({
        text: "You changing project's task. Read the options",
        content: TimeAddOptionsNode,
        buttons: {
          confirm: {
            value: { options: [...optionsValues] },
          },
        },
      }).then(value => {
        this.props.handleRename({
          id,
          name,
          currentProject: this.props.projectId,
          timeSpent: this.props.timeSpent,
          newProject,
          moveTime: value.options[0],
          deleteTime: value.options[1],
        });
        this.setState({
          showInput: false,
          spinner: true,
        });
        this.props.handleChangeOptions(value.options);
      });
    } else {
      this.props.handleRename({ id, name, newProject });
      this.setState({
        showInput: false,
        spinner: true,
      });
    }
  };

  handleEnterButton = (id: string, name: string) => {
    this.props.handleRename({ id, name, newProject: this.state.categoryID });
    this.setState({
      showInput: false,
      spinner: true,
    });
  };

  changeSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      categoryID: e.currentTarget.value,
    });
  };

  shouldShowTimer = () => {
    const { id, name, projectId, handleAddingTimeLog } = this.props;
    const myProps = Object.assign(
      {},
      { id, taskName: name, project: projectId, handleAddingTimeLog }
    );
    if (this.state.showTimer) {
      return <Timer key={`timer${id}`} {...myProps} />;
    }
    return null;
  };

  shouldShowInput = (): ?React$Element<any> => {
    const { editName, categoryID } = this.state;
    const inputProps = Object.assign({}, this.props, {
      editName,
      categoryID,
      changeSelect: this.changeSelect,
      handleNameInput: this.handleNameInput,
      handleEnterButton: this.handleEnterButton
    });
    if (this.state.showInput) {
      return <Input {...inputProps} />;
    }
    return null;
  };

  showDateString = () => {
    const newDate = this.props.updated ? formatDate(this.props.updated) : '';
    const dateString = this.props.updated ? 'Done:' : '';
    if (dateString !== '') {
      return (
        <span className="tasks__list-date">
          <strong>{dateString} </strong>
          {newDate}
        </span>
      );
    }
    return null;
  };

  render() {
    const { editName, showInput, categoryID } = this.state;
    const { id, name, done } = this.props;

    const doneButtonValue = done ? 'undone' : 'done';
    const doneClass = done ? 'tasks__list-item--done' : 'tasks__list-item';
    const hideOrNot = showInput ? 'none' : '';

    if (this.state.spinner) {
      return <Spinner />;
    }

    return (
      <li className={`${doneClass}`}>
        <p style={{ display: hideOrNot }} className="tasks__list-name">
          <span>{name}</span>
          <span className="pretty-time">
            {formatTime(this.props.timeSpent)}
          </span>
        </p>
        {this.showDateString()}
        {this.shouldShowInput()}

        <ButtonsGroup
          {...this.props}
          {...this.state}
          showTimer={this.showTimer}
          handleShowInput={this.handleShowInput}
          handleRenaming={() =>
            this.handleRenaming({
              id,
              name: editName,
              newProject: categoryID,
            })
          }
          doneButtonValue={doneButtonValue}
        />
        {this.shouldShowTimer()}
      </li>
    );
  }
}

export default Task;
