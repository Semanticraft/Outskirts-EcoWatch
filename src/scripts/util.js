export function disableByClass(className, disableBool) {
    Array.from(document.getElementsByClassName(className)).forEach(element => {
        if(element.disabled != undefined) {
            element.disabled = disableBool;
        }
    });
}