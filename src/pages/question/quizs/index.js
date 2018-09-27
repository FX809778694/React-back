import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/question/actions/quizs'
import Quizs from './subComponents/Quizs'

const mapStateToProps = state => {
  return {
    data: state.questions.quizs.data,
    meta: state.questions.quizs.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quizs)

