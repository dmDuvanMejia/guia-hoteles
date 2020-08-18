
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
        $('.carousel').carousel({
        interval: 5000
    });


    $('#reservationModal').on('show.bs.modal', function (e) {
        console.log('Ha decidido reservar una habitación...');

        $('.btn-reservation').removeClass('btn btn-primary')
            .addClass('btn btn-success disabled');
            console.log('INFO ' + e.target.TEXT_NODE )
    });

    $('#reservationModal').on('shown.bs.modal', function (e) {
        console.log('Ha cargado el dialogo para asignar una habitación...')
    });

    $('#reservationModal').on('hide.bs.modal', function (e) {
        console.log('El dialogo se ha cerrado...');

        $('.btn-reservation').addClass('btn btn-primary')
            .removeClass('btn-success disabled');
            console.log('INFO ' + e)
    });

    $('#reservationModal').on('hidden.bs.modal', function (e) {
        console.log('Se completo el cierre de la reesrva...')
    });

});