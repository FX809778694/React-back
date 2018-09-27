import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/question/actions/quizsCount'
import QuizsCount from './subComponents/QuizsCount'

const mapStateToProps = state => {
  return {
    data: state.questions.quizsCount.data,
    meta: state.questions.quizsCount.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizsCount)

