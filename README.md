<p align="center">
  <img width="321" height="88" src="assets/img/logo-mochileiro.PNG">
</p>

# Guia do Mochileiro
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/OseiasLissak/GuiaDoMochileiro/blob/main/LICENSE) 

# Sobre o Projeto

#### 

O projeto tem como objetivo auxiliar a cultura dos viajantes 
com pouco recurso, conhecidos como mochileiros.
O mesmo os auxilia com informações relevantes da próxima cidades de destino.
Além de informações climáticas, o mesmo contém informações de fuso horário, população demografica, idioma local, moeda oficial e DDI dos país.

Dados que rapidamente orientam o viajante sobre as necessidades do local.
Futuramente pode-se acrescentar mais informações importantes, como: locais para se hospedar, agenda de eventos da cidades, agências de câmbios, alimentação, etc.
<h4>
  
## Layout responsivo
  
![image](https://user-images.githubusercontent.com/92828735/201259202-8ed53494-5389-4f07-9e09-9780ff6928e1.png)

## Link do projeto

#### <https://exemplo.com/>

# Tecnologias utilizadas
  
## Front end
- Javascript 
- CSS
- HTML
  
## Implementação em produção
- Front end web: Netlify
  
# Como executar o projeto

## Front end
Pré-requisitos: npm / yarn

```bash
# clonar repositório
  
git clone https://github.com/OseiasLissak/GuiaDoMochileiro.git

# entrar na pasta do projeto GuiaDoMochileiro
cd GuiaDoMochileiro


# instalar dependências
yarn install

# executar o projeto
yarn start
```  
  

### **Exemplo de um API utilizado no projeto** 

#### 
Em todas as consultas foram realizadas solicitações GET simples com FETCH, utilizando argumentos passados ao URL do endpoint.
As respostas foram codificadas com JSON afim de facilitar a manipulação dos dados.
As demais consultas seguiram o mesmo padrão.

## **GET / Cidade** 
  
### Request
  
 ```bash
$ curl https://api.openweathermap.org/data/2.5/weather?q=$Tokyo&units=metric&appid=${apiKeyWeather}&lang=pt_br
  
```  

### Response
  
 ```json
{
    "coord": {
        "lon": 139.6917,
        "lat": 35.6895
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "algumas nuvens",
            "icon": "02d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 21.56,
        "feels_like": 21.31,
        "temp_min": 19.79,
        "temp_max": 23.75,
        "pressure": 1022,
        "humidity": 59
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.03,
        "deg": 0
    },
    "clouds": {
        "all": 20
    },
    "dt": 1668226241,
    "sys": {
        "type": 2,
        "id": 268395,
        "country": "JP",
        "sunrise": 1668201214,
        "sunset": 1668238631
    },
    "timezone": 32400,
    "id": 1850144,
    "name": "Tokyo",
    "cod": 200
}
  
```  
  
# Autor
  
Oseias Lissak dos Santos
  
www.linkedin.com/in/oseiaslissak


