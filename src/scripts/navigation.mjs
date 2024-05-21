

// Opens Section with given section Id (hides all other sections). 
function openSection(sectionId) {
    let sections = document.getElementsByTagName('section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = (sectionId === sections[i].id) ? 'block' : 'none';
    }
    document.getElementById('logout-button').style.display = (sectionId === "login") ? 'none' : 'block'
}

export { openSection };