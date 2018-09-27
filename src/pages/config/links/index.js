import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/links'
import Links from './subComponents/Links'

const mapStateToProps = state => {
  return {
    data: state.configs.links.data,
    meta: state.configs.links.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)
