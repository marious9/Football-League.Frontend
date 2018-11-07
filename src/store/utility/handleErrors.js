const NotStandardErrors = {
    401: "Brak autoryzacji",
    500: "Ups coś poszło nie tak"
}

export const handleErrors = errorObject => {
    if(!errorObject.response){
        return [NotStandardErrors[500]];
    }

    if(!errorObject.response.data){
        return [NotStandardErrors[500]];
    }

    if(errorObject.response.data.status === 401){
        return [NotStandardErrors[401]];
    }

    if(errorObject.response.data.isError !== undefined){
        return errorObject.response.data.errors;
    }

    return [NotStandardErrors[500]];
}