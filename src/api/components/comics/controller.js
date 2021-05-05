const boom = require("@hapi/boom")
const axios = require('axios');
const { config } = require('../../../config/index');
class Controller{
    constructor(){}

    async getComicsByName(heroname){
       
        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?name=${heroname}&${config.CREDENTIALS}`)
        if(response.data.data.results.length === 0) throw boom.conflict('It was impossible to find a hero with that name');
        const superheroID = response.data.data.results[0].id
        
        const heroName = response.data.data.results[0].name
        const heroDescription = response.data.data.results[0].description
        const heroImage = `${response.data.data.results[0].thumbnail.path}.${response.data.data.results[0].thumbnail.extension}`
        const heroInfo = {
            heroName,
            heroDescription,
            heroImage
        }

        const comics = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${superheroID}/comics?format=comic&${config.CREDENTIALS}`)

        const comicsPrueba = comics.data.data.results

        let comicsArray = []
            
        comicsPrueba.forEach(element =>{
            
            let coverArtist = ''
            let penciler = ''
            let writer = ''
            let image = ''
            if(element.creators.available > 0){
                
                element.creators.items.forEach(creator => {

                    if( creator.role === 'penciller (cover)'){
                        coverArtist = creator.name
                    }
                    if( creator.role === 'penciller'){
                        penciler = creator.name
                    }
                    if( creator.role === 'writer'){
                        writer = creator.name
                    }


                })

            }
            if(element.images.length === 1){
                image = `${element.images[0].path}.${element.images[0].extension}`
            }
            const comicInfo = {
                title: `${element.title}`,
                description: `${element.description}`,
                image,
                publish: `${element.dates[0].date}`,
                coverArtist,
                penciler,
                writer
            }
            comicsArray.push(comicInfo);

        });


        const data = {
            heroInfo,
            comicsArray
        }

        return data
    
    }

    async getRandomsComics(){
        const offset = Math.floor(Math.random() * 10000);

        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/comics?format=comic&limit=10&offset=${offset}&${config.CREDENTIALS}`)

        const comicsPrueba = response.data.data.results

        let comicsArray = []
            
        comicsPrueba.forEach(element =>{
            
            let coverArtist = ''
            let penciler = ''
            let writer = ''
            let image = ''
            if(element.creators.available > 0){
                
                element.creators.items.forEach(creator => {

                    if( creator.role === 'penciller (cover)'){
                        coverArtist = creator.name
                    }
                    if( creator.role === 'penciller'){
                        penciler = creator.name
                    }
                    if( creator.role === 'writer'){
                        writer = creator.name
                    }


                })

            }
            if(element.images.length === 1){
                image = `${element.images[0].path}.${element.images[0].extension}`
            }
            const comicInfo = {
                title: `${element.title}`,
                description: `${element.description}`,
                image,
                publish: `${element.dates[0].date}`,
                coverArtist,
                penciler,
                writer
            }
            comicsArray.push(comicInfo);

        });


        const data = {
            comicsArray
        }

        return data
    
    }
    
}

module.exports = Controller