
import * as React from 'react';
import ProjectsSelect from '../../projects/ProjectsSelect';
import { IProject } from '../../../types';

interface Props {
  id: string,
  editName: string,
  categoryID: string,
  projects: IProject[],
  handleNameInput: (e: any) => void,
  handleEnterButton: (id: string, name: string, categoryID: string) => void,
  changeSelect: (e: any) => void,
};

const Input = (props: Props) => (
  <div className="tasks__list-input">
    <input
      type="text"
      onKeyPress={e => {
        if (e.charCode === 13) {
          props.handleEnterButton(props.id, props.editName, props.categoryID);
        }
      }}
      value={props.editName}
      onChange={props.handleNameInput}
    />
    <ProjectsSelect
      disableDefault
      parentID={props.categoryID}
      projects={props.projects}
      changeSelect={props.changeSelect}
    />
  </div>
);

export default Input;