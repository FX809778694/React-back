import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Tasks from './pages/Tasks'
import * as Actions from '../../../store/translate/actions/task'

const mapStateToProps = state => {
  return {
    data: state.translate.tasks.data,
    meta: state.translate.tasks.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
