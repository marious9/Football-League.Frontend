export const addEditPlayerTypes = [
    {title: "Imię", type: "text", serverName: "Firstname"},
    {title: "Nazwisko", type: "text", serverName: "Lirstname"},
    {title: "Data urodzenia", type: "date", serverName: "BirthDate"}
]

export const addEditPlayerRequirements = [
    {inputName: "Imię", nullable: false,  minLength: 2, maxLength: 40},
    {inputName: "Nazwisko", nullable: false,  minLength: 2, maxLength: 40},
    {inputName: "Data urodzenia", nullable: false}
];


export const addStatisticTypes = [
    {title: "Minuta meczu", type: "number", serverName: "Minute"},
    {title: "Akcja", type: "select", serverName: "Action", selectItems: [
        {
            value: 0,
            label: "Bramka"
        },
        {
            value: 1,
            label:"Asysta"
        },
        {
            value: 2,
            label:"Żółta kartka"
        },
        {
            value: 3,
            label: "Czerwona kartka"
        }
    ]}
]


export const addStatisticRequirements = [
    {inputName: "Minuta meczu", nullable: false, minNumber: 0, maxNumber: 90},
    {inputName: "Akcja", nullable: true }
];

export const addEditTeamTypes = [
    {title: "Nazwa drużyny", holder: "Podaj nazwę drużyny..", type: "text", serverName: "Name"}
]

export const editMatchTypes = [
    {title: "Bramki drużyny1", type: "number", serverName: "HostScore"},
    {title: "Bramki drużyny2", type: "number", serverName: "AwayScore"},
    {title: "Data spotkania", type: "date", serverName: "Date"}
]

export const addMatchTypes = [
    //{title: "Drużyna1", type: "number", serverName: "HostId"},
    //{title: "Drużyna2", type: "number", serverName: "AwayId"},
    {title: "Bramki drużyny1", type: "number", serverName: "HostScore"},
    {title: "Bramki drużyny2", type: "number", serverName: "AwayScore"},
    {title: "Kolejka", type: "number", serverName: "Round"},
    {title: "Data spotkania", type: "date", serverName: "Date"}
]

export const editLeagueTypes = [
    {title: "Nazwa", type: "text", holder: "Wpisz nazwę ligii...", serverName: "Name"}
];

export const editLeagueRequirements = [
    {inputName: "Dodaj ligę", nullable: false, minLength: 5, maxLength: 30}
];

export const addLeagueTypes = [
    {title: "Nazwa", type: "text", holder: "Wpisz nazwę ligii...", serverName: "Name"},
    {title: "Ilość drużyn", type: "number", serverName:"Quantity"}
];

export const loginTypes = [
    {title: "Nazwa użytkownika", type: "text", holder: "Wpisz swoją nazwę użytkownika...", serverName: "Username"}, 
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

export const addEditTeamRequirements = [
    {inputName: "Nazwa drużyny", nullable: false, minLength: 3, maxLength: 40}
]

export const editMatchRequirements = [
    {inputName: "Bramki drużyny1", nullable: false,  minNumber: 0, maxNumber: 50},
    {inputName: "Bramki drużyny2", nullable: false,  minNumber: 0, maxNumber: 50},
    {inputName: "Data", nullable: false}
];

export const addMatchRequirements = [
    //{inputName: "Drużyna1", nullable: false},
    //{inputName: "Drużyna2", nullable: false},
    {inputName: "Bramki drużyny1", nullable: false,  minNumber: 0, maxNumber: 50},
    {inputName: "Bramki drużyny2", nullable: false,  minNumber: 0, maxNumber: 50},
    {inputName: "Kolejka", nullable: false,  minNumber: 1, maxNumber: 63},
    {inputName: "Data", nullable: false}
];

export const addLeagueRequirements = [
    {inputName: "Dodaj ligę", nullable: false, minLength: 5, maxLength: 30},
    {inputName: "Ilość drużyn", nullable: false,  minNumber: 2, maxNumber: 32},
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