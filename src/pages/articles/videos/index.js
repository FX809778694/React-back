import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Videos from './subComponents/Videos'

const mapStateToProps = state => {
  return {
    data: state.articles.videos.data,
    meta: state.articles.videos.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos)
