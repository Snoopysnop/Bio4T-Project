 

import jwt

from django.contrib.auth import get_user_model
from django.utils.encoding import smart_text
from django.utils.translation import ugettext as _
from rest_framework import exceptions
from rest_framework.authentication import (
    BaseAuthentication, get_authorization_header
)

from rest_framework_jwt.settings import api_settings


from django.conf import settings

user_persistence=settings.USER_PERSISTENCE


jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER




class CustomBaseJSONWebTokenAuthentication(BaseAuthentication):
    """
    Token based authentication using the JSON Web Token standard.
    """

    def authenticate(self, request):
        """
        Returns a two-tuple of `User` and token if a valid signature has been
        supplied using JWT-based authentication.  Otherwise returns `None`.
        """
        jwt_value = self.get_jwt_value(request)
        print("-authenticate-1.0")
        print(jwt_value)



        if jwt_value is None:
            return None

        try:
            payload = jwt_decode_handler(jwt_value)
        except jwt.ExpiredSignature:
            msg = _('Signature has expired.')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = _('Error decoding signature.')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed()

        user = self.authenticate_credentials(payload)

        return (user, payload)


    def sub2id(self,sub):
        subid=abs(hash(sub)) % (10 ** 8)
        
        return subid


    def displayuser(self,user):
        print("------user-----")
        print(user.username)
        print(user.email)
        print(user.id)
        print(user.sub)


    def authenticate_credentials(self, payload):
        """
        Returns an active user that matches the payload's user id and email.
        """
        User = get_user_model()
        #username = jwt_get_username_from_payload(payload)
        username = payload.get('preferred_username') 
        email = payload.get('email') 
        sub = payload.get('sub') 
        subid=self.sub2id(sub)#not safe

        user=None
        if not username:
            msg = _('Invalid payload.')
            raise exceptions.AuthenticationFailed(msg)
        if user_persistence==False:
           print("-----stateless user----------")
           user = User(username=username,email=email,sub=sub)
 
        else:

          try:            
            userl = User.objects.filter(sub=sub)
            print(userl)
            if len(userl)>0:
              user = userl[0]
              print("-----existing user----------")
              self.displayuser(user)
            else:
              #no persistence here
              user = User(username=username,email=email,sub=sub)
              print("-----new user----------")
              self.displayuser(user)
              #### if you need to save user (optional here:  we are  in a microservice context)
              #euser = User.objects.get(id=user.id)
              user.save()
            ####
        
          except User.DoesNotExist:
            msg = _('Invalid signature.')
            raise exceptions.AuthenticationFailed(msg)                       
            print("---------------")


        if not user.is_active:
            msg = _('User account is disabled.')
            raise exceptions.AuthenticationFailed(msg)

        return user


    # def authenticate_credentials(self, payload):
    #     #FM MOD
    #     #see https://stackoverflow.com/questions/44298026/djangos-token-based-authentication-without-user-model
    #     """
    #     Always Returns acuser that matches the payload's user id and email.
    #     create user if necessary
    #     """
    #     User = get_user_model()
    #     username = jwt_get_username_from_payload(payload)

    #     if not username:
    #         msg = _('Invalid payload.')
    #         raise exceptions.AuthenticationFailed(msg)

    #     try:
    #         user = User.objects.get_by_natural_key(username)
    #     except User.DoesNotExist:
    #         msg = _('Invalid signature.')
    #         raise exceptions.AuthenticationFailed(msg)

    #     return user

#########################################
    # see https://raw.githubusercontent.com/jazzband/djangorestframework-simplejwt/04a4f7f2e045ac4a49542b7e98350e66431adcf5/rest_framework_simplejwt/authentication.py
    # def get_user(self, validated_token):
    #     """
    #     Returns a stateless user object which is backed by the given validated
    #     token.
    #     """
    #     if api_settings.USER_ID_CLAIM not in validated_token:
    #         # The TokenUser class assumes tokens will have a recognizable user
    #         # identifier claim.
    #         raise InvalidToken(_('Token contained no recognizable user identification'))

    #     return api_settings.TOKEN_USER_CLASS(validated_token)


#########################################
class CustomJSONWebTokenAuthentication(CustomBaseJSONWebTokenAuthentication):
    """
    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string specified in the setting
    `JWT_AUTH_HEADER_PREFIX`. For example:

        Authorization: JWT eyJhbGciOiAiSFMyNTYiLCAidHlwIj
    """
    www_authenticate_realm = 'api'
    def test():
        print("------------------------EUR------customauth:CustomJSONWebTokenAuthentication:test---------------------")


    def get_jwt_value(self, request):
        print("--get_jwt_value--1")

        auth = get_authorization_header(request).split()

        print(auth)
        auth_header_prefix = api_settings.JWT_AUTH_HEADER_PREFIX.lower()

        if not auth:
            if api_settings.JWT_AUTH_COOKIE:
                return request.COOKIES.get(api_settings.JWT_AUTH_COOKIE)
            print("--get_jwt_value--1.1")    
            return None

        if smart_text(auth[0].lower()) != auth_header_prefix:
            print("--get_jwt_value--1.2")
            return None

        if len(auth) == 1:
            msg = _('Invalid Authorization header. No credentials provided.')
            print("--get_jwt_value--1.3")
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid Authorization header. Credentials string '
                    'should not contain spaces.')
            print("--get_jwt_value--1.4")        
            raise exceptions.AuthenticationFailed(msg)
        print("--get_jwt_value--1.5")
        return auth[1]

    def authenticate_header(self, request):
        """
        Return a string to be used as the value of the `WWW-Authenticate`
        header in a `401 Unauthenticated` response, or `None` if the
        authentication scheme should return `403 Permission Denied` responses.
        """
        return '{0} realm="{1}"'.format(api_settings.JWT_AUTH_HEADER_PREFIX, self.www_authenticate_realm)
