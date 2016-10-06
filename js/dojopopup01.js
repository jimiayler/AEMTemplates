if (width > 768) {
			alert('wide!');
		} else {
			//alert('slim!');
			dojo.extend(dijit.Dialog, {
		        "_setContentAttr": function(content) {
		            var contentArea = dojo.query(".dijitDialogPaneContentArea", this.containerNode)[0];
		            dojo.attr(contentArea, "innerHTML", content);
		        }
		    });
		
		    var dlg = new dijit.Dialog({
		        id: 'foobar',
		        "title": "Alert",
		        "style": "width: 400px;"
		    }).placeAt(dojo.body());
		
		    var actionBar = dojo.create("div", {
		        "class": "dijitDialogPaneContentArea",
		        "innerHTML": "Viewing and interacting with this website is not recommended for mobile devices -- some information may be hidden."
		    }, dlg.containerNode);
		    var actionBar = dojo.create("div", {
		        "class": "dijitDialogPaneActionBar"
		    }, dlg.containerNode);
		
		    new dijit.form.Button({
		        "label": "Ok"
		    }).placeAt(actionBar);
		    new dijit.form.Button({
		        "label": "Cancel"
		    }).placeAt(actionBar);
		
		    dlg.startup();
		    dlg.show();
		}