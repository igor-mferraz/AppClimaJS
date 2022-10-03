document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();//não deixa enviar as informações,para evitar de atualizar a pagina, pois não é esse o objetivo

    let input = document.querySelector('#searchInput').value //pegando dados do input
    if(input !== '') {
        clearInfo();
        showWarning('Carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0cb45cdfcee070360654fa693b70a7db&units=metric&lang=pt_br`

        //encodeURI é uma função que converte uma string recebida, e devolve ela como deve ser lida por um url, ou seja seja quando digitamos um espaço ela tira, quando colocamos acentos ela converte de maneira que deve ser

        let results = await fetch(url);//fazendo requisição e esperando resultado
        let json = await results.json(); // pegando o resultado e transformando em json

        console.log(json)//o resultado da api está em json agora é só manipular

        //if(se achar a cidade que no caso é localizada pelo cod do objeto json) ele vai trocar os atritubutos pela usando a função showInfo com os parametros com objeto
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos resta localização')
        } 
    } else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';
//prenchendo as o html com o resultado o resultado da api
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png` )
    document.querySelector('.ventoPonto').style.transform = `rotate${json.windAngle-90}deg`

}

function showWarning (msg){
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none';

}