import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Form from '../../UI/form/form';
import { formTitlesGenerator } from "../../../constants/formTitles";

class AddLeagueModal extends React.PureComponent {
    state = {
    };


    render() {
    const { closeModal, openModal, addLeague, setFields, addLeagueErrors, addLeagueResult } = this.props;
    const {formItems} = this.props;
        return (
            <Modal open={openModal} onClose={() => closeModal()} center>
                <Form 
                    submitResult={addLeagueResult}
                    submitErrors={addLeagueErrors}
                    onSubmit={() => addLeague(formItems)}
                    additionalClasses={"form-add-league-container"}
                    setFields={setFields}
                    arrayName="formItems"
                    formItems={formItems}
                    key={1}
                    {...formTitlesGenerator(
                      "addLeagueTypes",
                      "addLeagueRequirements",
                      "Dodawanie ligi"
                    )}
                    btnTitle="Dodaj"
                />
            </Modal>
        );
    }
}

AddLeagueModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired
};

export default AddLeagueModal;