import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Tunes from './subComponents/Tunes'

const mapStateToProps = state => {
  return {
    data: state.articles.tunes.data,
    meta: state.articles.tunes.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tunes)
