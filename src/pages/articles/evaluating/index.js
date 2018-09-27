import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Evaluating from './subComponents/Evaluating'

const mapStateToProps = state => {
  return {
    data: state.articles.evaluations.data,
    meta: state.articles.evaluations.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evaluating)
