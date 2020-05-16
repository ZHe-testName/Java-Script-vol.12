const compareBrowserName = (nameStr) => {
    let browserDescription = navigator.userAgent;

    if(browserDescription.search(/Chrome/) > 0) 'chrome' === nameStr.toLowerCase() ? true : false; 
    if(browserDescription.search(/Safari/) > 0) 'safari' === nameStr.toLowerCase() ? true : false; 
    if(browserDescription.search(/Firefox/) > 0) 'firefox' === nameStr.toLowerCase() ? true : false; 
    if(browserDescription.search(/Opera/) > 0) 'opera' === nameStr.toLowerCase() ? true : false; 
    if(browserDescription.search(/MSIE/) > 0) "ie" === nameStr.toLowerCase() ? true : false; 
};

export default compareBrowserName;