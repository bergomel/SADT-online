var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://certificado.vidaas.com.br/v0/oauth/authorize?code_challenge=none&code_challenge_method=S256&response_type=code&scope=signature_session&login_hint=07813397908&lifetime=900&client_id=622d9185-2c91-413b-9c31-87b23701c9ca&redirect_uri=http://gomel.med.br", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));