const comicController = require('../../src/api/components/comics/controller') 
const controller = new comicController
const boom = require("@hapi/boom")
function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

const testGetComicsByName = async (heroname) => {
    try{
        const hulkComics = await controller.getComicsByName(heroname)
        if(isJson(hulkComics)){
            return hulkComics.data
        } else {
            throw boom.conflict('It was impossible to find a hero with that name')
        }
    } catch (erro){
        console.log(erro)
    }

}

console.log(testGetComicsByName('hulk'))