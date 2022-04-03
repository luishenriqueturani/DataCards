/**
 * Data Tables plugin
 * versão alfa
 * @author Luís Henrique Turani
 * 
 * */
let jQueryElementTable;
let tableHeader;

/**
 * 
 * @param jQueryElementTable - um elemento jQuery que tenha sido gerado uma tabela do DataTables 
 * 
 */
async function dataCardsPlugin(jQueryElementTable){
    jQueryElementTable = jQueryElementTable;

    tableHeader = await generateArrayTableHeader();

    await generateCards(jQueryElementTable);

    jQueryElementTable.on('page.dt', function () {
        generateCards(jQueryElementTable);
    });

    jQueryElementTable.on('search.dt', function () {
        generateCards(jQueryElementTable);
    });

    jQueryElementTable.on('length.dt', function () {
        generateCards(jQueryElementTable);
    });
}

/**
 * 
 * Cria um array com os textos do table header
 * @return array com os campos do header da tabela ou false em caso de falhar
 * 
 * */
function generateArrayTableHeader(){
    return new Promise(async function (resolve, reject) {
        try {
            let tableHeader = [];
        
            await $(`.dataTables_scrollHeadInner`).find(`th`).each(function(i,e){ 
                tableHeader.push({
                    th: $(e).text()
                });
            });
    
            resolve(tableHeader);            
        } catch (error) {
            console.error(error);
            reject(false);
        }
    })

}

/**
 * 
 * método para gerar os cards
 * @param jQueryElementTable - elemento jQuery contendo a chamada do DataTables
 * @return true em caso de sucesso e false em caso de erro
 *  
 * */  
function generateCards(jQueryElementTable){
    return new Promise(async function(resolve, reject){
        try {
            
            if(!jQueryElementTable){
                console.error("jQuery Element undefined")
                return false
            }
        
            if(tableHeader.length == 0){
                tableHeader = await generateArrayTableHeader();
            }
        
            let elementRows = jQueryElementTable.DataTable().rows({ page: 'current' }).data();
        
            //filtra e pega os ids
            let i = Object.keys(elementRows).filter((index) => {
        
                if (!isNaN(parseInt(index))) {//se não for número, não é um dado da tabela
        
                    return true;
        
                }
            });
        
            let nameElement = jQueryElementTable.attr(`id`);
        
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
        
            $(`#${nameElement}_wrapper .dataTables_scroll`).append( $(html) );
        
            resolve(true);    
        } catch (error) {
            console.error(error);
            reject(false);
        }
    })
}

