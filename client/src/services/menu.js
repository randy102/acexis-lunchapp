
export function checkMenuStatus(curStatus, prevStatus, gridApi){
    const nodes = gridApi.getRenderedNodes();
    const rowStatus = nodes.map(node => node.data.status);
    
    if(prevStatus !== curStatus){
        if(prevStatus === "BLOCKED")
            return {isValid: false, error: "Menu is BLOCKED!"}
        if(curStatus === "PUBLISHED" && rowStatus.includes("PUBLISHED"))
            return {isValid: false, error: "Only one Menu got published at a time!"}
        if(curStatus === "UNPUBLISHED")
            return {isValid: false, error: "Can not unPublish Menu"}
    }
    return {isValid: true}
}   