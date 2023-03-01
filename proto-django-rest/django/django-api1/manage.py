#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

import py_eureka_client.eureka_client as eureka_client
from spring_config import ClientConfigurationBuilder
from spring_config.client import SpringConfigClient


import re



context= dict(os.environ)
print(context)

def env_subst(st):

   #context = dict(os.environ)
  
   return context_subst(st,context)
   
def context_subst(st,context):
  nst=st
  for k in context.keys():
    val=context[k]
    ksafe=k.replace(".","\\.")
    result = re.search(r"\$\{(" + ksafe +  ")\}", nst)
    if result:
       nst=re.sub(r"\$\{(" + ksafe +  ")\}", val, nst)
    ### we cannot find var with dot in manage.py os.environ ...
    ### working with _->.    
    ksafe2=k.replace("_","\\.")
    result2 = re.search(r"\$\{(" + ksafe2 +  ")\}", nst)
    if result2:
       nst=re.sub(r"\$\{(" + ksafe2 +  ")\}", val, nst)

  return nst


def eureka_init():
    k='EUREKA_SERVER'
    if k in os.environ:
    # The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
       
      EUREKA_SERVER_URL=env_subst(str(os.environ[k]))
      print("--------------------------------")
      print("--1.56--EUREKA_SERVER:%s-----" % (EUREKA_SERVER_URL))
      EUREKA_APP_NAME = os.environ['EUREKA_APP_NAME']
      EUREKA_INSTANCE_HOST = os.environ['EUREKA_INSTANCE_HOST']

      EUREKA_INSTANCE_PORT = None

      if os.environ['EUREKA_INSTANCE_PORT'] is not None:
        EUREKA_INSTANCE_PORT=int(os.environ['EUREKA_INSTANCE_PORT'])




    #eureka_server="http://localhost:8761",
    #app_name="MyApplication",
    #instance_host="localhost",
    #instance_port=8000,


     #zone="us-east-1c",
     #data_center_name="Guarani"

      eureka_client.init(
        # Eureka Server 
        eureka_server=EUREKA_SERVER_URL,
        app_name=EUREKA_APP_NAME,
        # instance_host 
        instance_host=EUREKA_INSTANCE_HOST,
        instance_port=EUREKA_INSTANCE_PORT,
        zone="primary"
      )
def cloud_conf():
    k='CLOUD_CONFIG_URI'
    CLOUD_CONFIG_URI = None
    if k in os.environ and os.environ[k] is not None:
        CLOUD_CONFIG_URI=os.environ[k]
        CLOUD_CONFIG_URI=env_subst(str(CLOUD_CONFIG_URI))


        EUREKA_APP_NAME = os.environ['EUREKA_APP_NAME']
        PROFILE=os.environ['PROFILE']
        configb = ClientConfigurationBuilder().app_name(EUREKA_APP_NAME).address(CLOUD_CONFIG_URI).profile(PROFILE).build()

        cl = SpringConfigClient(configb)
        confpattern=cl.get_config()
        conf=env_subst(str(confpattern))
        print("----------cloud_conf:confpattern-------------")
        print(confpattern)
        print("----------cloud_conf-:conf------------")
        print(conf)
        print("-----------------------")


def main():
    """Run administrative tasks."""
    #os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eurekatest.settings')
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "microapi.settings")
    
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
  print("----------manage:main:start:1.0--------------------")    
   
  try:
     cloud_conf( )
  except Exception as e:
	   print("ERROR cloud_conf: "+str(e))
  

  try:
     eureka_init()
  except Exception as e:
	   print("ERROR eureka_init: "+str(e))

  print("----------manage:main:start:2.0--------------------")
  
  main()
    
    
    
