var HiddenFBLikeBlocker = {

	numberIFBlocked: 0,
	elementRm: null,
	// Check element in dom is Invisible
	checkElmInVisible: function (elm){
		if(elm)
		{
			var style = getComputedStyle(elm, null);

			if (style && (parseFloat('0' + style.opacity) < 0.1 || style.visibility == 'hidden')) {	
				this.elementRm = elm;				
				return true;
			} else {
				return this.checkElmInVisible(elm.parentNode);
			}		
		} else {
			return false;
		}
	},

	// Remove hidden iframe facebook like
	removeFBIFrames: function(){
		var frames = document.getElementsByTagName('iframe');
		var iframe,src;

		for (var i=0;i<frames.length;i++){
			iframe = frames[i];
			src = iframe.src;
			if (src && src != 'about:blank') {
				if(src.match(/facebook.com\/plugins\/like\.php/g)) {
					if(this.checkElmInVisible(iframe)){
						this.numberIFBlocked++;
						if(this.elementRm){
							this.elementRm.parentNode.removeChild(this.elementRm);
						}
					}
				}
			}
		}
	}
};

HiddenFBLikeBlocker.removeFBIFrames();

chrome.runtime.sendMessage({numberIFBlocked: HiddenFBLikeBlocker.numberIFBlocked.toString()}, function(response) {});

