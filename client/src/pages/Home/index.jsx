import * as React from 'react'
import _orderBy from 'lodash/orderBy'
import noScroll from 'no-scroll'

import { connect } from 'react-redux'
import { getMsgs, openModal } from '~/actions/Dashboard'

// import t from '~/utils/locales'
import Logo from '~/assets/icons/logo.svg'
import Page from '~/components/Page'
import AirLine from '~/components/AirLine'
import CardModal from '~/components/CardModal'
import Msgs from './Msgs'
import Nav from './Nav'

import styles from './Home.css'
import '~/styles/global/global.css'

class Home extends React.Component {
  componentDidMount () {
    this.props.getMsgs()
  }

  render () {
    this.props.isModalOpen ? noScroll.on() : noScroll.off()

    const { msgs, openModal } = this.props
    return (
      <Page className={styles.container}>
        <Nav msgs={msgs} />
        <AirLine />
        <div className={styles.logo}><Logo /></div>
        <h2 className={styles.intro}>
          T. is a minimalistic tool <br />
          for thoughts collection and management, <br />
          based on handy Telegram Channel.
        </h2>
        {Msgs({ msgs, openModal })}

        <CardModal />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  // msgs: state.dashboard.msgs,
  isModalOpen: state.dashboard.isModalOpen,
  msgs: _orderBy(state.dashboard.msgs, ['created_date'], ['desc'])
})
const mapDispatchToProps = {
  openModal,
  getMsgs
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
