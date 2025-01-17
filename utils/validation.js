
// email validation
export const validateEmail = (email) => {
    // check for '@' symbol
    if(!email.includes("@")){
        return false
    }

    // check for multiple '@' + length of string before and after '@'
    const segments = email.split("@"); 
    if(segments.length !==2 || segments[0].length === 0 || segments[1].length === 0){
        return false
    }

    // username cannot start/end with dot
    if(segments[0].startsWith('.') || segments[0].endsWith('.')){
        return false
    }

    // domain can consist of two or more parts 
    const domain = segments[1].split('.');
    if(domain.length < 2 || domain[0].length < 1){
        return false
    }

    // check for top level domain such as .com/.in/.org
    const lastPart = domain[domain.length - 1];
    if(lastPart.endsWith('.') || lastPart.length < 2){
        return false
    }

    return true
}

// mobile number validation
export const validateMobileNumber = (number) => {
    // mobile number must have 10 digit
    if(number.length !== 10){
        return false
    }

    // valid characters 0-9
    for(let char of number){
        if(char < '0' || char > '9'){
            return false
        }
    }

    return true
}