const RENDERER_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>Jupyter Notebook Renderer</title><script src="https://code.jquery.com/jquery-1.7.2.min.js"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css"/><link rel="stylesheet" href="https://jsvine.github.io/nbpreview/css/notebook.css"/><script>function onload(){window.parent.postMessage({type: 'ready'}, '*');}function updateHeight(){let body=document.body, html=document.documentElement;let height=Math.max( body.scrollHeight, body.offsetHeight, html.offsetHeight );window.parent.postMessage({type: 'resize', height: height}, "*");}const resizeObserver=new ResizeObserver(updateHeight);resizeObserver.observe(document.querySelector('html'));function showError(details){let alert=document.querySelector('div.alert');alert.classList.add('error');alert.innerText="Exception occured during Jupyter Notebook loading!";if(details){let el=document.createElement('small');el.innerText=details;alert.appendChild(el);}}function configureNotebook(config){if(config.font){document.body.style.fontSize=config.font;}for(let key of ["hide-stdout", "hide-stderr", "hide-code", "hide-markdown", "hide-prompts"]){if(config[key]===true)document.body.classList.add(key);}}function renderNotebook(content, config){let el=document.body;console.log("Rendering Notebook with config: ", config);configureNotebook(config);try{var notebook=nb.parse(JSON.parse(content));}catch{return showError("Wrong notebook format");}var rendered=notebook.render();el.innerHTML='';el.appendChild(rendered);Prism.highlightAll();/* Recreate script tags: TODO describe issue */$(el).find('.nb-html-output script').each((i, script)=>{$(script).replaceWith($(script).clone());});updateHeight();}function format_progress(event){let humanize=(count)=> ((count/1000/1000).toFixed(2) + 'MB');if(event.total !==null)return humanize(event.loaded) + " / " + humanize(event.total);return "~ " + humanize(event.loaded);}window.addEventListener('message', function(event){if(event.source===window.parent){let data=event.data;if(data.type==='render')renderNotebook(data.data, data.config ||{});if(data.type==='progress'){document.querySelector('#progress-indicator label').innerText=format_progress(data);if(data.total){document.querySelector('#progress-indicator progress').max=data.total;document.querySelector('#progress-indicator progress').value=data.loaded;}}if(data.type==='error')showError();}});</script><style>body{font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 16px;}.nb-notebook{padding-left: 100px;}img{max-width: 100%;}.nb-output{overflow-x: auto !important;}.nb-cell{clear:both;}/* Hide parts of notebook */body.hide-prompts .nb-notebook{padding-left: 0px;}body.hide-stdout .nb-text-output,body.hide-stderr .nb-stderr,body.hide-code .nb-input,body.hide-markdown .nb-markdown-cell,body.hide-prompts .nb-output::before, body.hide-prompts .nb-input::before{display: none;}/* Default style for notebook tabels */.nb-html-output table{border: none; border-collapse: collapse; border-spacing: 0; color: black; table-layout: fixed;}.nb-html-output thead{border-bottom: 1px solid black; vertical-align: bottom;}.nb-html-output tbody tr:nth-child(odd){background: #f5f5f5;}.nb-html-output tbody tr:hover{background: rgba(66, 165, 245, 0.2);}.nb-html-output tr, .nb-html-output th, .nb-html-output td{text-align: right; vertical-align: middle; padding: 0.5em 0.5em; line-height: normal; white-space: normal; max-width: none; border: none;}/* Format progressbar */#progress-indicator{font-size: 12px;margin-top: 10px;}#progress-indicator progress{margin-right: 10px;}/* Alerts */.alert{color: #084298;background-color: #cfe2ff;border-color: #b6d4fe;font-size: 20px;padding: 20px;text-align: center;border: 1px solid transparent;border-radius: .25rem;}.alert small{display: block;margin-top: 10px;}.error{color: #842029;background-color: #f8d7da;border-color: #f5c2c7;}</style></head><body onload="onload()"><div class="alert">Please Wait! Jupyter Notebook is loading!<div id="progress-indicator"><progress></progress><label></label></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.14/es5-shim.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/marked/2.0.0/marked.min.js"></script><script src="https://cdn.jsdelivr.net/npm/ansi_up@1.1.3/ansi_up.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-markup.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-python.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/contrib/auto-render.min.js"></script><script src="https://jsvine.github.io/nbpreview/js/vendor/notebook.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" integrity="sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg==" crossorigin="anonymous"></script></body></html>`;

function loadJupyter(url, iframe, config) {
	let send = (data) => {iframe.contentWindow.postMessage(data, '*')};
	
    const xhr = new window.XMLHttpRequest();

    // NOTE: to disable mime type auto guessing
    xhr.overrideMimeType("text/plain; charset=utf-8");
    xhr.responseType = "text";

    xhr.addEventListener("progress", function(e){
        send({
            type: 'progress',
            loaded: e.loaded,
            total: e.lengthComputable ? e.total : null
        });
    });

    xhr.addEventListener("load", (e) => {
        send({type: 'render', data: xhr.response, config: config})
    });
    xhr.addEventListener("error", () => {
        send({type: 'error'});
    });

    xhr.open("GET", url);
    xhr.send();
}

function buildIframe() {
	let iframe = document.createElement('iframe');
	iframe.srcdoc = RENDERER_HTML;
	iframe.sandbox.add('allow-scripts');
	iframe.scrolling = "no";
	iframe.style.border = '0';
	iframe.style.width = '100%';
	return iframe;
}

function parseConfig(configStr) {
	let config = {};
	for(let key of configStr.split(','))
		if(key) {
			let [k, v] = key.split(':');
			config[k] = v || true;
		}
	return config;
}

document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll("notebook").forEach(function(el) {
		let url = el.getAttribute('src');
		let config = parseConfig(el.getAttribute('config') || "");
		
		// Build renderer iframe
		let iframe = buildIframe();
		el.style.display = 'block';
		el.appendChild(iframe);
		
		el.insertAdjacentHTML('beforeend', '<div style="text-align:right;font-size:12px;opacity:0.6;padding-right:20px">Rendered with <a href="https://github.com/pkubiak/nbembed.js">nbembed.js</a></div>');
		
		// Message dispatching
		window.addEventListener("message", (event) => {
			if(event.source === iframe.contentWindow) {
				let data = event.data;

				if(data.type === 'resize')
					iframe.style.height = Math.ceil(data.height) + 'px';
				if(data.type === 'ready')
					loadJupyter(url, iframe, config);
			};
		});	
	});
});