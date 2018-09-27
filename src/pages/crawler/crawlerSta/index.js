import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/crawlerSta/actions/index'
import CrawlerSta from './subComponents/CrawlerSta'

const mapStateToProps = state => {
  return {
    crawlerStaData: state.crawlerStaData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrawlerSta)
