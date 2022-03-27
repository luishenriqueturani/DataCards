class DataCardsPlugin{

    jQueryElement;
    tableHeader;

    constructor(jQueryElement){

        this.jQueryElement = jQueryElement;

        generateArrayTableHeader();

        generateCards();

    }

    /**
     * 
     * Cria um array com os textos do table header
     * 
     * */
    generateArrayTableHeader(){

        tableHeader = [];

        $(`.dataTables_scrollHeadInner`).find(`th`).each(function(i,e){ 
            tableHeader.push({
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

        let nameElement = jQqueryElement.attr(`id`);

        let data = [];

        
        for (ind of i) {
            
            data.push(elementRows[ind]);
            
        }
        
        let html = `<div class="dc-${nameElement} w-100 mt-3" id="dc-${nameElement}">
        <div class="data-cards-content">`;

        let case1, case2, case3, case4, case5, case6, case7, case8, case9, case10, img;

        for(d of data) {

            let size = d.length;//quantidade de colunas na tabela

            for(i=0; i<size; i++) {
                
            }

            /* switch(size){
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    break;
            } */
        }



        html += `</div>
        </div>`;

        $(`#dc-${nameElement}`).remove()

        $('.dataTables_scroll').append( $(html) );
    }


}

$('#clientes-table').on('page.dt', function () {
    geraCards(false);
});

$('#clientes-table').on('search.dt', function () {
    geraCards(false);
});

$('#clientes-table').on('length.dt', function () {
    geraCards(false);
});