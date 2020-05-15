odoo.define('project.update_kanban', function (require) {
'use strict';

var ListView = require('web.ListView');
var ListController = require('web.ListController');

var ListController = require("web.ListController");

var IncludeListView = {

    renderButtons: function() {
        this._super.apply(this, arguments);
            var summary_apply_leave_btn = this.$buttons.find('button.o-kanban-button-new');              
            summary_apply_leave_btn.on('click', this.proxy('crete_leave_from_summary'))
    },
    crete_leave_from_summary: function(){
        var self = this;
        var action = {
            type: "ir.actions.act_window",
            name: "Leave",
            res_model: "hr.leave",
            views: [[false,'form']],
            target: 'new',
            views: [[false, 'form']], 
            view_type : 'form',
            view_mode : 'form',
            flags: {'form': {'action_buttons': true, 'options': {'mode': 'edit'}}}
        };
        return this.do_action(action);
    },

};
ListController.include(IncludeListView);


// ListView.include({
//     render_buttons: function() {
//         this._super.apply(this, arguments)
//         if (this.$buttons) {
//             this.$buttons.find('. o-kanban-button-new').on('click', this.proxy('do_new_button'))
//         }
//     },
//     do_new_button: function () {
//         console.log('hello')
//     }
// })


// var KanbanRecord = require('web.KanbanRecord');

// KanbanRecord.include({
//     //--------------------------------------------------------------------------
//     // Private
//     //--------------------------------------------------------------------------

//     /**
//      * @override
//      * @private
//      */
//     _openRecord: function () {
//         if (this.modelName === 'project.project' && this.$(".o_project_kanban_boxes a").length) {
//             this.$('.o_project_kanban_boxes a').first().click();
//         } else {
//             this._super.apply(this, arguments);
//         }
//     },

// });
});

odoo.define('project.action_button', function (require) {
    "use strict";
    
    var core = require('web.core');
    var ListController = require('web.ListController');
    var rpc = require('web.rpc');
    var session = require('web.session');
    var _t = core._t;

    console.log()

    ListController.include({

       renderButtons: function($node) {
        console.log('pasha')
       this._super.apply(this, arguments);
           if (this.$buttons) {
             this.$buttons.find('.o-kanban-button-new').click(this.proxy('action_def')) ;
           }
        },

    })

})    
    