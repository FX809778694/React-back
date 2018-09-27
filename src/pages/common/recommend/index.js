import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Recommend from './subComponents/Recommend'

const mapStateToProps = state => {
  return {
    data: state.articles.recommends.data,
    meta: state.articles.recommends.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
