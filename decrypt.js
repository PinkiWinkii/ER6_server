const decodeMessage = (codifiedMsg) => {
    //Delete comas and spaces
    const cleanedMessage = codifiedMsg.replace(/[, ]+/g, '');
    
    //Invert message
    const reversedMessage = cleanedMessage.split('').reverse().join('');
    
    return reversedMessage;
};

//CodifiedMessage
const codifiedMsg = "la,,br e h  - h  ,  a  ,i,,r,,ah c a z/,  s, ,  t, , n e i,d,  ,er,g,  , n ,i /,  ,  v  ed  ,,. y  l,f.,,r  ,,ev,,  r  ,e  s-a,,k  ,it  oa,k//,  :sp,t, , th";

//Decode message
console.log(decodeMessage(codifiedMsg));
