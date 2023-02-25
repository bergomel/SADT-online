document.getElementById('carregar').addEventListener('click', function(e) {
		e.preventDefault();
		var url = '/sadt em excel.pdf';
		console.log(url)
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'arraybuffer';

		xhr.onload = function() {
			if (this.status == 200) {
				current_buffer = this.response;
				console.log(current_buffer)
			} else {
				on_error('failed to load URL (code: ' + this.status + ')');
			}
		};
		xhr.send();
	});

    document.getElementById('listar').addEventListener('click', () => {
        let campos = pdfform().list_fields(current_buffer)
        console.log(campos)
    })

    document.getElementById('criar').addEventListener('click', () => {
        let campos = {1:['1']}
        let pdf_preenchido = pdfform().transform(current_buffer, campos)
        var blob = new Blob([pdf_preenchido], {type: 'application/pdf'});
        saveAs(blob, 'pdfform.js_generated.pdf');
    })