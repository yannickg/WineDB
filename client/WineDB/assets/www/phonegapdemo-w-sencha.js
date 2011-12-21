var cfg = {
    fullscreen : true,
    dockedItems : [
            {
                dock : 'top',
                xtype : 'toolbar',
                title : 'WineDB'
            },
            {
                dock : 'bottom',
                xtype : 'toolbar',
                ui : 'small',
                styleHtmlContent : true,
                html : '<p style="font-size:13px;text-align:center;">This file is located at<br /><b>assets/www/phonegapdemo-w-sencha.js</b></p>'
            } ],

    layout : {
        type : 'vbox',
        pack : 'center',
        align : 'stretch'
    },
    cls : 'card1',
    scroll : 'vertical',
    defaults : {
        layout : {
            type : 'hbox'
        },
        padding : 16,
        flex : 1,
        defaults : {
            xtype : 'button',
            cls : 'demobtn',
            flex : 1
        }
    }
};

cfg.items = [
        {
            items : [ {
                ui : 'round',
                text : 'Barcode Scanner',
                handler : function() {
                    touchEvent('scanBarcode');
                }
            } ]
        } ];

new Ext.Application({
    launch : function() {
        var panel = new Ext.Panel(cfg);
    }
});
