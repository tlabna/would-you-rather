import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/reducers/modal'

/*
* Removed react container component since there is no need for it.
* WHY? => This container component has no lifecycle event or state so there really is no need
* to create the container component.
* INSTEAD we can pass the props directly to the Modal component

class ModalContainer extends React.Component {
  render () {
    return (
      <Modal />
    )
  }
}
 */

function isSubmitDisabled(firstText, secondText, title) {
  return (
    firstText.length <= 0 ||
    firstText.length > 140 ||
    secondText.length <= 0 ||
    secondText.length > 140 ||
    title.length <= 0 ||
    title.length > 140
  )
}

function mapStateToProps({ modal, users }) {
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    firstDecisionText: modal.firstDecisionText,
    secondDecisionText: modal.secondDecisionText,
    titleText: modal.titleText,
    isOpen: modal.isOpen,
    isSubmitDisabled: isSubmitDisabled(
      modal.firstDecisionText,
      modal.secondDecisionText,
      modal.titleText
    ),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(modalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
