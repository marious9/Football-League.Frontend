import React from 'react';
import { connect } from 'react-redux';
import {editProfileActionCreator, changePasswordActionCreator, getAccountActionCreator, clearChangePassword} from '../../store/actions/Account';
import Spinner from '../../components/UI/spinner/spinner';
import CardButton from '../../components/UI/cardButton/CardButton';
import {Grid, Typography, Tooltip, Button} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-responsive-modal';
import Form from '../../components/UI/form/form';
import {formTitlesGenerator} from '../../constants/formTitles';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    header: {
        marginTop: 120
    }
})

class AccountContainer extends React.Component{
    state = {
        accountInfoLoading: true,
        editProfileFormItems: [],
        changePasswordFormItems: []
    }

    componentDidMount() {
        this.props.getAccount();
        setTimeout(() => this.setState({accountInfoLoading:false}), 1000);                
    }

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.getAccountStatus && this.props.getAccountErrors !== prevProps.getAccountErrors){
        //     let editProfileFormItems = [...this.state.editProfileFormItems];
        //     for(let i in editProfileFormItems){
        //         if(i === 0) editProfileFormItems[i].value = this.props.account.firstname;
        //         if(i === 1) editProfileFormItems[i].value = this.props.account.lastname;
        //     }
        //     this.setState({editProfileFormItems})
        //     console.log("editProfileFormItems", editProfileFormItems)
        // }
        if(this.props.editProfileResult && this.props.editProfileErrors !== prevProps.editProfileErrors) {
            this.props.getAccount();
        }
        if(this.props.changePasswordResult && this.props.changePasswordErrors !== prevProps.changePasswordErrors) {
            let changePasswordFormItems = [...this.state.changePasswordFormItems];
            for(let item of changePasswordFormItems){
                item.value = this.props.account.firstname
            }
            this.setState({changePasswordFormItems})
            this.props.clearChangePassword();
        }
    }

    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
      }

    render(){
        const {account, classes, editProfileResult, editProfileErrors, changePasswordResult, changePasswordErrors} = this.props;
        const {editProfileFormItems, changePasswordFormItems, accountInfoLoading} = this.state;
        return(
        <Grid container
        direction="row"
        justify="center"
        alignItems="center"  
        > 
            {accountInfoLoading ? <Spinner /> :
            <React.Fragment>
                <Grid className={classes.header} item xs={12}>
                    <Typography color="inherit" variant="h3" align="center">Witaj {`${account.firstname} ${account.lastname}`}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Form 
                        firstname={account.firstname}
                        lastname={account.lastname}
                        submitResult={editProfileResult}
                        submitErrors={editProfileErrors}
                        onSubmit={() => this.props.editProfile(editProfileFormItems)}
                        additionalClasses={""}
                        setFields={this.setFields}
                        arrayName="editProfileFormItems"
                        formItems={editProfileFormItems}                        
                        key={1}
                        {...formTitlesGenerator(
                        "editProfileTypes",
                        "editProfileRequirements",
                        "Twój profil"
                        )}
                        btnTitle="Edytuj"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Form 
                        passwordUpdated={changePasswordResult}
                        submitResult={changePasswordResult}
                        submitErrors={changePasswordErrors}
                        onSubmit={() => this.props.changePassword(changePasswordFormItems)}
                        additionalClasses={""}
                        setFields={this.setFields}
                        arrayName="changePasswordFormItems"
                        formItems={changePasswordFormItems}
                        key={1}
                        {...formTitlesGenerator(
                        "changePasswordTypes",
                        "changePasswordRequirements",
                        "Zmień hasło"
                        )}
                        btnTitle="Zmień"
                    />
                </Grid>
            </React.Fragment>
        }
        </Grid>)
    }
        
}

const mapStateToProps = state => {
    return {
        editProfileResult: state.Account.editProfileResult,
        editProfileErrors: state.Account.editProfileErrors,
        
        changePasswordResult: state.Account.changePasswordResult,
        changePasswordErrors: state.Account.changePasswordErrors,

        getAccountStatus: state.Account.getAccountStatus, 
        getAccountErrors: state.Account.getAccountErrors,

        account: state.Account.account
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearChangePassword: () => dispatch(clearChangePassword()),
        editProfile: editProfileFormItems => dispatch(editProfileActionCreator(editProfileFormItems)),
        changePassword: changePasswordFormItems => dispatch(changePasswordActionCreator(changePasswordFormItems)),
        getAccount: () => dispatch(getAccountActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountContainer));