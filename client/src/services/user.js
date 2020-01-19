export function validateUserInput(fields){
    
        for(let key in fields){
            if(fields[key] === '')
            return {isValid: false, error: `${key} field is empty!`};
        }
        return {isValid: true, error: ''}
 
   
    
}