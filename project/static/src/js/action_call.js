odoo.define('School.action_button', function (require) {
    "use strict";
    var ListController = require('web.ListController');
    var rpc = require('web.rpc');
    ListController.include({
        init: function() {
            this._super.apply(this, arguments)
        },

       renderButtons: function($node) {  
            this._super.apply(this, arguments);
                let defField = this.model.get(this.handle, {raw: true}).getContext().create_button_dropdown_field;
                let isClick = false;
                let self = this
                let btnsDiv =  this.$buttons;
                let modelName = this.modelName;
                let menuBtnTempl = $(`<button id="show-btn" class="btn btn-primary btn-dropddown-crt"><span>Create</span></button>`);
                if (this.$buttons) {
                    let createBtn = this.$buttons.find('.o_list_button_add');
                    createBtn.remove();
                    btnsDiv.prepend(menuBtnTempl);
                }

                function getDropDown(modelName) {
                    return rpc.query({
                        model: modelName,
                        method: 'return_fields',
                        context: {'create_button_dropdown_field': defField}
                    }).then(function (data) {
                        console.log(data)
                        btnsDiv.append(`
                        <div id="dropcontent">
                            ${generateCreateBtnWithContext(data)} 
                        </div>`)
                    });
                }
                
                function generateCreateBtnWithContext(data) {
                    let btnTemplate = '';
                    if(data) {
                        JSON.parse(data).forEach(element => {
                            btnTemplate += `<button class="btn btn-primary btn-default-field-create">${element[0]}</button>`;
                        });
                    }
                    return btnTemplate;
                }

                function setContext(defField) {
                    $('.btn-default-field-create').click(function(){
                        let defValue = $(this).text();
                        let context = {};
                        context['default_'+defField] = defValue;
                        self.do_action({
                            type: 'ir.actions.act_window',
                            res_model: modelName,
                            view_mode: 'form',
                            view_type: 'form',
                            views: [[false, 'form',]],
                            target:' new ',
                            context: context, 
                        })
                    }) 
                }

                function customizeClickCreate() {
                    menuBtnTempl.click(function(event){
                    setContext(defField);  
                    event.stopPropagation();
                    if(isClick === false){
                        $("#dropcontent").show();
                            isClick = true;
                        }else{
                            $("#dropcontent").hide();
                            isClick = false;
                        }
                    });
    
                    $(document).click(function() { 
                        $("#dropcontent").hide();
                    });
                };

                getDropDown(modelName);

                customizeClickCreate();
        }
    })
})


