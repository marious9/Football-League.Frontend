export const loginTypes = [
    {title: "Nazwa użytkownika", type: "text", holder: "wpisz swoją nazwę użytkownika...", serverName: "Username"}, 
    {title: "Hasło", type: "password", holder: "wpisz swoje hasło...", serverName: "Password"}
];
export const loginRequirements = [
    {inputName: "Login", nullable: false, minLength: 5, maxLength: 30},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20}
];

export const registerTypes = [
    {title: "Nazwa użytkownika", holder: "wpisz swoją nazwę użytkownika...", serverName: "Username"}, 
    {title: "Adres email", type: "email", holder: "wpisz swój adres email...", serverName: "Email"},
    {title: "Hasło", type: "password", holder: "wpisz swoje hasło...", serverName: "Password"}, 
    {title: "Powtórzone hasło", type: "password", holder: "wpisz swoje powtórzone hasło...", serverName: "Password"}
];

export const registerRequirements = [
    {inputName: "Login", nullable: false, minLength: 5, maxLength: 30},
    {inputName: "Adres email", nullable: false, minLength: 7, maxLength: 30},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20}
];

export const registerDetailsTypes = [
    {title: "Imię", holder: "wpisz swoją nazwę użytkownika...", serverName: "FirstName"}, 
    {title: "Nazwisko", holder: "wpisz swoje nazwisko...", serverName: "LastName"},
    {title: "Data urodzenia", type: "date", holder: "wybierz swoją date urodzenia...", serverName: "BirthDate"}, 
    {title: "Płeć", type: "select", serverName: "Sex", selectItems: [{label: "kliknij, aby rozwinąć", value: ""}, 
    {label: "Kobieta", value: "Kobieta"}, {label: "Mężczyzna", value: "Mężczyzna"}]}
];

export const registerDetailsRequirements = [
    {inputName: "Imię", nullable: true, minLength: 3, maxLength: 40},
    {inputName: "Nazwisko", nullable: true, minLength: 2, maxLength: 50},
    {inputName: "Data urodzenia", nullable: true},
    {inputName: "Sex", nullable: true}
];