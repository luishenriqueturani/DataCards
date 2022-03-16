class DataCardsPlugin{

    jQueryElement;

    constructor(jQueryElement){

        this.jQueryElement = jQueryElement;

        generateCards()

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

        let data = [];

        html = `<div class="cards-clientes w-100 mt-3" id="cards-clientes">
        <div class="row w-100">`;

        for (ind of i) {

            data.push(elementRows[ind]);

        }

        for(d of data) {

            let size = d.length;//quantidade de colunas na tabela

            switch(size){
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
            }
        }



        html += `</div>
        </div>`;

        $('#cards-clientes').remove()

        $('.dataTables_scroll').append(html);
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