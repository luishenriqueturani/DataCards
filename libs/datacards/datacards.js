class DataCardsPlugin{

    jQueryElement;
    tableHeader;

    constructor(jQueryElement){

        this.jQueryElement = jQueryElement;

        this.generateArrayTableHeader();

        this.generateCards();

    }

    /**
     * 
     * Cria um array com os textos do table header
     * 
     * */
    generateArrayTableHeader(){

        this.tableHeader = [];

        $(`.dataTables_scrollHeadInner`).find(`th`).each(function(i,e){ 
            this.tableHeader.push({
                th: $(e).text()
            });
        });

    }

    /**
     * 
     * método para gerar os cards
     *  
     * */  
    generateCards(){
        let elementRows = this.jQueryElement.DataTable().rows({ page: 'current' }).data();

        //filtra e pega os ids
        let i = Object.keys(elementRows).filter((index) => {

            if (!isNaN(parseInt(index))) {//se não for número, não é um dado da tabela

                return true;

            }
        });

        let nameElement = this.jQueryElement.attr(`id`);

        let data = [];

        
        for (let ind of i) {
            
            data.push(elementRows[ind]);
            
        }
        

        let img = ``;
        let cardIdentifier = '';
        let cardTitle = '';
        let cardHtmlContent = '';
        let dcHtml = '';

        for(let d of data) {

            let size = d.length;//quantidade de colunas na tabela

            for(i=0; i<size; i++) {
                switch(i){
                    case 0:
                        cardIdentifier = `<small>${d[i]}</small>`;
                        break;
                    case 1:
                        cardTitle = `<h5 class="dc-title">${d[i]}</h5>`;
                        break;
                    default:
                        if(d[i].includes('<img')){
                            img = `
                            <div class="dc-col">
                                <figure>
                                    <img src="${d[i]}">
                                </figure>
        
                            </div>
                            `;
                        }else{
                            cardHtmlContent += `<p><strong>${this.tableHeader[i]}: </strong>${d[i]}</p>`;
                        }
                        break;
                }
                
            }

            dcHtml += `
            <div class="data-cards">
                <div class="dc-header">
                    ${cardTitle}
                    ${cardIdentifier}
                </div>
                <div class="dc-content">
                    <div class="dc-col">
                        ${cardHtmlContent}
                    </div>
                    ${img}
                </div>
            </div>
            `;

        }

        let html = `<div class="dc-${nameElement} w-100 mt-3" id="dc-${nameElement}">
            <div class="data-cards-content"> 
                ${dcHtml}
            </div>
        </div>`;

        $(`#dc-${nameElement}`).remove()

        $('.dataTables_scroll').append( html );
    }


}

/**
 * versão orientado em functions
 * */
let jQueryElement;
let tableHeader;

async function dataCardsPlugin(jQueryElement){
    jQueryElement = jQueryElement;

    tableHeader = await generateArrayTableHeader();

    await generateCards(jQueryElement);


    jQueryElement.on('page.dt', function () {
        generateCards(jQueryElement);
    });

    jQueryElement.on('search.dt', function () {
        generateCards(jQueryElement);
    });

    jQueryElement.on('length.dt', function () {
        generateCards(jQueryElement);
    });
}

/**
     * 
     * Cria um array com os textos do table header
     * 
     * */
function generateArrayTableHeader(){
    return new Promise(function (resolve, reject) {
        
        let tableHeader = [];
    
        $(`.dataTables_scrollHeadInner`).find(`th`).each(function(i,e){ 
            tableHeader.push({
                th: $(e).text()
            });
        });

        resolve(tableHeader);
    })

}

/**
 * 
 * método para gerar os cards
 *  
 * */  
async function generateCards(jQueryElement){
    if(!jQueryElement){
        console.log("elemento undefined")
        return false
    }

    if(!tableHeader){
        tableHeader = await generateArrayTableHeader();
    }

    let elementRows = jQueryElement.DataTable().rows({ page: 'current' }).data();

    //filtra e pega os ids
    let i = Object.keys(elementRows).filter((index) => {

        if (!isNaN(parseInt(index))) {//se não for número, não é um dado da tabela

            return true;

        }
    });

    let nameElement = jQueryElement.attr(`id`);

    console.log('nome id: ' + nameElement)

    let data = [];
    
    for (let ind of i) {
        
        data.push(elementRows[ind]);
        
    }

    console.log('pegou os dados')

    let img = ``;
    let cardIdentifier = '';
    let cardTitle = '';
    let cardHtmlContent = '';
    let dcHtml = '';

    for(let d of data) {

        let size = d.length;//quantidade de colunas na tabela

        for(i=0; i<size; i++) {
            switch(i){
                case 0:
                    cardIdentifier = `<small>${d[i]}</small>`;
                    break;
                case 1:
                    cardTitle = `<h5 class="dc-title">${d[i]}</h5>`;
                    break;
                default:
                    if(d[i].includes('<img')){
                        img = `
                        <div class="dc-col">
                            <figure>
                                ${d[i]}
                            </figure>
    
                        </div>
                        `;
                    }else{
                        let campo = tableHeader[i]?.th ? `<strong>${tableHeader[i].th}: </strong>` : '';
                        cardHtmlContent += `<p>${campo}${d[i]}</p>`;
                    }
                    break;
            }
            
        }

        dcHtml += `
        <div class="data-cards">
            <div class="dc-header">
                ${cardTitle}
                ${cardIdentifier}
            </div>
            <div class="dc-content">
                <div class="dc-col">
                    ${cardHtmlContent}
                </div>
                ${img}
            </div>
        </div>
        `;

        cardHtmlContent = ''

    }

    let html = `<div class="dc-${nameElement} w-100 mt-3" id="dc-${nameElement}">
        <div class="data-cards-content"> 
            ${dcHtml}
        </div>
    </div>`;

    $(`#dc-${nameElement}`).remove()

    $('.dataTables_scroll').append( $(html) );

    return true;
}

