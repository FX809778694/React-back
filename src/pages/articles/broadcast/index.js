import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Broadcasts from './subComponents/Broadcasts'

const mapStateToProps = state => {
  return {
    data: state.articles.broadcasts.data,
    meta: state.articles.broadcasts.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Broadcasts)
