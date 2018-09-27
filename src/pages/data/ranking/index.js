import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/data/actions/ranking'
import Ranking from './subComponents/Ranking'

const mapStateToProps = state => {
  return {
    data: state.dataCenter.rank.data,
    meta: state.dataCenter.rank.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)
