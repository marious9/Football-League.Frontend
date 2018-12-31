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

    if(errorObject.response.status === 401){
        return [NotStandardErrors[401]];
    }

    if(errorObject.response.status > 399){
        const errorMsg = errorObject.response.data.errors
        if(errorMsg !== undefined) return errorMsg;
        const irrErrMsg = Object.values(errorObject.response.data).shift()
        return irrErrMsg;
    }

    return [NotStandardErrors[500]];
}