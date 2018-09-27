import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/votes/actions/index'
import Votes from './subComponents/Votes'

const mapStateToProps = state => {
  return {
    votes: state.votes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Votes)
