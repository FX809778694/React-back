import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/userCenter/sites/actions/index'
import Sites from './subComponents/Sites'

const mapStateToProps = state => {
  return {
    sites: state.sites,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sites)

