import { constraints } from '../constants/regex';
import moment from 'moment';

export const validateInput = (inputValue, requirements) => {
    const {inputName} = requirements;
    
    if(requirements.nullable === false && inputValue.length === 0)
        return "Wartość pola " + inputName + " nie może być pusta";


    if(inputValue.length > 0){
        if(requirements.minLength && inputValue.length < requirements.minLength){
            return "Wartość pola " + inputName + " musi posiadać więcej niż " + requirements.minLength + " znaków";
        }
        if(requirements.maxLength && inputValue.length > requirements.maxLength){
            return "Wartość pola " + inputName + " musi posiadać mniej niż " + requirements.maxLength + " znaków";
        }
        switch(inputName){
            case ("Nazwa użytkownika" || "Login"):
                if(!constraints.projetctFormPatterns.name.test(inputValue))
                    return "Nie prawidłowy format nazwy użytkownika";
            break;
            case "Adres email":
                if(!constraints.projetctFormPatterns.email.test(inputValue))
                    return "Nie prawidłowy format adresu email";
            break;
    
            case "Imię":
                if(!constraints.projetctFormPatterns.firstName.test(inputValue))
                return "Zły format pola imię";
            break;
            case "Nazwisko":
                if(!constraints.projetctFormPatterns.lastName.test(inputValue))
                return "Zły format pola nazwisko";
            break;
            case "Data urodzenia":
                return validateBirthDate(inputValue);
    
            default:
            break;
        }
    }
    
    return ""
}

export const checkPasswordsAreTheSame = (password, repeatedPassword) => {
    if(password !== repeatedPassword)
        return "Hasła są niezgodne";
    return "";
}

const validateBirthDate = incomingDate => {
    const momentIncomingDateForm = moment(incomingDate);


    const dateNow = moment().format();
    const age = moment().diff(incomingDate, 'years');   

    if(!momentIncomingDateForm.isValid() && incomingDate !== "")
        return "Nie właściwy format daty";
    
    if(moment(incomingDate).isAfter(dateNow))
        return "Data urodzenia nie może odnosić się do przyszłości";

    if(age < 12 && !moment(incomingDate).isAfter(dateNow))
        return "Musisz mieć ukończone 12 lat";

    
    
    
    return "";
}