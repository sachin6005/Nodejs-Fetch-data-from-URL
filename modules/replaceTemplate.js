module.exports  = (template, carDetails) =>  {
    let output = template.replace(/{%ID%}/g ,carDetails.id).replace(/{%MAKE%}/g ,carDetails.make).replace(/{%MODEL%}/g ,carDetails.model).replace(/{%YEAR%}/g ,carDetails.year).replace(/{%URL%}/g ,carDetails.url)
    return output
}