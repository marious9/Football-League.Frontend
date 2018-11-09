import React from 'react';
import './Register.css';
import { connect } from 'react-redux';
import { loginActionCreator, logIn } from '../../../store/actions/Authenticate';
import Form from '../../UI/form/form';
import { withRouter } from 'react-router-dom';
import { formTitlesGenerator } from '../../../constants/formTitles';
import Button from '../../UI/button/button';
class Register extends React.PureComponent {
    state = {
        formItems: []
    }
    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
    }
    pushIntoRouteWithClear = () => {
        this.props.clearLoginData(null, [], null, "");
        this.props.pushIntoRoute("/");
    }
    render() { 
        const { loginErrors, loginResult, history, login } = this.props;
        const { formItems } = this.state;
        return ( 
        <main className="login-form-container">
            <div className="login-screen-description">
                <h1>Dołącz do 3600 użytkowników!</h1>
                <section>
                Załóż konto i zacznij przygode z zarządzaniem projektami. 
                Automatycznie generowane kategorie, możliwość dodawania własnych,
                 monitorowanie vstatystyk, tworzenie zadań i dodawanie komentarzy 
                 wraz z kontrolą czasu. To i wiele innych po założeniu konta.
                </section>
            </div>
            <div className="bg2"></div>
            <Form {...formTitlesGenerator("loginTypes", "loginRequirements")} 
            onSubmit={() => login(formItems, history)} 
            formItems={formItems}
            arrayName="formItems"
            setFields={this.setFields}
            submitErrors={loginErrors} 
            submitResult={loginResult}
            btnTitle="Zaloguj"/>

            <Button name="Dołącz do nas!" 
            className="btn btn-abs medium-btn go-back-btn" 
            onClick={this.pushIntoRouteWithClear}/>
        </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginResult: state.Authenticate.loginResult,
        loginErrors: state.Authenticate.loginErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (loginArray, history) => dispatch(loginActionCreator(loginArray, history)),
        clearLoginData: (loginStatus, loginErrors, loginObject) => dispatch(logIn(loginStatus, loginErrors, loginObject))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
