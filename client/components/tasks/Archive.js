import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects, getTasks } from '../../actions/projects';
import Layout from '../layout/Layout';
import TasksList from '../tasks/TasksList';

class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {},
      userLoaded: false,
      projectsLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.user).length !== 0 && !this.state.userLoaded) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
      this.props.handleTasks(this.props.match.params.id);
    }
  }

  componentDidUpdate() {
    if (this.props.projectsList.length !== 0 && !this.state.projectsLoaded) {
      this.props.projectsList.forEach(item => {
        if (item._id === this.props.match.params.id) {
          this.setState({ currentProject: item, projectsLoaded: true });
        }
        return 0;
      });
    }
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">
          {this.state.currentProject.name || '...'}
        </h1>
        <p>Archive of your projects, dude!</p>
        <TasksList filter tasks={this.props.tasksList} />
      </Layout>
    );
  }
}

Archive.defaultProps = {
  projectsList: [],
  tasksList: [],
  user: {},
};

Archive.propTypes = {
  match: PropTypes.object.isRequired,
  projectsList: PropTypes.array,
  tasksList: PropTypes.array,
  user: PropTypes.object,
  handleProjects: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projectsList: state.projects.projectsList,
  user: state.user,
  tasksList: state.projects.tasksList,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleTasks(projectId) {
    dispatch(getTasks(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
