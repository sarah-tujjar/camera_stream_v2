
//math start here
function mathControl(){

    bootstrap.showModal({
        title: 'Math Operation Block',
        body:
            '<form id="mathForm">'+

                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">Operation</h6>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="mathvaraible" class="form-control serachbtn" placeholder="Variable...">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+

                        '</div>'+
                    '</div>'+
                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">First Argument</h6>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="firstmath" class="form-control serachbtn" placeholder="">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">Operator</h6>'+
                        '</div>'+
                    '</div>'+

                    '<div class="form-group row">' +
                        '<div class="col-12">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected value="+">+Add</option>'+
                                '<option value="*">*Mul</option>'+
                                '<option value="-">-Sub</option>'+
                                '<option value="/">/Div</option>'+
                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">Second Argument</h6>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="secondmath" class="form-control serachbtn" placeholder="">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+
                        '</div>'+
                '</div>'+
                '</div>'+
            '</form>'+
            '<div class="form-group row">' +
                    '<div class="col-12 d-grid pt-4">' +
                        '<button class="btn newbtn" id="newMath"> + Add New  </button>'+
                    '</div>'+
            '</div>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("button[type=button]").addEventListener("click", function (event) {
                event.preventDefault()

            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
    $('#newMath').bind('click', function(event) {
        event.preventDefault();

        var inputfld = '<div id="mathgrp" class="border-top mt-4">'+
                                '<div class="form-group row py-2">' +
                                '<div class="col-12 ">' +
                                    '<h6 class="v_text form-control bg-qss3">Operation<i class="fa pt-1 fa-close float-end closemathCommand"></i></h6>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row">' +
                                '<div class="col-10">' +
                                    ' <input type="search" id="mathvaraible" class="form-control serachbtn" placeholder="Variable...">'+
                                '</div>'+
                                '<div class="col-2">' +
                                    '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                        '<option selected>{X}</option>'+
                                        '<option value="1">One</option>'+
                                    '</select>'+ 

                                '</div>'+
                            '</div>'+
                            '<div class="form-group row py-2">' +
                                '<div class="col-12 ">' +
                                    '<h6 class="v_text form-control bg-qss3">First Argument</h6>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row">' +
                                '<div class="col-10">' +
                                    ' <input type="search" id="firstmath" class="form-control serachbtn" placeholder="">'+
                                '</div>'+
                                '<div class="col-2">' +
                                    '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                        '<option selected>{X}</option>'+
                                        '<option value="1">One</option>'+
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row py-2">' +
                                '<div class="col-12 ">' +
                                    '<h6 class="v_text form-control bg-qss3">Operator</h6>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-group row">' +
                                '<div class="col-12">' +
                                    '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                        '<option selected value="+">+Add</option>'+
                                        '<option value="*">*Mul</option>'+
                                        '<option value="-">-Sub</option>'+
                                        '<option value="/">/Div</option>'+
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row py-2">' +
                                '<div class="col-12 ">' +
                                    '<h6 class="v_text form-control bg-qss3">Second Argument</h6>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row">' +
                                '<div class="col-10">' +
                                    ' <input type="search" id="secondmath" class="form-control serachbtn" placeholder="">'+
                                '</div>'+
                                '<div class="col-2">' +
                                    '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                        '<option selected>{X}</option>'+
                                        '<option value="1">One</option>'+
                                    '</select>'+
                                '</div>'+
                        '</div>'+
                        '</div>'+
                       '</div>';
        $("#mathForm").append(inputfld);

    });
    $('#mathForm').on('click','.closemathCommand',function(event) {
        event.preventDefault();
        $(this).closest('div#mathgrp').remove();

    });

}
//math end here

//String start here
function stringControl(){

    bootstrap.showModal({
        title: 'String Block',
        body:
            '<form id="stringForm">'+

                    '<div class="form-group row">' +
                        '<div class="col-12">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>Chose String Operation</option>'+
                                '<option value="1">Count()</option>'+
                                '<option value="1">Max()</option>'+
                                '<option value="1">Min()</option>'+
                                '<option value="1">Length()</option>'+
                            '</select>'+
                        '</div>'+
                    '</div>'+

                    '<div class="form-group row my-2">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="stringvariable" class="form-control serachbtn" placeholder="Variable">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-12">' +
                            ' <input type="search" id="stringoutvariable" class="form-control serachbtn" placeholder="Output Variable">'+
                        '</div>'+

                    '</div>'+

            '</form>'+
            '<div class="form-group row">' +
                    '<div class="col-12 d-grid pt-4">' +
                        '<button class="btn newbtn" id="newString"> + Add New  </button>'+
                    '</div>'+
            '</div>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("button[type=button]").addEventListener("click", function (event) {
                event.preventDefault()

            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
    $('#newString').bind('click', function(event) {
        event.preventDefault();

        var inputfld = '<div id="stringgrp" class="border-top mt-4">'+
                                        '<div class="form-group row py-2">' +
                                            '<div class="col-12 ">' +
                                                '<h6 class="v_text form-control bg-qss3">New String<i class="fa pt-1 fa-close float-end closeStringCommand"></i></h6>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row">' +
                                        '<div class="col-12">' +
                                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                                '<option selected>Chose String Operation</option>'+
                                                '<option value="1">Count()</option>'+
                                                '<option value="1">Max()</option>'+
                                                '<option value="1">Min()</option>'+
                                                '<option value="1">Length()</option>'+
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+

                                    '<div class="form-group row my-2">' +
                                        '<div class="col-10">' +
                                            ' <input type="search" id="stringvariable" class="form-control serachbtn" placeholder="Variable">'+
                                        '</div>'+
                                        '<div class="col-2">' +
                                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                                '<option selected>{X}</option>'+
                                                '<option value="1">One</option>'+
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row">' +
                                        '<div class="col-12">' +
                                            ' <input type="search" id="stringoutvariable" class="form-control serachbtn" placeholder="Output Variable">'+
                                        '</div>'+

                                    '</div>'+

                       '</div>';
        $("#stringForm").append(inputfld);

    });
    $('#stringForm').on('click','.closeStringCommand',function(event) {
        event.preventDefault();
        $(this).closest('div#stringgrp').remove();

    });

}
//String end here

//random start here
function randomControl(){

    bootstrap.showModal({
        title: 'Random Number Block',
        body:
            '<form id="randomForm">'+

                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">Random Number</h6>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Variables Name">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+

                        '</div>'+
                    '</div>'+
                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">Between</h6>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Starting Value">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row py-2">' +
                        '<div class="col-12 ">' +
                            '<h6 class="v_text form-control bg-qss3">And</h6>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group row">' +
                        '<div class="col-10">' +
                            ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Ending Value">'+
                        '</div>'+
                        '<div class="col-2">' +
                            '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                '<option selected>{X}</option>'+
                                '<option value="1">One</option>'+
                            '</select>'+
                        '</div>'+
                '</div>'+
                '</div>'+
            '</form>'+
            '<div class="form-group row">' +
                    '<div class="col-12 d-grid pt-4">' +
                        '<button class="btn newbtn" id="newRandom"> + Add New  </button>'+
                    '</div>'+
            '</div>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("button[type=button]").addEventListener("click", function (event) {
                event.preventDefault()

            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
    $('#newRandom').bind('click', function(event) {
        event.preventDefault();

        var inputfld = '<div id="randomgrp" class="border-top mt-4">'+
                            '<div class="form-group row py-2">' +
                                '<div class="col-12 ">' +
                                    '<h6 class="v_text form-control bg-qss3">Random Number<i class="fa fa-close float-end closeRandomCommand"></i></h6>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row">' +
                                '<div class="col-10">' +
                                    ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Variables Name">'+
                                '</div>'+
                                '<div class="col-2">' +
                                    '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                        '<option selected>{X}</option>'+
                                        '<option value="1">One</option>'+
                                    '</select>'+

                                '</div>'+
                        '</div>'+
                        '<div class="form-group row py-2">' +
                            '<div class="col-12 ">' +
                                '<h6 class="v_text form-control bg-qss3">Between</h6>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group row">' +
                            '<div class="col-10">' +
                                ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Starting Value">'+
                            '</div>'+
                            '<div class="col-2">' +
                                '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                    '<option selected>{X}</option>'+
                                    '<option value="1">One</option>'+
                                '</select>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group row py-2">' +
                            '<div class="col-12 ">' +
                                '<h6 class="v_text form-control bg-qss3">And</h6>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group row">' +
                            '<div class="col-10">' +
                                ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Ending Value">'+
                            '</div>'+
                            '<div class="col-2">' +
                                '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                                    '<option selected>{X}</option>'+
                                    '<option value="1">One</option>'+
                                '</select>'+
                            '</div>'+
                        '</div>'+
                       '</div>';
        $("#randomForm").append(inputfld);

    });
    $('#randomForm').on('click','.closeRandomCommand',function(event) {
        event.preventDefault();
        $(this).closest('div#randomgrp').remove();

    });

}
//random end here
//Math start here
function mathFormulaControl(){

    bootstrap.showModal({
        title: 'Math Block',
        body:
            '<form>'+
                '<div class="form-group row">' +
                    '<div class="col-10">' +
                        ' <input type="search" id="mathvariable" class="form-control serachbtn" placeholder="Variables">'+
                    '</div>'+
                    '<div class="col-2">' +
                        '<select class="form-select form-select-sm serachbtn text-center getVr" aria-label=".form-select-sm example">'+
                            '<option selected>{X}</option>'+
                            '<option value="1">One</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group row py-2">' +
                    '<div class="col-12">' +
                        '<select id="select" class="serachbtn form-control form-select">' +
                            '<option selected>Add {x}</option>' +
                            '<option value="red">red</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group row ">' +
                    '<div class="col-12">' +
                        ' <input type="formula" id="mathFormula" class="form-control serachbtn" placeholder="Formulas...">'+
                    '</div>'+
                '</div>'+

                '<div class="form-group row  mt-2">'+
                    '<div class="col-6">' +
                        '<div class="accordion bg-none border-0" id="accordionExample">'+
                                '<div class="accordion-item bg-none text-white border-bottom">'+
                                ' <h2 class="accordion-header" id="headingOne">'+
                                    '<button class="accordion-button collapsed p-2 formulabg text-white fnt" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Add Operator</button>'+
                                '</h2>'+
                                '<div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">'+
                                '<div class="accordion-body acrd border-top">'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>+</strong> <input class="form-check-input float-end " type="radio" ></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>-</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>*</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>/</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>==</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>=</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong>></strong> <input class="form-check-input float-end " type="radio"></div>'+
                                        '<div class="qss-border ftnvalue operatorName p-2" ><strong><</strong> <input class="form-check-input float-end " type="radio"></div>'+

                                '</div>'+
                              '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-6">' +
                    '<div class="accordion bg-none border-0" id="accordionExample">'+
                            '<div class="accordion-item bg-none text-white border-bottom">'+
                            ' <h2 class="accordion-header" id="headingTwo">'+
                                '<button class="accordion-button collapsed p-2 formulabg text-white fnt" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Add Function</button>'+
                            '</h2>'+
                            '<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">'+
                            '<div class="accordion-body acrd border-top">'+
                                    '<div class="qss-border ftnvalue functionName p-2" ><strong>sqrt()</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                    '<div class="qss-border ftnvalue  functionName p-2" ><strong>sin()</strong> <input class="form-check-input float-end " type="radio" ></div>'+
                                    '<div class="qss-border ftnvalue  functionName p-2" ><strong>tan()</strong> <input class="form-check-input float-end " type="radio"></div>'+
                                    '<div class="qss-border ftnvalue  functionName p-2" ><strong>cos()</strong> <input class="form-check-input float-end " type="radio" ></div>'+
                                    '<div class="qss-border ftnvalue  functionName p-2" ><strong>cosh()</strong> <input class="form-check-input float-end " type="radio"></div>'+

                                '</div>'+
                            '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</form>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("button[type=button]").addEventListener("click", function (event) {
                event.preventDefault()

            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
}
//Math end here
//Movement start here
function movementControl(){

    bootstrap.showModal({
        title: 'Animation Block',
        body:
            '<form>' +


                '<div class="form-group row">' +
                    '<div class="col-12">' +
                        ' <input type="search" id="movementDance" class="form-control serachbtn" placeholder="Search for...">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group row g-2 mt-2">' +
                    '<table class="table table-dark table-hover table-responsive movementinfo">' +
                        '<thead class="sensortable">'+
                            '<tr><th>Name</th><th>Date</th><th class="text-end ">Select</th></tr>'+
                        '</thead>'+
                        '<tbody>'+
                        '<tr> <td>Base </td><td>01-12-2022 1:10</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Jazz </td><td>01-12-2022 1:10</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Birthday </td><td>01-12-2022 1:10</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                       '</tbody>'+
                    '</table>'+
                '</div>'+
            '</form>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="play" class="btn"><i class="fa fa-play playModel fa-1x text-center"></i></button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("#movementDance").addEventListener("keyup", function (event) {
                event.preventDefault()

                var value = this.value.toLowerCase().trim();
                $("table tr").each(function (index) {
                    if (!index) return;
                    $(this).find("td").each(function () {
                        var id = $(this).text().toLowerCase().trim();
                        var not_found = (id.indexOf(value) == -1);
                        $(this).closest('tr').toggle(!not_found);
                        return not_found;
                    });
                });
            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
}
//Movement end here
//dance start here
function danceControl(){

    bootstrap.showModal({
        title: 'Dance Block',
        body:
            '<form>' +


                '<div class="form-group row">' +
                    '<div class="col-12">' +
                        ' <input type="search" id="serachDance" class="form-control serachbtn" placeholder="Search for...">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group row g-2 mt-2">' +
                    '<table class="table table-dark table-hover table-responsive danceinfo">' +
                        '<thead class="sensortable">'+
                            '<tr><th>Name</th><th>Date</th><th class="text-end ">Select</th></tr>'+
                        '</thead>'+
                        '<tbody>'+
                        '<tr> <td>Base </td><td>01-12-2022 1:10</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Jazz </td><td>01-12-2022 1:10</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Birthday </td><td>01-12-2022 1:10</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                       '</tbody>'+
                    '</table>'+
                '</div>'+
            '</form>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="play" class="btn"><i class="fa fa-play playModel fa-1x text-center"></i></button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("#serachDance").addEventListener("keyup", function (event) {
                event.preventDefault()

                var value = this.value.toLowerCase().trim();
                $("table tr").each(function (index) {
                    if (!index) return;
                    $(this).find("td").each(function () {
                        var id = $(this).text().toLowerCase().trim();
                        var not_found = (id.indexOf(value) == -1);
                        $(this).closest('tr').toggle(!not_found);
                        return not_found;
                    });
                });
            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
}
//dance end here

//videocallControl(); start here
function videocallControl(){

    bootstrap.showModal({
        title: 'Video Call Block',
        body:
            '<form>' +
                '<div class="form-group row bg-qss2 p-2 mat">' +
                    '<div class="col-12">' +
                        '<h6 class="v_text form-control">Blocking <input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></input></h6>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group row bg-qss2 p-2 mat">' +
                    '<div class="col-12">' +
                        '<h6 class="v_text form-control">Send Stream Audio <input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></input></h6>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group row bg-qss2 mat">' +
                  '<div class="accordion bg-none border-0" id="accordionExample">'+

                    '<div class="accordion-item bg-none text-white border-0">'+
                        '<h2 class="accordion-header" id="headingOne">'+
                            '<button class="accordion-button bg-none text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Target</button>'+
                        '</h2>'+
                        '<div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">'+
                            '<div class="accordion-body border-top">'+
                                    '<div class="qss-border vdoValues targetValue p-2" ><strong>Dashboard</strong> <input class="form-check-input float-end " type="radio" value="" id="dashBoard"></div>'+
                                    '<div class="qss-border vdoValues targetValue p-2" ><strong>Dashboard Floating</strong> <input class="form-check-input float-end " type="radio" value="" id="dFloating"></div>'+
                                    '<div class="qss-border vdoValues targetValue p-2" >Steering <input class="form-check-input float-end " type="radio" value="" id="sterring"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                 '</div>'+
                '</div>'+

                '<div class="form-group row bg-qss2 mat">' +
                '<div class="accordion bg-none border-0" id="accordionExample">'+
                    '<div class="accordion-item bg-none text-white border-bottom">'+
                    ' <h2 class="accordion-header" id="headingTwo">'+
                        '<button class="accordion-button collapsed bg-none text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Camera</button>'+
                    '</h2>'+
                    '<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">'+
                        '<div class="accordion-body  border-top">'+
                                '<div class="qss-border vdoValues functionName p-2" ><strong>Main Camera</strong> <input class="form-check-input float-end " type="radio" value="" id="dashBoard"></div>'+
                                '<div class="qss-border vdoValues  functionName p-2" ><strong>Robot Screen</strong> <input class="form-check-input float-end " type="radio" value="" id="dFloating"></div>'+

                        '</div>'+
                    '</div>'+
                    '</div>'+
               '</div>'+
              '</div>'+
              '<div class="form-group row bg-qss2 mat">' +
                '<div class="accordion bg-none border-0" id="accordionExample">'+
                    '<div class="accordion-item bg-none text-white border-bottom">'+
                        '<h2 class="accordion-header" id="headingThree">'+
                            '<button class="accordion-button collapsed bg-none text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">User</button>'+
                        '</h2>'+
                        '<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">'+
                            '<div class="accordion-body  border-top">'+
                                '<div class="qss-border vdoValues usersValue p-2" ><strong>All the connected user detail Shown Here</strong> <input class="form-check-input float-end " type="radio" value="" id="dashBoard"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
               '</div>'+
            '</form>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="play" class="btn"><i class="fa fa-play playModel fa-1x text-center"></i></button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("button[type='play']").addEventListener("click", function (event) {
                event.preventDefault()

            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
}
//videocall controller end here

//sensor start here
function sensorControl(){

    bootstrap.showModal({
        title: 'Wait For Sensor Block',
        body:
            '<form>' +

                '<div class="form-floating mb-2">'+
                    ' <input type="number" class="form-control serachbtn form-control-sm" id="floatingInput" placeholder="Seconds">'+
                    '<label for="floatingInput"><b>Time Out</b></label>'+
                '</div>'+
                '<div class="form-group row">' +
                    '<div class="col-12">' +
                        ' <input type="search" id="serachSensors" class="form-control serachbtn" placeholder="Search for...">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group row g-2 mt-2">' +
                    '<table class="table table-dark table-hover table-responsive sensorinfo">' +
                        '<thead class="sensortable">'+
                            '<tr><th>Sensors</th><th class="text-end ">Select</th></tr>'+
                        '</thead>'+
                        '<tbody>'+
                        '<tr> <td>Arm Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Head Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>leg Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '<tr> <td>Joint Sensor</td> <td class=""><input class="form-check-input float-end " type="checkbox" value="" id="flexCheckDefault"></td></tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'+
            '</form>',

        footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
        onCreate: function (modal) {
            // create event handler for form submit and handle values
            $('.modal-footer').addClass('model-bottom');
            modal.element.querySelector("#serachSensors").addEventListener("keyup", function (event) {
                event.preventDefault()

                var value = this.value.toLowerCase().trim();
                $("table tr").each(function (index) {
                    if (!index) return;
                    $(this).find("td").each(function () {
                        var id = $(this).text().toLowerCase().trim();
                        var not_found = (id.indexOf(value) == -1);
                        $(this).closest('tr').toggle(!not_found);
                        return not_found;
                    });
                });
            })
            modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                event.preventDefault()
                const formElement = modal.element.querySelector("form");

                // bootstrap.showAlert({
                //     title: "Result",
                //     body:
                //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                // })
                modal.hide()
            })
        }
    })
}
//sensor end here

//textoverlay start here
function textoverlayControl(){

                bootstrap.showModal({
                    title: 'Text Overlay Block',
                    body:
                        '<form>' +
                            '<div class="form-group row mb-2">' +
                                '<div class="col-12">' +
                                    '<select id="select" class="serachbtn form-control form-select">' +
                                        '<option selected>Add {x}</option>' +
                                        '<option value="red">red</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +

                            '<div class="form-group row">' +
                                '<div class="col-12">' +
                                    '<textarea id="textarea" rows="10" class="serachbtn form-control"></textarea>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row mt-2">' +
                                '<div class="col-12">' +
                                    '<label for="exampleColorInput" class="form-label text-bold">Font Color(Text Color)</label>'+
                                    '<input type="color" id="txtcolor" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click To Chose Color" rows="10" class="serachbtn form-control form-control-color colorfied1"  value="#9414dc"></input>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row mt-2">' +
                                '<div class="col-12">' +
                                    '<label for="exampleColorInput" class="form-label text-bold">Background Color</label>'+
                                    '<input type="color" id="bckcolor" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click To Chose Color"  rows="10" class="serachbtn form-control colorfied2 form-control-color" value="#35dc14"></input>'+
                                '</div>'+
                            '</div>'+

                        '</form>',

                    footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="play" class="btn"><i class="fa fa-play playModel fa-1x text-center"></i></button><button type="submit" class="btn acceptModel">Accept</button>',
                    onCreate: function (modal) {
                        // create event handler for form submit and handle values
                        $('.modal-footer').addClass('model-bottom');
                        modal.element.querySelector("button[type='play']").addEventListener("click", function (event) {
                            event.preventDefault()

                        })
                        modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                            event.preventDefault()
                            const formElement = modal.element.querySelector("form");

                            // bootstrap.showAlert({
                            //     title: "Result",
                            //     body:
                            //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                            //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                            //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                            // })
                            modal.hide()
                        })
                    }
                })
}
//textoverlay end here

//inputText Start here
function textinputControl(){


                bootstrap.showModal({
                    title: 'Text Input Block',
                    body:
                        '<form id="inputForm">' +
                            '<div class="form-group row mb-2">' +
                                '<div class="col-12">' +
                                    '<select id="select" class=" serachbtn form-control form-select">' +
                                        '<option selected>Add {x}</option>' +
                                        '<option value="red">red</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group row mb-2">' +
                                 '<div class="col-12">' +
                                     '<input id="inputTitle" class="serachbtn form-control inputTitle  placeholder="Title...."></input>'+
                                 '</div>'+
                             '</div>'+
                             '<div class="form-group row mb-2">' +
                                '<div class="col-12">' +
                                    '<select id="select"  class=" serachbtn form-control inputType form-select">' +
                                        '<option selected>Chose the Type</option>' +
                                        '<option value="Text">Text</option>' +
                                        '<option value="Email">Email</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                             '<div class="form-group row  mb-2">' +
                                 '<div class="col-12">' +
                                     '<input id="inputValue" class="serachbtn form-control  inputText variableValues"  placeholder="Values(number or text))"></input>'+
                                 '</div>'+
                             '</div>'+
                        '</form>'+
                        '<div class="form-group row">' +
                                 '<div class="col-12 d-grid pt-4">' +
                                     '<button class="btn newbtn" id="newVariable"> + Add New  </button>'+
                                 '</div>'+
                         '</div>',

                    footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
                    onCreate: function (modal) {
                        // create event handler for form submit and handle values
                        $('.modal-footer').addClass('model-bottom');

                        modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                            event.preventDefault()
                            const formElement = modal.element.querySelector("form");

                            bootstrap.showAlert({
                                title: "Result",
                                body:
                                    "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                                    "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                                    "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                            })
                            modal.hide()
                        })

                    }
                })

                $('#newVariable').bind('click', function(event) {
                    event.preventDefault();

                    var inputfld = '<div id="inputgrp">'+
                                        '<div class="form-group row">' +
                                            '<div class="col-12">' +
                                                '<h6 class="v_text form-control">Input  <i class="fa fa-close float-end closeInputCommand"></i></h6>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row mb-2">' +
                                            '<div class="col-12">' +
                                                '<select id="select" class=" serachbtn form-control form-select">' +
                                                    '<option selected>Add {x}</option>' +
                                                    '<option value="red">red</option>' +
                                                '</select>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="form-group row mb-2">' +
                                            '<div class="col-12">' +
                                                '<input id="inputTitle" class="serachbtn form-control inputTitle  placeholder="Title...."></input>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row mb-2">' +
                                            '<div class="col-12">' +
                                                '<select id="select"  class=" serachbtn form-control inputType form-select">' +
                                                    '<option selected>Chose the Type</option>' +
                                                    '<option value="Text">Text</option>' +
                                                    '<option value="Email">Email</option>' +
                                                '</select>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="form-group row  mb-2">' +
                                            '<div class="col-12">' +
                                                '<input id="inputValue" class="serachbtn form-control  inputText variableValues"  placeholder="Values(number or text))"></input>'+
                                            '</div>'+
                                        '</div>';
                    $("#inputForm").append(inputfld);

                });
                $('#inputForm').on('click','.closeInputCommand',function(event) {
                    event.preventDefault();
                    $(this).closest('div#inputgrp').remove();

                });
}
//inputText end here



//qr modal start here

function qrcodeControl(){


                bootstrap.showModal({
                    title: 'Qr Scan Block',
                    body:
                        '<form id="qrcodeForm">' +


                            '<div class="form-group row">' +
                                 '<div class="col-12">' +
                                     '<input id="qrtext" class="serachbtn form-control text-white variableNames"  placeholder="Qr Value Will be Shown Here" ></input>'+
                                 '</div>'+
                             '</div>'+
                             '<div class="form-group row py-2">' +
                                 '<div class="row">' +
                                     '<video class="col-12" id="WorkingArea" ></video>'+
                                 '</div>'+
                             '</div>'+
                        '</form>',


                    footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="scan" class="btn acceptModel">Scan</button>',
                    onCreate: function (modal) {
                        // create event handler for form submit and handle values
                        $('.modal-footer').addClass('model-bottom');

                        modal.element.querySelector("button[type='scan']").addEventListener("click", function (e) {
                            e.preventDefault();

                            const formElement = modal.element.querySelector("form");
                            var msg ="Please Show Your QR Code infront of Camera ";
                            voice(msg);
                            scanQr();
                            setTimeout(function(){
                                var v= $('#qrtext').val();
                                if (v.length > 0){
                                    voice("Your Qr has been scanned !!! ");
                                }else{
                                    var message ="Qr Scan Failed. Please Try Again";
                                    voice(message);
                                    modal.hide()
                                }

                            }, 10000);
                            // setInterval( "alert('Hello')", 5000 );
                            // bootstrap.showAlert({
                            //     title: "Result",
                            //     body:

                            //         "<video id='WorkingArea'></video>"
                            // })
                            //modal.hide()
                        })

                    }
                })


}
//qr modal end here

//variable Start here
function variableControl(){


                bootstrap.showModal({
                    title: 'Variable Blocks',
                    body:
                        '<form id="varaibleForm">' +
                            '<div class="form-group row mb-2">' +
                                '<div class="col-12">' +
                                    '<select id="select" class=" serachbtn form-control form-select">' +
                                        '<option selected>Add {x}</option>' +
                                        '<option value="red">red</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group row">' +
                                 '<div class="col-12">' +
                                     '<h6 class="v_text form-control">Variable</h6>'+
                                 '</div>'+
                             '</div>'+
                            '<div class="form-group row">' +
                                 '<div class="col-12">' +
                                     '<input id="voicename" class="serachbtn form-control variableNames"  placeholder="Name...."></input>'+
                                 '</div>'+
                             '</div>'+
                             '<div class="form-group row py-2">' +
                                 '<div class="col-12">' +
                                     '<input id="voicevalue" class="serachbtn form-control variableValues"  placeholder="Values(number or text))"></input>'+
                                 '</div>'+
                             '</div>'+
                        '</form>'+
                        '<div class="form-group row">' +
                                 '<div class="col-12 d-grid pt-4">' +
                                     '<button class="btn newbtn" id="newVariable"> + Add New  </button>'+
                                 '</div>'+
                         '</div>',

                    footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn acceptModel">Accept</button>',
                    onCreate: function (modal) {
                        // create event handler for form submit and handle values
                        $('.modal-footer').addClass('model-bottom');

                        modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                            event.preventDefault()
                            const formElement = modal.element.querySelector("form");

                            bootstrap.showAlert({
                                title: "Result",
                                body:
                                    "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                                    "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                                    "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                            })
                            modal.hide()
                        })

                    }
                })

                $('#newVariable').bind('click', function(event) {
                    event.preventDefault();

                    var inputfld = '<div id="variablegrp">'+
                                        '<div class="form-group row">' +
                                            '<div class="col-12">' +
                                                '<h6 class="v_text form-control">Variable <i class="fa fa-close float-end closeVariableCommand"></i></h6>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row pb-2">' +
                                            '<div class="col-12">' +
                                                '<select id="select" class=" serachbtn form-control form-select">' +
                                                    '<option selected>Add {x}</option>' +
                                                    '<option value="red">red</option>' +
                                                '</select>' +
                                            '</div>' +
                                        '</div>' +

                                        '<div class="form-group row">' +
                                            '<div class="col-12">' +
                                                '<input id="voicename" class="serachbtn form-control variableNames"  placeholder="Name...."></input>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row py-2">' +
                                            '<div class="col-12">' +
                                                '<input id="voicevalue" class="serachbtn form-control variableValues"  placeholder="Values(number or text))"></input>'+
                                            '</div>'+
                                        '</div>'+
                                   '</div>';
                    $("#varaibleForm").append(inputfld);

                });
                $('#varaibleForm').on('click','.closeVariableCommand',function(event) {
                    event.preventDefault();
                    $(this).closest('div#variablegrp').remove();

                });
}
//variable end here


//spechControll start here
function speechControl(){

                bootstrap.showModal({
                    title: 'Speech',
                    body:
                        '<form>' +
                            '<div class="form-group row mb-2">' +
                                '<div class="col-12">' +
                                    '<select id="select" class=" serachbtn form-control form-select">' +
                                        '<option selected>Add {x}</option>' +
                                        '<option value="red">red</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group row">' +
                                '<div class="col-12">' +
                                    '<textarea id="textarea" rows="15" class="serachbtn form-control"></textarea>'+
                                '</div>'+
                            '</div>'+
                        '</form>',

                    footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button><button type="play" class="btn"><i class="fa fa-play playModel fa-1x text-center"></i></button><button type="submit" class="btn acceptModel">Accept</button>',
                    onCreate: function (modal) {
                        // create event handler for form submit and handle values
                        $('.modal-footer').addClass('model-bottom');
                        modal.element.querySelector("button[type='play']").addEventListener("click", function (event) {
                            event.preventDefault()
                            const formElement = modal.element.querySelector("form");
                            var texttovoice = formElement.querySelector("#textarea").value;
                            voice(texttovoice);
                        })
                        modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                            event.preventDefault()
                            const formElement = modal.element.querySelector("form");

                            bootstrap.showAlert({
                                title: "Result",
                                body:
                                    "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                                    "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                                    "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                            })
                            modal.hide()
                        })
                    }
                })
}



 function voiceControl(){

          bootstrap.showModal({
                     title: 'Wait For Voice Command',
                     body:
                         '<form id="voiceCommand">' +
                             '<div class="form-group row mb-2">' +
                                 '<div class="col-12">' +
                                     '<select id="select" class=" text-center serachbtn form-control form-select">' +
                                         '<option selected>Add {x}</option>' +
                                         '<option value="red">red</option>' +
                                     '</select>' +
                                 '</div>' +
                             '</div>' +
                             '<div class="form-group row">' +
                                 '<div class="col-12">' +
                                     '<input id="voice" class="serachbtn form-control voiceCommand"  placeholder="Enter Command...."></input>'+
                                 '</div>'+
                             '</div>'+

                         '</form>'+
                         '<div class="form-group row">' +
                                 '<div class="col-12 d-grid pt-4">' +
                                     '<button class="btn newbtn" id="newVoice"> + Add New Command </button>'+
                                 '</div>'+
                         '</div>',

                     footer: '<button type="button" class="btn mdlCancel" data-bs-dismiss="modal">Cancel</button></button><button type="submit"  class="btn acceptModel">Accept</button>',
                     onCreate: function (modal) {
                         // create event handler for form submit and handle values
                         $('.modal-footer').addClass('model-bottom');

                         modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                             event.preventDefault();
                             txtTospeech();
                             // bootstrap.showAlert({
                             //     title: "Result",
                             //     body:
                             //         "<b>text:</b> " + formElement.querySelector("#text").value + "<br/>" +
                             //         "<b>select:</b> " + formElement.querySelector("#select").value + "<br/>" +
                             //         "<b>textarea:</b> " + formElement.querySelector("#textarea").value
                             // })
                             modal.hide()
                         })
                     }
                 })

                 $('#newVoice').bind('click', function(event) {
                     event.preventDefault();

                     var inputfld = '<div id="vcgrp"><div class="form-group row pt-2">' +
                                         '<div class="col-12">' +
                                             '<select id="select" class=" text-center serachbtn form-control form-select">' +
                                                 '<option selected>Add {x}</option>' +
                                                 '<option value="red">red</option>' +
                                             '</select>' +
                                         '</div>' +
                                     '</div>' +
                                     '<div class="form-group row pt-1">' +
                                             '<div class="col-12 input-group">' +
                                                 '<input id="voice" class="serachbtn voiceCommand form-control" placeholder="Enter Command...."></input>'+
                                                 '<div class="input-group-addon p-1 closeVoiceCommand">X</div>'+
                                             '</div>'+
                                    '</div></div>';
                     $("#voiceCommand").append(inputfld);

                 });
                 $('#voiceCommand').on('click','.closeVoiceCommand',function(event) {
                     event.preventDefault();
                     $(this).closest('div#vcgrp').remove();

                 });
 }
//wait for
var voiceValue = [];

function txtTospeech (){
 var v = [];
         var speech = true;
         window.SpeechRecognition = window.webkitSpeechRecognition;
         const recognition = new SpeechRecognition();
             recognition.interimResults = true;

             recognition.addEventListener('result',e=>{

                 const transcript = Array.from(e.results)
                     .map(result => result[0])
                     .map(result => result.transcript)
                             console.log(transcript);
                            $('#search_composer').val(transcript);
                            $('.voiceCommand').each(function(){

                                 voiceValue.push(transcript);
                                 console.log(voiceValue);

                             });
                 })

                 if(speech == true){
                     recognition.start();
                 }

//         var SpeechRecogntion = window.webkitSpeechRecognition;
//         var recognition = new SpeechRecogntion();
//         var content = '';
//         recognition.start();
//         setTimeout(function() {
//             recognition.stop();
//         }, 5000);
//             recognition.onresult =function(event) {
//                 var current = event.resultIndex;
//                 var transcript = event.results[current][0].transcript;
//                 var confidence = event.results[current][0].confidence;
//                 //console.log(transcript);
//                 content += transcript;

//                 console.log(content);
//             };

 }

 function chkvalue(){

         $('.voiceCommand').each(function(){

             voiceValue.push(this.value);
             console.log(voiceValue);

        });

 }
