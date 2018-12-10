import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Form from '../../UI/form/form';
import { formTitlesGenerator } from "../../../constants/formTitles";
import FormInput from '../../../components/UI/form/formInput/formInput'

class AddLeagueModal extends React.PureComponent {
    state = {
    };


    render() {
    const { closeModal, openModal, addMatch, setFields, addMatchErrors, addMatchResult,canSubmit} = this.props;
    const {formItems} = this.props;
        return (
            <Modal open={openModal} onClose={() => closeModal()} center>
                <Form 
                    canSubmit={canSubmit}
                    submitResult={addMatchResult}
                    submitErrors={addMatchErrors}
                    onSubmit={addMatch}
                    additionalClasses={"form-add-match-container"}
                    setFields={setFields}
                    arrayName="formItems"
                    formItems={formItems}
                    key={1}
                    {...formTitlesGenerator(
                      "addMatchTypes",
                      "addMatchRequirements",
                      "Dodawanie meczu"
                    )}
                    btnTitle="Dodaj"
                />
                <FormInput
                    addMatchClassHomeTeamSelect                  
                    nullable 
                    selectItems={this.props.selectTeams}
                    onChange={e => this.props.setHostId(e.target.value)}
                    value={this.props.currentHostId}
                    error={this.props.currentHostError}
                    key={2} 
                    type={"select"}
                    placeholder={"Wybierz drużynę 1"}
                    title={"Drużyna 1"} />
                <FormInput
                    addMatchClassAwayTeamSelect
                    nullable 
                    selectItems={this.props.selectTeams}
                    onChange={e => this.props.setAwayId(e.target.value)}
                    value={this.props.currentAwayId}
                    error={this.props.currentAwayError}
                    key={3} 
                    type={"select"}
                    placeholder={"Wybierz drużynę 2"}
                    title={"Drużyna 2"} />
            </Modal>
        );
    }
}

AddLeagueModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired
};

export default AddLeagueModal;