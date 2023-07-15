document.getElementById('convert-btn').addEventListener('click', function() {
      var fileInput = document.getElementById('file-input');
      fileInput.click();
    });
    
    document.getElementById('file-input').addEventListener('change', function(event) {
      var file = event.target.files[0];
      
      if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
          var pdfData = e.target.result;
          var worker = new Worker('pdf2json_worker.js'); // Assuming you have a separate file called 'pdf2json_worker.js' containing the JavaScript code from the previous example
          
          worker.onmessage = function(event) {
            var jsonResult = event.data;
            displayJSONResult(jsonResult);
          };
          
          worker.postMessage({ pdfData: pdfData });
        };
        
        reader.readAsArrayBuffer(file);
      }
    });
    
    function displayJSONResult(jsonResult) {
      var resultDiv = document.getElementById('result');
      resultDiv.innerText = jsonResult;
    }