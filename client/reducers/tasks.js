import deepClone from 'lodash.clonedeep';
import {
  GET_TASKS,
  NEW_TASK,
  DELETE_TASK,
  EDIT_TASK,
  ADD_TIME_TO_PROJECT,
  TOGGLE_DONE,
  FETCH_TASKS,
  SUBTRACT_TASK_TIME,
  ADD_TIMELOG
} from '../actions/actionTypes';

export function tasks(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, isFetching: action.response };
    case GET_TASKS: {
      let newProject = true;
      let newState = state.list.map(item => {
        const newItem = deepClone(item);
        if (item.project._id === action.response.project._id) {
          newProject = false;
          newItem.list = action.response.list || newItem.list;
          newItem.doneList = action.response.doneList || newItem.doneList;
          newItem.project = {
            ...action.response.project,
            initialTime: action.response.project.timeSpent
          };
        }
        return newItem;
      });
      if (newProject) {
        newState = [
          ...state.list,
          {
            list: action.response.list,
            doneList: action.response.doneList,
            project: {
              ...action.response.project,
              initialTime: action.response.project.timeSpent
            }
          }
        ];
      }
      return { list: newState, isFetching: false };
    }
    case NEW_TASK: {
      const newList = state.list.map(item => {
        if (item.project._id === action.task.project) {
          const newItem = deepClone(item);
          newItem.list.push(action.task);
          return newItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    case DELETE_TASK: {
      const newList = state.list.map(item => {
        if (item.project._id === action.projectId) {
          const newItem = deepClone(item);
          newItem.list = newItem.list.filter(task => task._id !== action.id);
          return newItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    case EDIT_TASK: {
      let editedTask;
      let addList;
      const toBeMoved = action.currentProject !== action.newProject;
      const newList = state.list.map(item => {
        if (item.project._id === action.currentProject) {
          const newItem = deepClone(item);
          newItem.list = newItem.list
            .map(task => {
              const newTask = { ...task };
              if (task._id === action.id) {
                newTask.name = action.name;
                editedTask = newTask;
                if (toBeMoved) {
                  return undefined;
                }
              }
              return newTask;
            })
            .filter(edited => edited !== undefined);
          return newItem;
        }
        return item;
      });
      if (toBeMoved) {
        addList = newList.map(myItem => {
          if (myItem.project._id === action.newProject) {
            const newItem = deepClone(myItem);
            newItem.list.push(editedTask);
            return newItem;
          }
          return myItem;
        });
      }
      return { ...state, list: addList || newList };
    }
    case TOGGLE_DONE: {
      let newList = state.list;
      let taskBuffer;
      newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (item.project._id === action.projectId) {
          if (action.done) {
            newItem.list = newItem.list.filter(task => {
              if (task._id === action.id) {
                taskBuffer = task;
                taskBuffer.done = true;
              }
              return task._id !== action.id;
            });
            if (newItem.doneList) {
              newItem.doneList = [...newItem.doneList, taskBuffer];
            }
          } else if (action.done === false) {
            newItem.doneList = newItem.doneList.filter(task => {
              if (task._id === action.id) {
                taskBuffer = task;
                taskBuffer.done = false;
              }
              return task._id !== action.id;
            });
            if (newItem.list) {
              newItem.list = [...newItem.list, taskBuffer];
            }
          }
          return newItem;
        }
        return newItem;
      });

      return { ...state, list: newList };
    }
    case ADD_TIME_TO_PROJECT:
    case ADD_TIMELOG: {
      const newList = state.list.map(item => {
        const newItem = { ...item };
        if (item.project._id === action.data.project._id) {
          newItem.list = newItem.list.map(task => {
            const newTask = deepClone(task);
            if (task._id === action.data.task._id) {
              newTask.timeSpent += action.seconds;
            }
            return newTask;
          });
          newItem.project.timeSpent += action.seconds;
          return newItem;
        }
        return newItem;
      });
      return { ...state, list: newList };
    }
    case SUBTRACT_TASK_TIME: {
      if (!action.params.deleteTime && !action.params.moveTime) {
        return state;
      }
      const newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (
          item.project._id === action.params.currentProject &&
          action.params.deleteTime
        ) {
          const project = {
            ...newItem.project,
            timeSpent:
              newItem.project.timeSpent - (action.params.timeSpent || 0)
          };
          newItem.project = project;
        }
        if (
          item.project._id === action.params.newProject &&
          action.params.moveTime
        ) {
          const project = {
            ...newItem.project,
            timeSpent:
              newItem.project.timeSpent + (action.params.timeSpent || 0)
          };
          newItem.project = project;
        }
        return newItem;
      });
      return { ...state, list: newList };
    }
    default:
      return state;
  }
}

export default tasks;
