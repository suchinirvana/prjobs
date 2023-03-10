export const isLoggedIn = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if ((user!= null) && user.token)  return true
    else return false
}

export const currentUser = () => {
    let user = {};
    if(isLoggedIn()){
        user = JSON.parse(localStorage.getItem('user'));   
         
    }
    return user;
}

export const getfileUrl = (file)=>{
    let fileUrl = '';
    if(file!==''){
        fileUrl  = process.env.REACT_APP_IMG_URL+'/'+file;
    }
    return fileUrl;
}

export const provinces = () =>{
    let provinces = [
        { plain: "Alberta", name: "Alberta", abbr: "AB" },
        { plain: "British Columbia", name: "British Columbia", abbr: "BC" },
        { plain: "Manitoba", name: "Manitoba", abbr: "MB" },
        { plain: "New Brunswick", name: "New Brunswick", abbr: "NB" },
        {
          plain: "Newfoundland &amp; Labrador",
          name: "Newfoundland &amp; Labrador",
          abbr: "NL",
        },
        {
          plain: "Northwest Territories",
          name: "Northwest Territories",
          abbr: "NT",
        },
        { plain: "Nova Scotia", name: "Nova Scotia", abbr: "NS" },
        { plain: "Nunavut", name: "Nunavut", abbr: "NU" },
        { plain: "Ontario", name: "Ontario", abbr: "ON" },
        { plain: "Prince Edward Island", name: "Prince Edward Island", abbr: "PE" },
        { plain: "Quebec", name: "Qu&eacute;bec", abbr: "QC" },
        { plain: "Saskatchewan", name: "Saskatchewan", abbr: "SK" },
        { plain: "Yukon", name: "Yukon", abbr: "YK" },
      ];
      return provinces;

}


export const categoryIcon = (value) => {
    
    const icons = [
        {'category':'Automotive', 'icon':'flaticon-settings'},
        {'category':'Construction', 'icon' :'flaticon-safety'},
        {'category':'Health Care', 'icon': 'flaticon-first-aid-kit'},
        {'category': 'Hospitality', 'icon':'flaticon-reception'},
        {'category': 'Logistics', 'icon':'flaticon-delivery-truck'},
        {'category': 'Manufacturing', 'icon': 'flaticon-manufacturer'},
        {'category':'Software', 'icon':'flaticon-manufacturer'}
    ]

    let result = icons.find(o => o.category === 'Software')
    
    if(result!== undefined) {
        return result.icon;
    } else {
        return 'flaticon-settings';
    }
   
}
