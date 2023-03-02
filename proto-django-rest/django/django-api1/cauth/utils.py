import json
import os

from django.contrib.auth import authenticate
import jwt
import requests

#######FM mod

##called from settings.py
# def jwt_get_username_from_payload_handler(payload):
#     username = payload.get('sub').replace('|', '.')
#     authenticate(remote_user=username)
#     return username

#######
#unused
def jwt_get_username_from_payload_handler(payload):
    return None
 

##called from settings.py
def jwt_decode_token(token):
    print("---1.0---jwt_decode_token----------")

    header = jwt.get_unverified_header(token)
     
    print("---1.1---jwt_decode_token----------")
    print(header)
    
    #JWKS_URL='http://userdbauth.org:9080/auth/realms/jhipster/protocol/openid-connect/certs'
    #issuer="http://userdbauth.org:9080/auth/realms/jhipster"
    #API_IDENTIFIER ="account"
    JWKS_URL=None
    API_IDENTIFIER=None
    ISSUER=None

    if 'OIDC_JWKS_URL' in os.environ.keys():
      JWKS_URL = os.environ.get('OIDC_JWKS_URL')
    if 'OIDC_API_IDENTIFIER' in os.environ.keys():  
      API_IDENTIFIER = os.environ.get('OIDC_API_IDENTIFIER')
    if 'OIDC_ISSUER' in os.environ.keys():        
      ISSUER= os.environ.get('OIDC_ISSUER')
    
    if JWKS_URL is None:
        raise Exception(' os.environ JWKS_URL  not found.')
    if API_IDENTIFIER is None:
        raise Exception('os.environ API_IDENTIFIER  not found.')
    if ISSUER is None:
        raise Exception('os.environ ISSUER  not found.')

    options=dict()
    options["verify_exp"]=False #expiration


    jwks = requests.get(JWKS_URL).json()
    
    print(jwks)
    public_key=None
    selected_jwk=None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))
            selected_jwk=jwk

    if public_key is None:
        raise Exception('Public key not found.')
    
    alg='RS256'
    if selected_jwk is not None:
       jwk=selected_jwk
       k='alg'
       if k in  jwk.keys():
            alg = jwk[k]

    print("----------------")
    payload=dict()
    print("------public_key----------")
    print(public_key)
    
   
  
    
    print("------**----------")
    
    payload= jwt.decode(token, public_key, options=options, audience=API_IDENTIFIER, issuer=ISSUER, algorithms=[alg])
    #payload= jwt.decode(token, public_key, audience=API_IDENTIFIER,  algorithms=['RS256'])
    print("------payload----------")
    print(payload)
    return payload


######initial version
# def jwt_decode_token(token):
#     header = jwt.get_unverified_header(token)
#     auth_domain = os.environ.get('AUTH_DOMAIN')
#     jwks = requests.get('https://{}/.well-known/jwks.json'.format(auth_domain)).json()
#     public_key = None
#     for jwk in jwks['keys']:
#         if jwk['kid'] == header['kid']:
#             public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

#     if public_key is None:
#         raise Exception('Public key not found.')

#     api_identifier = os.environ.get('API_IDENTIFIER')
#     issuer = 'https://{}/'.format(auth_domain)
#     return jwt.decode(token, public_key, audience=api_identifier, issuer=issuer, algorithms=['RS256'])


# async def jwt_decode_token(token):
     

#     aud="account"
#     minfo=dict()
#     await validate_token(token,aud,minfo)
    
#     payload=minfo['payload']
#     print("-------------------------------")

#     print("---------decoded-----------------")
#     print(payload)
   
#     #payload= json.loads(dtoken)
    
#     print("--------payload-info------------------")

#     print(payload['realm_access'])
#     print(payload['resource_access'])
#     print(payload['sid'])
#     print(payload['email_verified'])
#     print(payload['roles'])
#     print(payload['name'])
#     print(payload['preferred_username'])
#     print(payload['family_name'])
#     print(payload['email'])

#     return payload


